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
import { authApi } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'

type AccountType = 'client' | 'societe'

const schema = z.object({
  accountType:     z.enum(['client', 'societe']),
  nom:             z.string().optional(),
  prenom:          z.string().optional(),
  nomSociete:      z.string().optional(),
  matriculeFiscal: z.string().optional(),
  email:           z.string().email('Adresse e-mail invalide'),
  telephone:       z.string().min(8, 'Numéro invalide').regex(/^[+0-9\s]+$/, 'Format invalide'),
  adresse:         z.string().min(3, 'Champ requis'),
  codePostal:      z.string().optional(),
  ville:           z.string().optional(),
  password:        z.string().min(8, 'Au moins 8 caractères'),
  accept:          z.boolean(),
}).superRefine((data, ctx) => {
  if (data.accountType === 'client') {
    if (!data.nom?.trim())    ctx.addIssue({ code: 'custom', path: ['nom'],    message: 'Champ requis' })
    if (!data.prenom?.trim()) ctx.addIssue({ code: 'custom', path: ['prenom'], message: 'Champ requis' })
  } else {
    if (!data.nomSociete?.trim())      ctx.addIssue({ code: 'custom', path: ['nomSociete'],      message: 'Champ requis' })
    if (!data.matriculeFiscal?.trim()) ctx.addIssue({ code: 'custom', path: ['matriculeFiscal'], message: 'Champ requis' })
  }
  if (!data.accept) ctx.addIssue({ code: 'custom', path: ['accept'], message: 'Vous devez accepter les conditions' })
})
type FormValues = z.infer<typeof schema>

export function RegisterForm() {
  const [accountType, setAccountType] = useState<AccountType>('client')
  const [done, setDone]               = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const { login }                     = useAuth()
  const router                        = useRouter()

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } =
    useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: {
        accountType: 'client', nom: '', prenom: '', nomSociete: '', matriculeFiscal: '',
        email: '', telephone: '+216 ', adresse: '', codePostal: '', ville: '', password: '', accept: false,
      },
    })

  function switchType(t: AccountType) {
    setAccountType(t)
    setValue('accountType', t)
    setServerError(null)
  }

  async function onSubmit(values: FormValues) {
    setServerError(null)
    try {
      let res
      if (values.accountType === 'societe') {
        res = await authApi.register({
          clientType: 'SOCIETE', email: values.email, password: values.password,
          nomSociete: values.nomSociete!, telephone: values.telephone,
          adresse: values.adresse, codePostal: values.codePostal,
          ville: values.ville, matriculeFiscal: values.matriculeFiscal!,
        })
      } else {
        res = await authApi.register({
          clientType: 'INDIVIDUEL', email: values.email, password: values.password,
          nom: values.nom!, prenom: values.prenom!, telephone: values.telephone,
          adresse: values.adresse, codePostal: values.codePostal, ville: values.ville,
        })
      }
      login(res.data.token, res.data.user)
      setDone(true)
      setTimeout(() => router.push('/'), 1200)
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "Erreur lors de l'inscription.")
    }
  }

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-secondary p-8 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <CheckCircle2 className="size-6" />
        </div>
        <h2 className="mt-5 text-xl font-semibold">Compte créé</h2>
        <p className="mt-2 text-sm text-muted-foreground">Redirection en cours…</p>
      </motion.div>
    )
  }

  return (
    <div>
      {/* Type de client toggle */}
      <div className="grid grid-cols-2 gap-1.5 rounded-2xl border border-border bg-secondary p-1.5">
        {(['client', 'societe'] as const).map((t) => (
          <button key={t} type="button" onClick={() => switchType(t)}
            className={`flex items-center justify-center rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
              accountType === t
                ? 'bg-background shadow-sm ring-1 ring-border text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}>
            {t === 'client' ? 'Particulier' : 'Société'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
        {serverError && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
            <p className="text-sm text-destructive">{serverError}</p>
          </motion.div>
        )}

        <AnimatePresence mode="wait" initial={false}>
          {accountType === 'societe' ? (
            <motion.div key="societe" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="space-y-4 overflow-hidden">
              <FloatingInput label="Nom de société" error={errors.nomSociete?.message} {...register('nomSociete')} />
              <FloatingInput label="Matricule fiscal" hint="Format : 0000000/X/X/X/000" error={errors.matriculeFiscal?.message} {...register('matriculeFiscal')} />
            </motion.div>
          ) : (
            <motion.div key="individu" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="space-y-4 overflow-hidden">
              <div className="grid grid-cols-2 gap-4">
                <FloatingInput label="Nom" autoComplete="family-name" error={errors.nom?.message} {...register('nom')} />
                <FloatingInput label="Prénom" autoComplete="given-name" error={errors.prenom?.message} {...register('prenom')} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <FloatingInput label="Adresse e-mail" type="email" inputMode="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
        <FloatingInput label="Téléphone" type="tel" inputMode="tel" autoComplete="tel" error={errors.telephone?.message} {...register('telephone')} />
        <FloatingInput label="Adresse" error={errors.adresse?.message} {...register('adresse')} />
        <div className="grid grid-cols-2 gap-4">
          <FloatingInput label="Code postal" {...register('codePostal')} />
          <FloatingInput label="Ville" {...register('ville')} />
        </div>
        <FloatingPassword label="Mot de passe" autoComplete="new-password" error={errors.password?.message} {...register('password')} />

        <div className="pt-1">
          <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
            <input type="checkbox" className="mt-0.5 size-4 rounded border-input accent-accent" {...register('accept')} />
            <span>J&apos;accepte les <span className="font-medium text-foreground">termes et conditions</span>.</span>
          </label>
          {errors.accept && <p className="mt-1.5 pl-1 text-xs text-destructive">{errors.accept.message}</p>}
        </div>

        <button
          type="submit" disabled={isSubmitting}
          className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-brand-blue text-sm font-medium text-white transition-all duration-200 hover:bg-brand-blue/90 disabled:opacity-60"
        >          {isSubmitting ? <><Loader2 className="size-4 animate-spin" />Création…</> : "S'inscrire"}
        </button>
      </form>

      <div className="my-7 flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Ou</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Vous avez déjà un compte ?{' '}
        <Link href="/login" className="font-medium text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  )
}
