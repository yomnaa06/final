import Link from 'next/link'
import { Reveal } from '@/components/site/reveal'
import { ArrowUpRight, ArrowRight } from 'lucide-react'

export function CtaBand() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <div className="rounded-2xl border border-border bg-secondary px-6 py-14 text-center md:px-16 md:py-20">
            <p className="label-eyebrow">Passons à l&apos;action</p>
            <h2 className="mx-auto mt-5 max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-display md:text-5xl">
              Obtenez votre devis en quelques minutes.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              Sélectionnez vos gammes, précisez votre demande et recevez une
              proposition adaptée à votre activité.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/devis"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90"
              >
                Construire mon devis
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/reclamation"
                className="group inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3.5 text-sm font-medium text-foreground transition-all duration-200 hover:border-foreground/20 hover:bg-secondary"
              >
                Adresser une réclamation
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
