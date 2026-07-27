import { Reveal } from '@/components/site/reveal'
import { PARTNER_BRANDS } from '@/lib/site'

// Map a brand to its "tier" — affects visual weight in the grid
const TIER_ONE = ['Bosch', 'Valeo', 'Brembo', 'SKF']

export function Brands() {
  return (
    <section id="marques" className="scroll-mt-20 border-b border-border bg-secondary">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">

        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="label-eyebrow">Nos marques partenaires</p>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-4 text-pretty text-3xl font-bold leading-[1.1] tracking-display md:text-4xl">
                Les équipementiers<br className="hidden md:block" />
                <span className="text-brand-blue"> de référence.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Nous travaillons exclusivement avec des fabricants certifiés,
              conformes aux standards constructeurs d&apos;origine.
            </p>
          </Reveal>
        </div>

        {/* Brands grid */}
        <div className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {PARTNER_BRANDS.map((brand, i) => {
            const isTier1 = TIER_ONE.includes(brand)
            return (
              <Reveal key={brand} delay={i % 6}>
                <div className={`group flex items-center justify-center rounded-lg border border-border bg-background transition-all duration-200 hover:border-brand-blue/30 hover:shadow-sm ${
                  isTier1 ? 'col-span-1 h-20' : 'col-span-1 h-16'
                }`}>
                  <div className="flex flex-col items-center gap-1 px-3">
                    {/* Coloured accent dot for tier-1 brands */}
                    {isTier1 && (
                      <span className="mb-0.5 h-0.5 w-5 rounded-full bg-brand-blue opacity-40 transition-opacity group-hover:opacity-100" />
                    )}
                    <span className={`font-semibold uppercase tracking-[0.12em] transition-colors duration-200 group-hover:text-brand-blue ${
                      isTier1
                        ? 'text-[13px] text-foreground'
                        : 'text-[11px] text-muted-foreground'
                    }`}>
                      {brand}
                    </span>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Footer note */}
        <Reveal delay={2}>
          <p className="mt-8 text-center text-xs text-muted-foreground/60">
            + 40 autres marques disponibles sur demande
          </p>
        </Reveal>

      </div>
    </section>
  )
}
