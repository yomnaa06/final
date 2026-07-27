import Link from 'next/link'
import { Reveal } from '@/components/site/reveal'
import {
  Filter, Droplets, Waypoints, Container,
  Snowflake, Disc3, Car, ArrowUpRight,
} from 'lucide-react'

const categories = [
  { icon: Filter,    label: 'Filtres',          desc: 'Air, huile, habitacle, carburant.',      color: 'text-brand-blue'  },
  { icon: Droplets,  label: 'Fluides',           desc: 'Fluides techniques et additifs.',         color: 'text-brand-blue'  },
  { icon: Waypoints, label: 'Suspensions',       desc: 'Amortisseurs, ressorts, rotules.',        color: 'text-brand-red'   },
  { icon: Container, label: 'Lubrifiants',       desc: 'Huiles moteur et transmission.',          color: 'text-brand-blue'  },
  { icon: Snowflake, label: 'Refroidissement',   desc: 'Radiateurs, pompes, durites.',            color: 'text-brand-blue'  },
  { icon: Disc3,     label: 'Freinage',          desc: 'Plaquettes, disques, étriers.',           color: 'text-brand-red'   },
  { icon: Car,       label: 'Carrosserie',       desc: 'Optiques, éléments, fixations.',          color: 'text-brand-blue'  },
]

export function Services() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">

        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="label-eyebrow">Nos gammes</p>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-4 max-w-lg text-pretty text-3xl font-bold leading-[1.1] tracking-display md:text-4xl">
                Un catalogue complet,<br />
                <span className="text-brand-blue">structuré par expertise.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <Link href="/devis"
              className="group inline-flex items-center gap-1.5 rounded-lg border border-brand-blue/20 bg-brand-blue-light px-4 py-2 text-sm font-semibold text-brand-blue transition-all duration-200 hover:bg-brand-blue hover:text-white">
              Demander un devis
              <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c.label} delay={i % 4}>
              <div className="group relative flex h-full flex-col gap-8 overflow-hidden rounded-xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-lg hover:shadow-brand-blue/8">
                {/* Top accent line — appears on hover */}
                <div className="absolute inset-x-0 top-0 h-0.5 scale-x-0 rounded-full bg-gradient-to-r from-brand-blue to-brand-blue-mid transition-transform duration-300 group-hover:scale-x-100" />

                <div className={`flex size-10 items-center justify-center rounded-lg bg-brand-blue-light transition-colors duration-200 group-hover:bg-brand-blue ${c.color}`}>
                  <c.icon className="size-5 transition-colors duration-200 group-hover:text-white" strokeWidth={1.75} />
                </div>

                <div>
                  <h3 className="text-[15px] font-semibold tracking-tight">{c.label}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}

          {/* CTA card */}
          <Reveal delay={3}>
            <Link href="/devis"
              className="group relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-xl bg-gradient-to-br from-brand-blue to-[#162d4a] p-6 text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-blue/30">
              {/* Red accent dot */}
              <div className="absolute right-5 top-5 size-2.5 rounded-full bg-brand-red shadow-lg shadow-brand-red/50" />

              <ArrowUpRight className="size-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <div>
                <h3 className="text-[15px] font-semibold">Besoin spécifique ?</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                  Construisez votre devis sur mesure.
                </p>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
