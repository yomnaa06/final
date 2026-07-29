'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { FloatingInput } from '@/components/ui/floating-field'
import { useAuth } from '@/lib/auth-context'
import { authApi } from '@/lib/api'

const schema = z.object({
  nom:        z.string().min(2, 'Champ requis'),
  prenom:     z.string().optional(),
  telephone:  z.string().optional(),
  adresse:    z.string().optional(),
  codePostal: z.string().optional(),
  ville:      z.string().optional(),
})
type FormValues = z.infer<typeof schema>

export default function ProfilePage() {
  const { user, updateUser, isLoading } = useAuth()
  const router = useRouter()
  const [saved, setSaved]           = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isDirty } } =
    useForm<FormValues>({ resolver: zodResolver(schema) })

  useEffect(() => {
    if (!isLoading && !user) { router.push('/login'); return }
    if (user) reset({ nom: user.nom ?? '', prenom: user.prenom ?? '', telephone: user.telephone ?? '', adresse: user.adresse ?? '', codePostal: user.codePostal ?? '', ville: user.ville ?? '' })
  }, [user, isLoading, router, reset])

  async function onSubmit(values: FormValues) {
    setServerError(null); setSaved(false)
    try {
      const res = await authApi.updateProfile(values)
      updateUser({ ...user!, ...res.data })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setServerError(e instanceof Error ? e.message : 'Erreur lors de la mise à jour.')
    }
  }

  if (isLoading || !user) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="size-6 animate-spin text-muted-foreground" /></div>
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-secondary pt-24 pb-16">
        <div className="mx-auto max-w-2xl px-5">
          <div className="mb-8">
            <p className="label-eyebrow">Mon compte</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-display">Mon profil</h1>
            <p className="mt-2 text-sm text-muted-foreground">{user.email}</p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-8">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-full bg-muted text-xl font-semibold">
                {(user.nom ?? user.email)[0].toUpperCase()}
              </div>
              <div>
                <p className="font-semibold">{user.nom}{user.prenom ? ` ${user.prenom}` : ''}</p>
                <span className={`mt-1 inline-flex rounded-lg px-2.5 py-0.5 text-xs font-medium ${
                  user.clientType === 'SOCIETE'
                    ? 'bg-violet-50 text-violet-700 ring-1 ring-violet-200'
                    : 'bg-blue-50 text-blue-700 ring-1 ring-blue-200'
                }`}>
                  {user.clientType === 'SOCIETE' ? 'Société' : 'Particulier'}
                </span>
              </div>
            </div>

            {serverError && (
              <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3">
                <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
                <p className="text-sm text-destructive">{serverError}</p>
              </div>
            )}
            {saved && (
              <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                <p className="text-sm text-emerald-700">Profil mis à jour avec succès.</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              {user.clientType === 'INDIVIDUEL' ? (
                <div className="grid grid-cols-2 gap-4">
                  <FloatingInput label="Nom" error={errors.nom?.message} {...register('nom')} />
                  <FloatingInput label="Prénom" {...register('prenom')} />
                </div>
              ) : (
                <FloatingInput label="Nom de société" error={errors.nom?.message} {...register('nom')} />
              )}
              <FloatingInput label="Téléphone" type="tel" {...register('telephone')} />
              <FloatingInput label="Adresse" {...register('adresse')} />
              <div className="grid grid-cols-2 gap-4">
                <FloatingInput label="Code postal" {...register('codePostal')} />
                <FloatingInput label="Ville" {...register('ville')} />
              </div>
              <button type="submit" disabled={isSubmitting || !isDirty}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand-blue text-sm font-medium text-white transition-colors hover:bg-brand-blue/90 disabled:opacity-60">
                {isSubmitting ? <><Loader2 className="size-4 animate-spin" /> Enregistrement…</> : 'Enregistrer les modifications'}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
