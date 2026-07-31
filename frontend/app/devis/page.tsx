import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { PageHero } from '@/components/site/page-hero'
import { QuoteForm } from '@/components/quote/quote-form'

export const metadata: Metadata = {
  title: 'Demander un devis — Seghaier Auto Parts',
  description:
    'Construisez votre devis de pièces automobiles en quelques étapes. Sélection des gammes, destinataire et coordonnées.',
}

export default function DevisPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Demande de devis"
          title="Construisez votre devis."
          description="Sélectionnez vos gammes, précisez votre besoin et choisissez la branche destinataire. Réponse sous 24 heures ouvrées."
        />
        <section className="bg-background">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
            <QuoteForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
