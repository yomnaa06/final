'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'motion/react'
import {
  AlertTriangle,
  Check,
  PackageX,
  FileWarning,
  Truck,
  HelpCircle,
  LogIn,
  AlertCircle,
} from 'lucide-react'
import { FloatingInput, FloatingTextarea } from '@/components/ui/floating-field'
import { cn } from '@/lib/utils'
import { reclamationApi } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { BRANCHES } from '@/lib/site'

// Map frontend category id to a readable subject
const CATEGORIES = [
  { id: 'defective', label: 'Pièce défectueuse', icon: PackageX },
  { id: 'wrong', label: 'Erreur de référence', icon: FileWarning },
  { id: 'delivery', label: 'Problème de livraison', icon: Truck },
  { id: 'other', label: 'Autre', icon: HelpCircle },
] as const

const schema = z.object({
  category: z.string().min(1, 'Sélectionnez un motif'),
  branch: z.string().min(1, 'Choisissez un destinataire'),
  reference: z.string().optional(),
  description: z.string().min(20, 'Décrivez votre réclamation (20 caractères min.)'),
})

type FormValues = z.infer<typeof schema>

export function ComplaintForm() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const { user } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { category: '', branch: '', reference: '', description: '' },
  })

  const category = watch('category')
  const branch = watch('branch')

  async function onSubmit(values: FormValues) {
    setServerError(null)
    if (!user) {
      router.push('/login')
      return
    }
    try {
      const categoryLabel = CATEGORIES.find((c) => c.id === values.category)?.label ?? values.category
      const branchLabel = BRANCHES.find((b) => b.id === values.branch)?.name ?? values.branch
      const sujet = values.reference
        ? `${categoryLabel} — Réf: ${values.reference}`
        : categoryLabel

      await reclamationApi.create({
        destinataire: branchLabel,
        sujet,
        description: values.description,
      })
      setSubmitted(true)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur lors de l\'envoi.'
      setServerError(msg)
    }
  }

<<<<<<< HEAD
  // pas authentifie
=======
  // Not authenticated
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-secondary p-12 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <LogIn className="size-7" />
        </div>
        <h2 className="mt-6 text-xl font-semibold tracking-display">
          Connexion requise
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Vous devez être connecté pour déposer une réclamation.
        </p>
        <div className="mt-7 flex gap-3">
          <Link
            href="/login"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-blue px-6 text-sm font-medium text-white transition-colors hover:bg-brand-blue/90"
          >
            Se connecter
          </Link>
          <Link
            href="/register"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-border px-6 text-sm font-medium transition-colors hover:bg-secondary"
          >
            Créer un compte
          </Link>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-card p-10 text-center md:p-14"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background">
          <Check className="h-6 w-6" strokeWidth={2.5} />
        </div>
        <h2 className="mt-6 text-2xl font-semibold tracking-display">Réclamation enregistrée</h2>
        <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
          Votre dossier a été transmis à notre service qualité. Un conseiller vous contactera sous
          48 heures ouvrées avec un numéro de suivi.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/history"
            className="inline-flex items-center justify-center rounded-lg bg-brand-blue px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-blue/90"
          >
            Voir mes réclamations
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-border bg-card p-6 md:p-10"
    >
      <div className="flex items-center gap-3 border-b border-border pb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-display">Formulaire de réclamation</h2>
          <p className="text-sm text-muted-foreground">Tous les champs marqués sont requis.</p>
        </div>
      </div>

      {serverError && (
        <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
          <p className="text-sm text-destructive">{serverError}</p>
        </div>
      )}

      {/* Category */}
      <div className="mt-8">
        <p className="text-sm font-medium">Motif de la réclamation</p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {CATEGORIES.map((c) => {
            const Icon = c.icon
            const active = category === c.id
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setValue('category', c.id, { shouldValidate: true })}
                className={cn(
                  'flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all',
                  active
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border bg-background text-foreground hover:border-foreground/40',
                )}
              >
                <Icon className="h-5 w-5 shrink-0" strokeWidth={1.75} />
                {c.label}
              </button>
            )
          })}
        </div>
        {errors.category && (
          <p className="mt-2 text-xs font-medium text-destructive">{errors.category.message}</p>
        )}
      </div>

      {/* Destinataire */}
      <div className="mt-6">
        <p className="text-sm font-medium">Destinataire</p>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {BRANCHES.map((b) => {
            const active = branch === b.id
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setValue('branch', b.id, { shouldValidate: true })}
                className={cn(
                  'rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all',
                  active
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border bg-background text-foreground hover:border-foreground/40',
                )}
              >
                {b.name}
              </button>
            )
          })}
        </div>
        {errors.branch && (
          <p className="mt-2 text-xs font-medium text-destructive">{errors.branch.message}</p>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5">
        <FloatingInput
          label="Référence commande / facture (optionnel)"
          {...register('reference')}
        />
        <FloatingTextarea
          label="Décrivez votre réclamation"
          rows={5}
          error={errors.description?.message}
          {...register('description')}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-blue px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-brand-blue/90 disabled:opacity-60"
      >
        {isSubmitting ? 'Envoi…' : 'Soumettre la réclamation'}
      </button>
    </form>
  )
}
