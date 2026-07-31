"use client";

import { Reveal } from '@/components/site/reveal';
import Image from 'next/image';

// marques
const brands = [
  { name: 'BOSCH', image: '/images/brands/bosch.png' },
  { name: 'MAHLE', image: '/images/brands/mahle.png' },
  { name: 'VALEO', image: '/images/brands/valeo.png' },
  { name: 'SKF', image: '/images/brands/skf.png' },
  { name: 'BREMBO', image: '/images/brands/brembo.png' },
  { name: 'MANN-FILTER', image: '/images/brands/mann-filter.png' },
  { name: 'SACHS', image: '/images/brands/sachs.png' },
  { name: 'NGK', image: '/images/brands/ngk.png' },
  { name: 'FEBI', image: '/images/brands/febi.png' },
  { name: 'CONTINENTAL', image: '/images/brands/continental.png' },
  { name: 'CASTROL', image: '/images/brands/castrol.png' },
  { name: 'TOTAL', image: '/images/brands/total.png' },
];

export function Brands() {
  return (
    <section id="marques" className="scroll-mt-20 border-b border-border bg-gray-50">
      <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">

        {/* header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-red-500">
                Nos marques partenaires
              </p>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-4 text-pretty text-3xl font-serif font-bold leading-[1.1] text-gray-900 md:text-4xl">
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

        {/* marques grid */}
        <div className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {brands.map((brand, i) => (
            <Reveal key={brand.name} delay={i % 6}>
              <div className="group flex h-24 items-center justify-center rounded-xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:border-brand-blue/30 hover:shadow-lg hover:shadow-brand-blue/5 hover:-translate-y-0.5">
                <div className="relative w-full h-14">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-contain transition-all duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 80px, 120px"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* texte de desc */}
        <Reveal delay={2}>
          <p className="mt-8 text-center text-sm text-muted-foreground/60">
            + 40 autres marques disponibles sur demande
          </p>
        </Reveal>

      </div>
    </section>
  );
}