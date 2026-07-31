"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { collections } from '@/data/products';

export function Services() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards([0, 1, 2, 3]);
            }, 200);
            setTimeout(() => {
              setVisibleCards([0, 1, 2, 3, 4, 5, 6, 7]);
            }, 600);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // recuperation des cartes m liste produits
  const categories = collections.map((col) => ({
    slug: col.slug,
    label: col.name,
    desc: col.description,
    image: col.image,
  }));

  // carte devis
  const ctaCard = {
    slug: 'devis',
    label: 'Besoin spécifique ?',
    desc: 'Construisez votre devis sur mesure en quelques clics.',
    image: '',
    isCta: true
  };
  const cards = [...categories, ctaCard];

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto max-w-7xl px-5 md:px-8">

        {/*  header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400">
            EXPLORER
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl font-serif font-light text-gray-900">
            Nos familles de produits
          </h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            Découvrez nos 7 gammes de pièces automobiles de qualité constructeur
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-7 py-3 text-sm font-medium text-gray-700 shadow-sm hover:border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            Explorer toutes les gammes
            <ChevronRight className="size-4" />
          </Link>
        </div>

        {/* grid layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {cards.map((category, index) => {
            const isVisible = visibleCards.includes(index);
            const isCta = category.isCta;

            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{
                  duration: 0.7,
                  delay: index < 4 ? index * 0.12 : (index - 4) * 0.12 + 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="h-full"
              >
                {isCta ? (
                  // carte cta
                  <Link
                    href="/devis"
                    className="group block overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden p-8 flex flex-col justify-between h-full">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-red-500/20 to-transparent rounded-full -mr-16 -mt-16" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full -ml-12 -mb-12" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
                      
                      <div className="absolute top-6 right-6">
                        <div className="relative">
                          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                          <div className="absolute inset-0 w-3 h-3 rounded-full bg-red-500 animate-ping opacity-75" />
                        </div>
                      </div>

                      <div className="absolute top-0 left-0 right-0 h-1 flex">
                        <div className="flex-1 bg-blue-400" />
                        <div className="flex-1 bg-red-500" />
                        <div className="flex-1 bg-blue-400" />
                        <div className="flex-1 bg-red-500" />
                      </div>

                      <div className="flex-1 flex flex-col justify-center items-center text-center relative z-10">
                        <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-5xl font-bold text-white">?</span>
                        </div>
                        
                        <h3 className="text-2xl font-serif font-bold text-white mb-3">
                          Besoin spécifique ?
                        </h3>
                        <p className="text-sm text-white/70 leading-relaxed max-w-xs">
                          Construisez votre devis sur mesure en quelques clics.
                        </p>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-white/60 group-hover:text-white transition-all duration-300 relative z-10">
                        <span className="text-sm font-medium">Demander un devis</span>
                        <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-red-500 to-blue-400" />
                    </div>
                  </Link>
                ) : (
                  // category card
                  <Link
                    href={`/products?collection=${category.slug}`}
                    className="group block overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                      <img
                        src={category.image}
                        alt={category.label}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          // Fallback taswira if it doesnt load
                          (e.target as HTMLImageElement).src = '/images/placeholder-category.jpg';
                        }}
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/50 mb-1.5">
                          Collection
                        </p>
                        <h3 className="text-2xl md:text-3xl font-serif font-bold leading-tight">
                          {category.label}
                        </h3>
                        <p className="mt-2 text-sm text-white/70 leading-relaxed line-clamp-2">
                          {category.desc}
                        </p>
                        <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-white/60 opacity-0 group-hover:opacity-100 group-hover:gap-2 transition-all duration-300">
                          <span>EXPLORER</span>
                          <ArrowUpRight className="size-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>

        {/*  boutton loutani */}
        <div className="mt-14 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border-2 border-blue-600 px-8 py-3.5 text-sm font-semibold tracking-[0.15em] uppercase text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20"
          >
            Explorer le catalogue
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}