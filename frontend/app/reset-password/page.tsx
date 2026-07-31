'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, CheckCircle2, AlertCircle, XCircle } from 'lucide-react'
import { AuthShell } from '@/components/auth/auth-shell'
import { FloatingPassword } from '@/components/ui/floating-field'
import { authApi } from '@/lib/api'

const schema = z
  .object({
    password: z.string().min(8, 'Au moins 8 caractères'),
    confirm:  z.string().min(1, 'Confirmez le mot de passe'),
  })
  .refine((d) => d.password === d.confirm, {
    message: 'Les mots de passe ne correspondent pas.',
    path: ['confirm'],
  })

type FormValues = z.infer<typeof schema>

//search params
function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const router = useRouter()

  const [done, setDone]           = useState(false)
  const [serverError, setError]   = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

<<<<<<< HEAD
  // no token f lien, mark l'erreur
=======
  // No token in URL — show error immediately
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
  if (!token) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 px-5 py-4">
        <XCircle className="mt-0.5 size-5 shrink-0 text-destructive" />
        <div>
          <p className="font-medium text-destructive">Lien invalide</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Ce lien de réinitialisation est invalide ou a expiré. Veuillez faire une
            nouvelle demande depuis la page de connexion.
          </p>
        </div>
      </div>
    )
  }

  if (done) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-secondary p-5">
        <CheckCircle2 className="size-5 shrink-0 text-accent" />
        <div>
          <p className="font-medium">Mot de passe réinitialisé</p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
          </p>
        </div>
      </div>
    )
  }

  async function onSubmit(values: FormValues) {
    setError(null)
    try {
      await authApi.resetPassword(token!, values.password)
      setDone(true)
      setTimeout(() => router.push('/login'), 2500)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Erreur lors de la réinitialisation.'
      if (msg.includes('expiré') || msg.includes('invalide'))
        setError('Ce lien a expiré. Veuillez refaire une demande.')
      else
        setError(msg)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {serverError && (
        <div className="flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
          <p className="text-sm text-destructive">{serverError}</p>
        </div>
      )}

      <FloatingPassword
        label="Nouveau mot de passe"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register('password')}
      />
      <FloatingPassword
        label="Confirmer le mot de passe"
        autoComplete="new-password"
        error={errors.confirm?.message}
        {...register('confirm')}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 disabled:opacity-70"
      >
        {isSubmitting
          ? <><Loader2 className="size-4 animate-spin" />Réinitialisation…</>
          : 'Réinitialiser le mot de passe'}
      </button>
    </form>
  )
}

export default function ResetPasswordPage() {
  return (
    <AuthShell
      eyebrow="Portail professionnel"
      title="Nouveau mot de passe"
      subtitle="Choisissez un mot de passe sécurisé d'au moins 8 caractères."
    >
      <Suspense
        fallback={
          <div className="flex h-24 items-center justify-center">
            <Loader2 className="size-5 animate-spin text-muted-foreground" />
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </AuthShell>
  )
}
