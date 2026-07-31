'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'motion/react'
import { Loader2, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react'
import { FloatingInput, FloatingPassword } from '@/components/ui/floating-field'
import { authApi } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'

const schema = z.object({
  email:    z.string().email('Adresse e-mail invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
})
type FormValues = z.infer<typeof schema>
const ease = [0.22, 1, 0.36, 1] as const

export default function AdminLoginPage() {
  const [done, setDone]           = useState(false)
  const [serverError, setError]   = useState<string | null>(null)
  const { login, user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user?.role === 'ADMIN') router.push('/dashboard')
  }, [user, isLoading, router])

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormValues>({ resolver: zodResolver(schema) })

  async function onSubmit(values: FormValues) {
    setError(null)
    try {
      const res = await authApi.login({ email: values.email, password: values.password, clientType: 'ADMIN' })
      if (res.data.user.role !== 'ADMIN') { setError("Ce compte n'est pas administrateur."); return }
      login(res.data.token, res.data.user)
      setDone(true)
      setTimeout(() => router.push('/dashboard'), 900)
    } catch (err: unknown) {
      const raw = err instanceof Error ? err.message : 'Erreur de connexion.'
      if (raw.includes('Identifiants') || raw.includes('incorrect'))
        setError('Email ou mot de passe incorrect.')
      else if (raw.includes('mysql') || raw.includes('database') || raw.includes('reach'))
        setError('Base de données inaccessible. Vérifiez que Docker est démarré.')
      else if (raw.includes('contacter') || raw.includes('serveur'))
        setError('Serveur inaccessible. Vérifiez que le backend est démarré.')
      else setError(raw)
    }
  }

  return (
    <div className="flex min-h-svh flex-col lg:flex-row">
      {/* left panel */}
      <div className="relative hidden overflow-hidden bg-steel lg:block lg:w-[44%]">
        <Image src="/images/admin_login.png" alt="Entrepôt Seghaier" fill priority sizes="44vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-steel via-steel/60 to-steel/20" />
        <div className="relative z-10 flex h-full flex-col justify-between p-10">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/images/logo.png" alt="Seghaier" width={40} height={40} className="object-contain" />
            <span className="text-sm font-medium text-steel-foreground/70">Groupe Seghaier</span>
          </Link>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-steel-foreground/40">Espace administration</p>
            <p className="mt-4 max-w-[280px] text-xl font-semibold leading-snug tracking-display text-steel-foreground">
              Gérez devis, réclamations et clients depuis un seul endroit.
            </p>
          </div>
        </div>
      </div>

      {/* right panel */}
      <div className="flex flex-1 flex-col bg-background px-6 py-8 sm:px-12 lg:px-16">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <Image src="/images/logo.png" alt="Seghaier" width={28} height={28} className="object-contain" />
          </Link>
          <Link href="/" className="group ml-auto flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            Retour au site
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
            className="w-full max-w-sm"
          >
            <p className="label-eyebrow">Accès restreint</p>
            <h1 className="mt-3 text-2xl font-semibold tracking-display">Administration</h1>
            <p className="mt-2 text-sm text-muted-foreground">Réservé aux administrateurs autorisés.</p>

            <div className="mt-8">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-secondary p-5">
                    <CheckCircle2 className="size-5 shrink-0 text-accent" />
                    <p className="text-sm font-medium">Connexion réussie. Redirection…</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    {serverError && (
                      <div className="flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3">
                        <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
                        <p className="text-sm text-destructive">{serverError}</p>
                      </div>
                    )}
                    <FloatingInput label="Adresse e-mail" type="email" inputMode="email" autoComplete="email"
                      error={errors.email?.message} {...register('email')} />
                    <FloatingPassword label="Mot de passe" autoComplete="current-password"
                      error={errors.password?.message} {...register('password')} />
                    <button type="submit" disabled={isSubmitting}
                      className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-brand-blue text-sm font-medium text-white transition-all duration-200 hover:bg-brand-blue/90 disabled:opacity-60">
                      {isSubmitting ? <><Loader2 className="size-4 animate-spin" />Connexion…</> : 'Accéder au tableau de bord'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
