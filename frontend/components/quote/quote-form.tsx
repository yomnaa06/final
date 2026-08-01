"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  Package,
  LogIn,
  AlertCircle,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PRODUCT_CATEGORIES, BRANCHES } from '@/lib/site';
import { Stepper } from './stepper';
import { FloatingTextarea } from '@/components/ui/floating-field';
import { devisApi } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { useDevis } from '@/hooks/useDevis';
import { collections } from '@/data/products';

// ids front to back valeurs
const BRANCH_BACKEND: Record<string, string> = {
  'pieces-auto': 'E.A.S.C. Pièces Auto',
  gros: 'E.A.S.C. Gros',
  aps: 'APS',
};

const schema = z.object({
  details: z.string().min(10, 'Précisez votre demande (10 caractères min.)'),
  branch: z.string().min(1, 'Choisissez un destinataire'),
});

type FormValues = z.infer<typeof schema>;

const STEPS = ['Destinataire', 'Confirmation'];
const ease = [0.22, 1, 0.36, 1] as const;

export function QuoteForm() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { user } = useAuth();
  const { items, removeItem, updateQuantity, totalItems, clearDevis } = useDevis();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: { details: '', branch: '' },
  });

  const values = watch();
  const selectedBranch = BRANCHES.find((b) => b.id === values.branch);

  // detection auto des categories ml selected products
  const getProductCategories = () => {
    const categoryIds = new Set<string>();
    items.forEach((item) => {
      const collection = collections.find((c) => 
        c.name.toLowerCase() === item.brand?.toLowerCase() || 
        c.id === item.productId?.split('-')[0]
      );
      if (collection) {
        categoryIds.add(collection.id);
      }
    });
    return Array.from(categoryIds);
  };

  const autoCategories = getProductCategories();
  const categoryLabels = autoCategories
    .map((id) => PRODUCT_CATEGORIES.find((c) => c.id === id)?.label)
    .filter(Boolean);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  async function next() {
    const valid = await trigger(['branch']);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  async function onSubmit(formValues: FormValues) {
    setServerError(null);
    if (!user) {
      router.push('/login');
      return;
    }
    try {
      // Build liste produits pour devis
      const productList = items.map((item) => 
        `${item.name} (x${item.quantity})`
      ).join(', ');

      await devisApi.create({
        brancheContact: BRANCH_BACKEND[formValues.branch] ?? formValues.branch,
        produitDesire: productList || 'Demande personnalisée',
        description: `${formValues.details}\n\n${items.length > 0 ? 'Produits sélectionnés :\n' + items.map((item) => 
          `- ${item.name} (x${item.quantity}) - ${item.brand || 'Marque'}`).join('\n') : 'Aucun produit sélectionné - demande personnalisée'}`,
      });
      setDone(true);
      clearDevis();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur lors de l\'envoi.';
      setServerError(msg);
    }
  }

  // mch authenticated, show cta
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
          Vous devez être connecté pour soumettre une demande de devis.
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
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
      {/* Main */}
      <div>
        <Stepper steps={STEPS} current={done ? STEPS.length : step} />

        <div className="mt-10">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-border bg-secondary p-10 text-center"
              >
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground"
                >
                  <CheckCircle2 className="size-7" />
                </motion.div>
                <h2 className="mt-6 text-2xl font-semibold tracking-display">
                  Demande envoyée
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Votre demande de devis a bien été transmise à{' '}
                  <span className="font-medium text-foreground">
                    {selectedBranch?.name}
                  </span>
                  . Notre équipe vous répondra dans les plus brefs délais.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/history"
                    className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-blue px-6 text-sm font-medium text-white transition-colors hover:bg-brand-blue/90"
                  >
                    Voir mes demandes
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex h-11 items-center justify-center rounded-lg border border-border px-6 text-sm font-medium transition-colors hover:bg-secondary"
                  >
                    Retour à l&apos;accueil
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key={step}
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease }}
                noValidate
              >
                {serverError && (
                  <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3">
                    <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
                    <p className="text-sm text-destructive">{serverError}</p>
                  </div>
                )}

                {/* products summary */}
                {items.length > 0 && (
                  <div className="mb-8 rounded-2xl border border-border bg-secondary p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ShoppingBag className="size-5 text-brand-blue" />
                        <span className="font-medium">
                          {totalItems()} produit{totalItems() > 1 ? 's' : ''} sélectionné{totalItems() > 1 ? 's' : ''}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={clearDevis}
                        className="text-sm text-red-600 hover:text-red-700 transition-colors"
                      >
                        Tout supprimer
                      </button>
                    </div>
                    <div className="mt-3 space-y-2">
                      {items.map((item) => (
                        <div key={item.productId} className="flex items-center justify-between bg-background rounded-lg px-3 py-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.brand || 'Marque'}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                              >
                                <Minus className="size-3 text-gray-500" />
                              </button>
                              <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                              >
                                <Plus className="size-3 text-gray-500" />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.productId)}
                              className="text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {items.length === 0 && (
                  <div className="mb-8 rounded-2xl border border-border bg-secondary p-8 text-center">
                    <ShoppingBag className="size-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">Aucun produit sélectionné</p>
                    <p className="text-sm text-muted-foreground/60 mt-1">
                      Vous pouvez quand même faire une demande personnalisée
                    </p>
                    <Link
                      href="/products"
                      className="inline-block mt-3 text-sm text-brand-blue hover:underline"
                    >
                      Parcourir le catalogue →
                    </Link>
                  </div>
                )}

                {/* partie de description */}
                <div className="mb-6">
                  <FloatingTextarea
                    label="Décrivez votre besoin"
                    rows={4}
                    error={errors.details?.message}
                    {...register('details')}
                  />
                </div>

                {/* 1: recipient */}
                {step === 0 && (
                  <div>
                    <h2 className="text-xl font-semibold">
                      Choisissez votre destinataire
                    </h2>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      Sélectionnez la branche qui traitera votre demande.
                    </p>
                    <Controller
                      control={control}
                      name="branch"
                      render={({ field }) => (
                        <div className="mt-5 space-y-3">
                          {BRANCHES.map((b) => {
                            const active = field.value === b.id;
                            return (
                              <button
                                type="button"
                                key={b.id}
                                onClick={() => field.onChange(b.id)}
                                className={cn(
                                  'flex w-full items-center justify-between gap-4 rounded-xl border px-5 py-5 text-left transition-all duration-200',
                                  active
                                    ? 'border-foreground bg-muted/50'
                                    : 'border-border bg-background hover:border-foreground/30'
                                )}
                              >
                                <div className="flex items-center gap-4">
                                  <span
                                    className={cn(
                                      'flex size-10 items-center justify-center rounded-lg transition-colors',
                                      active
                                        ? 'bg-accent text-accent-foreground'
                                        : 'bg-secondary text-foreground'
                                    )}
                                  >
                                    <Package className="size-5" />
                                  </span>
                                  <div>
                                    <p className="font-medium">{b.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {b.role}
                                    </p>
                                  </div>
                                </div>
                                <span
                                  className={cn(
                                    'flex size-5 items-center justify-center rounded-full border transition-colors',
                                    active
                                      ? 'border-foreground bg-foreground text-background'
                                      : 'border-border'
                                  )}
                                >
                                  {active && <Check className="size-3" />}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    />
                    {errors.branch && (
                      <p className="mt-2 text-xs text-destructive">
                        {errors.branch.message}
                      </p>
                    )}
                  </div>
                )}

                {/* 2: confirmation */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Confirmer votre demande</h2>
                    
                    <div className="rounded-2xl border border-border bg-secondary p-6 space-y-4">
                      {/* produits */}
                      {items.length > 0 && (
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                            <ShoppingBag className="size-3.5" />
                            Produits sélectionnés ({totalItems()})
                          </p>
                          <div className="mt-2 space-y-1">
                            {items.map((item) => (
                              <div key={item.productId} className="flex justify-between text-sm bg-background rounded-lg px-3 py-1.5">
                                <span className="truncate">{item.name}</span>
                                <span className="font-medium">x{item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* autodetection des catgs */}
                      {categoryLabels.length > 0 && (
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Gammes concernées</p>
                          <div className="mt-1 flex flex-wrap gap-1.5">
                            {categoryLabels.map((label) => (
                              <span key={label} className="rounded-lg bg-background px-2.5 py-1 text-xs font-medium ring-1 ring-border">
                                {label}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Description</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {values.details || 'Non renseigné'}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Destinataire</p>
                        <p className="mt-1 font-medium">{selectedBranch?.name}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Compte</p>
                        <p className="mt-1 text-sm">{user.email}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* boutts nav */}
                <div className="mt-10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(s - 1, 0))}
                    disabled={step === 0}
                    className="group inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-0"
                  >
                    <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                    Précédent
                  </button>

                  {step < STEPS.length - 1 ? (
                    <button
                      type="button"
                      onClick={next}
                      className="group inline-flex items-center gap-2 rounded-lg bg-brand-blue px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-brand-blue/90"
                    >
                      Continuer
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-brand-blue/90 disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Envoi…
                        </>
                      ) : (
                        'Envoyer la demande'
                      )}
                    </button>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-28 rounded-2xl border border-border bg-secondary p-6">
          <p className="label-eyebrow">Résumé</p>
          <div className="mt-5 space-y-4">
            {/* produits */}
            {items.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <ShoppingBag className="size-3.5" />
                  Produits ({totalItems()})
                </p>
                <div className="mt-2 space-y-1.5">
                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span className="truncate">{item.name}</span>
                      <span className="font-medium">x{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* autodection produits */}
            {categoryLabels.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground">Gammes concernées</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {categoryLabels.map((label) => (
                    <span key={label} className="rounded-lg bg-background px-2.5 py-1 text-xs font-medium ring-1 ring-border">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="text-xs font-medium text-muted-foreground">Destinataire</p>
              <p className="mt-1 text-sm font-medium">
                {selectedBranch ? selectedBranch.name : <span className="text-muted-foreground/60">—</span>}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
