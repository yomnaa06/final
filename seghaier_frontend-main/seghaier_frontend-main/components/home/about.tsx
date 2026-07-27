import Image from 'next/image'
import { Reveal } from '@/components/site/reveal'

const pillars = [
  {
    number: '01',
    title: 'Qualité constructeur',
    text: 'Chaque référence est sélectionnée auprès de fabricants certifiés et contrôlée avant expédition.',
    color: 'text-brand-blue',
    bar: 'bg-brand-blue',
  },
  {
    number: '02',
    title: 'Disponibilité immédiate',
    text: 'Un stock profond et une logistique maîtrisée pour répondre à vos commandes sans délai.',
    color: 'text-brand-red',
    bar: 'bg-brand-red',
  },
  {
    number: '03',
    title: 'Service B2B dédié',
    text: 'Un interlocuteur unique, des devis rapides et un suivi de commande transparent.',
    color: 'text-brand-blue',
    bar: 'bg-brand-blue',
  },
]

export function About() {
  return (
    <section id="a-propos" className="scroll-mt-20 border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">

        {/* Top — headline + paragraph side by side */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="label-eyebrow mb-5">À propos</p>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="text-pretty text-3xl font-bold leading-[1.1] tracking-display md:text-5xl">
                Une exigence<br />industrielle,<br />
                <span className="text-brand-blue">une culture</span>{' '}
                <span className="text-brand-red">familiale.</span>
              </h2>
            </Reveal>
          </div>

          <div className="flex flex-col justify-end">
            <Reveal delay={2}>
              <p className="text-[15px] leading-[1.75] text-muted-foreground">
                Fondée en <span className="font-semibold text-foreground">1987</span>,
                SEGHAIER Pièces Auto approvisionne les garages, flottes et industriels
                tunisiens en composants automobiles d&apos;origine. Chaque référence de
                notre catalogue est sélectionnée pour sa fiabilité, sa traçabilité et
                son adéquation à un usage professionnel intensif.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Image */}
        <Reveal delay={1}>
          <div className="mt-12 overflow-hidden rounded-xl border border-border">
            <Image
              src="/images/warehouse.png"
              alt="Entrepôt de pièces automobiles organisé"
              width={1400}
              height={560}
              className="h-[260px] w-full object-cover md:h-[380px]"
            />
          </div>
        </Reveal>

        {/* Three pillars — horizontal rule design */}
        <div className="mt-16 grid gap-0 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i}>
              <div className="group relative overflow-hidden py-8 md:px-8 md:first:pl-0 md:last:pr-0">
                {/* Accent bar — slides in on hover */}
                <div className={`absolute left-0 top-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full ${p.bar} md:left-0 md:top-0 md:h-0.5 md:w-0`} />

                <span className={`font-mono text-xs font-semibold uppercase tracking-[0.18em] ${p.color}`}>
                  {p.number}
                </span>
                <h3 className="mt-3 text-base font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
