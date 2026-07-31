'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import { FloatingInput, FloatingPassword } from '@/components/ui/floating-field'
import { AccountTypeToggle, type AccountType } from '@/components/authentification/account-type-toggle'
import { authApi } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'

const schema = z.object({
  email:    z.string().email('Adresse e-mail invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
  remember: z.boolean().optional(),
})
type FormValues = z.infer<typeof schema>

export function LoginForm() {
  const [type, setType]         = useState<AccountType>('client')
  const [done, setDone]         = useState(false)
  const [serverError, setError] = useState<string | null>(null)
  const { login }               = useAuth()
  const router                  = useRouter()

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: { email: '', password: '', remember: false },
    })

  async function onSubmit(values: FormValues) {
    setError(null)
    try {
      const clientType = type === 'societe' ? 'SOCIETE' : 'INDIVIDUEL'
      const res = await authApi.login({
        email: values.email,
        password: values.password,
        clientType: clientType as 'INDIVIDUEL' | 'SOCIETE',
      })
      if (res.data.user.role === 'ADMIN') {
        setError('Ce compte est administrateur. Utilisez la page de connexion admin.')
        return
      }
      login(res.data.token, res.data.user)
      setDone(true)
      setTimeout(() => router.push('/'), 800)
    } catch (err: unknown) {
      const raw = err instanceof Error ? err.message : 'Erreur de connexion.'
      if (raw.includes('Identifiants'))
        setError('Email ou mot de passe incorrect.')
      else if (raw.includes('Impossible de contacter'))
        setError('Impossible de contacter le serveur. Vérifiez que le backend est démarré.')
      else
        setError(raw)
    }
  }

  return (
    <div>
      <AccountTypeToggle value={type} onChange={setType} />

      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-center gap-3 rounded-lg border border-border bg-secondary px-4 py-4"
          >
            <CheckCircle2 className="size-5 shrink-0 text-accent" />
            <p className="text-sm font-medium">Connexion réussie. Redirection en cours…</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 space-y-4"
            noValidate
          >
            {serverError && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3"
              >
                <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
                <p className="text-sm text-destructive">{serverError}</p>
              </motion.div>
            )}

            <FloatingInput
              label="Adresse e-mail"
              type="email" inputMode="email" autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />
            <FloatingPassword
              label="Votre mot de passe"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register('password')}
            />

            <div className="flex items-center justify-between pt-1">
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground">
                <input type="checkbox" className="size-4 rounded border-input accent-accent" {...register('remember')} />
                Se souvenir de moi
              </label>
              <Link href="/forgot-password" className="text-sm font-medium text-foreground transition-colors hover:text-accent">
                Mot de passe oublié ?
              </Link>
            </div>

            <button
              type="submit" disabled={isSubmitting}
              className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-brand-blue text-sm font-medium text-white transition-all duration-200 hover:bg-brand-blue/90 disabled:opacity-60"
            >
              {isSubmitting
                ? <><Loader2 className="size-4 animate-spin" />Connexion…</>
                : 'Se connecter'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="my-7 flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Ou</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Pas encore de compte ?{' '}
        <Link href="/register" className="font-medium text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline">
          S&apos;inscrire
        </Link>
      </p>
    </div>
  )
}
