import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { PageHero } from '@/components/site/page-hero'
import { ComplaintForm } from '@/components/complaint/complaint-form'
import { Reveal } from '@/components/site/reveal'
import { Clock, ShieldCheck, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Réclamation — Seghaier Auto Parts',
  description:
    'Signalez un problème sur une commande ou une pièce. Notre service qualité traite chaque réclamation sous 48 heures.',
}

const assurances = [
  {
    icon: Clock,
    title: 'Réponse sous 48 h',
    text: 'Chaque dossier reçoit un numéro de suivi et une réponse rapide.',
  },
  {
    icon: ShieldCheck,
    title: 'Garantie constructeur',
    text: 'Les pièces défectueuses sont remplacées ou remboursées.',
  },
  {
    icon: Phone,
    title: 'Support dédié',
    text: 'Un conseiller qualité vous accompagne jusqu’à la résolution.',
  },
]

export default function ComplaintPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Service qualité"
          title="Déposer une réclamation."
          description="Une pièce non conforme ou un souci sur votre commande ? Décrivez le problème, notre équipe s’en occupe."
        />
        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1fr_360px]">
          <Reveal>
            <ComplaintForm />
          </Reveal>
          <div className="space-y-4">
            {assurances.map((a, i) => {
              const Icon = a.icon
              return (
                <Reveal key={a.title} delay={i + 1}>
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="mt-4 font-semibold tracking-display">{a.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
