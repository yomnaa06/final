// src/components/home/about.tsx
"use client";

import { Shield, Truck, Users } from 'lucide-react'

export function About() {
  return (
    <section className="bg-blue-900 py-16 md:py-24 text-white">
      <div className="container mx-auto max-w-7xl px-5 md:px-8">

        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blue-300/60">
            À propos
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight">
            Une exigence industrielle, <br />
            <span className="text-blue-300">une culture familiale.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-blue-100/80 max-w-3xl mx-auto">
            Fondée en 1987, SEGHAIER Pièces Auto approvisionne les garages, 
            flottes et industriels tunisiens en composants automobiles d'origine. 
            Chaque référence de notre catalogue est sélectionnée pour sa fiabilité, 
            sa traçabilité et son adéquation à un usage professionnel intensif.
          </p>
        </div>

        {/* Three Pillars */}
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Shield,
              title: 'Qualité constructeur',
              desc: 'Chaque référence est sélectionnée auprès de fabricants certifiés et contrôlée avant expédition.'
            },
            {
              icon: Truck,
              title: 'Disponibilité immédiate',
              desc: 'Un stock profond et une logistique maîtrisée pour répondre à vos commandes sans délai.'
            },
            {
              icon: Users,
              title: 'Service B2B dédié',
              desc: 'Un interlocuteur unique, des devis rapides et un suivi de commande transparent.'
            },
          ].map((item, index) => (
            <div key={item.title} className="text-center md:text-left">
              <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blue-300/40 mb-4">
                {String(index + 1).padStart(2, '0')}
              </p>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <item.icon className="size-5 text-blue-300" />
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm leading-relaxed text-blue-100/70">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-16 md:grid-cols-4">
          {[
            { number: '1987', label: 'Fondée en' },
            { number: '12 000+', label: 'Références en stock' },
            { number: '40+', label: 'Marques partenaires' },
            { number: '24h', label: 'Délai de livraison' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">{stat.number}</p>
              <p className="mt-1 text-sm text-blue-200/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}