'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { AuthShell } from '@/components/auth/auth-shell'
import { FloatingInput } from '@/components/ui/floating-field'
import { authApi } from '@/lib/api'

const schema = z.object({ email: z.string().email('Adresse e-mail invalide') })
type FormValues = z.infer<typeof schema>

export default function ForgotPasswordPage() {
  const [done, setDone] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormValues>({ resolver: zodResolver(schema) })

  async function onSubmit(values: FormValues) {
    setServerError(null)
    try {
      await authApi.forgotPassword(values.email)
      setDone(true)
    } catch (e: unknown) {
      setServerError(e instanceof Error ? e.message : 'Erreur.')
    }
  }

  return (
    <AuthShell
      eyebrow="Portail professionnel"
      title="Mot de passe oublié"
      subtitle="Saisissez votre e-mail pour recevoir un lien de réinitialisation."
    >
      {done ? (
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-secondary p-5">
          <CheckCircle2 className="size-5 shrink-0 text-accent" />
          <p className="text-sm font-medium">
            Un e-mail de réinitialisation a été envoyé si ce compte existe.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {serverError && (
            <div className="flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3">
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
              <p className="text-sm text-destructive">{serverError}</p>
            </div>
          )}
          <FloatingInput
            label="Adresse e-mail"
            type="email"
            inputMode="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />
          <button type="submit" disabled={isSubmitting}
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 disabled:opacity-70">
            {isSubmitting
              ? <><Loader2 className="size-4 animate-spin" /> Envoi…</>
              : 'Envoyer le lien'}
          </button>
        </form>
      )}
    </AuthShell>
  )
}
