<<<<<<< HEAD

"use client";

import { useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
=======
// app/products/page.tsx
"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
<<<<<<< HEAD
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { collections, products } from '@/data/products';
=======
import { Navbar } from '@/components/site/navbar';  // ← ADD THIS
import { Footer } from '@/components/site/footer';  // ← ADD THIS

// ===== COLLECTIONS =====
const collections = [
  {
    id: 'filtres',
    name: 'Filtration',
    slug: 'filtres',
    description: 'Filtres à huile, air, habitacle et carburant sélectionnés pour un usage professionnel intensif.',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1920&q=80',
  },
  {
    id: 'fluides',
    name: 'Fluides',
    slug: 'fluides',
    description: 'Ad-Blue, eau batterie, huile de frein, liquide nettoyant, liquide refroidissement.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80',
  },
  {
    id: 'lubrifiants',
    name: 'Lubrifiants',
    slug: 'lubrifiants',
    description: 'Huiles moteur, transmission et graisses techniques de qualité constructeur.',
    image: 'https://images.unsplash.com/photo-1615887476721-8447bad6df53?w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1615887476721-8447bad6df53?w=1920&q=80',
  },
  {
    id: 'freinage',
    name: 'Freinage',
    slug: 'freinage',
    description: 'Plaquettes, disques, mâchoires et liquides — la sécurité au cœur de chaque référence.',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1920&q=80',
  },
  {
    id: 'suspensions',
    name: 'Suspensions',
    slug: 'suspensions',
    description: 'Amortisseurs, ressorts et pièces de train roulant conçus pour durer.',
    image: 'https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?w=1920&q=80',
  },
  {
    id: 'refroidissement',
    name: 'Refroidissement',
    slug: 'refroidissement',
    description: 'Radiateurs, thermostats, pompes à eau et liquides pour préserver le moteur.',
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=1920&q=80',
  },
  {
    id: 'carrosserie',
    name: 'Carrosserie',
    slug: 'carrosserie',
    description: 'Optiques, rétroviseurs, boucliers et éléments de carrosserie d\'origine.',
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=80',
  },
];

// ===== PRODUCTS =====
const products = [
  // Filtration
  { id: 'filtre-huile-bosch', name: 'Filtre à huile P3316', collection: 'filtres', price: 18, brand: 'Bosch', description: 'Cartouche filtrante haute capacité pour moteurs Diesel.', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=80', featured: true, new: true },
  { id: 'filtre-air-mahle', name: 'Filtre à air LX 1566', collection: 'filtres', price: 24, brand: 'Mahle', description: 'Media filtrant micro-fibre pour un débit d\'air optimal.', image: 'https://images.unsplash.com/photo-1519641643908-af57e9226b19?w=1200&q=80', featured: false, new: false },
  // Fluides
  { id: 'ad-blue', name: 'Ad-Blue 10 L', collection: 'fluides', price: 45, brand: 'Total', description: 'Solution pour réduction des émissions NOx.', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80', featured: true, new: true },
  { id: 'liquide-frein-ferodo', name: 'Liquide de frein DOT 4 — 1 L', collection: 'fluides', price: 14, brand: 'Ferodo', description: 'Point d\'ébullition ≥ 260 °C, résistance à l\'humidité.', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80', featured: false, new: false },
  // Freinage
  { id: 'plaquettes-brembo', name: 'Plaquettes avant P85 020', collection: 'freinage', price: 84, brand: 'Brembo', description: 'Garniture faible poussière, freinage progressif.', image: 'https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?w=1200&q=80', featured: true, new: false },
  { id: 'disques-ate', name: 'Disques ventilés Ø 288 mm', collection: 'freinage', price: 96, brand: 'ATE', description: 'Disques ventilés haute performance, revêtement anti-corrosion.', image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80', featured: false, new: true },
  // Lubrifiants
  { id: 'total-quartz', name: 'Total Quartz 9000 5W-40 — 5 L', collection: 'lubrifiants', price: 108, brand: 'Total', description: 'Huile 100 % synthèse pour moteurs modernes.', image: 'https://images.unsplash.com/photo-1615887476721-8447bad6df53?w=1200&q=80', featured: true, new: true },
  { id: 'elf-evolution', name: 'Elf Evolution Fulltech 5W-30 — 5 L', collection: 'lubrifiants', price: 118, brand: 'Elf', description: 'Formulation FAP compatible pour Diesel équipés de filtre à particules.', image: 'https://images.unsplash.com/photo-1615887476721-8447bad6df53?w=1200&q=80', featured: false, new: false },
  // Suspensions
  { id: 'amortisseur-monroe', name: 'Amortisseur avant G8108', collection: 'suspensions', price: 128, brand: 'Monroe', description: 'Amortisseur à gaz — tenue de route et confort.', image: 'https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?w=1200&q=80', featured: true, new: true },
  { id: 'ressort-lesjofors', name: 'Ressort avant renforcé', collection: 'suspensions', price: 68, brand: 'Lesjöfors', description: 'Acier à haute résistance pour charges lourdes.', image: 'https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?w=1200&q=80', featured: false, new: false },
  // Refroidissement
  { id: 'radiateur-valeo', name: 'Radiateur moteur', collection: 'refroidissement', price: 246, brand: 'Valeo', description: 'Structure aluminium brasé, connectique renforcée.', image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=1200&q=80', featured: false, new: false },
  { id: 'thermostat-behr', name: 'Thermostat TX 110', collection: 'refroidissement', price: 38, brand: 'Behr', description: 'Ouverture à 87 °C, montage direct.', image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=1200&q=80', featured: false, new: true },
  // Carrosserie
  { id: 'optique-valeo', name: 'Projecteur avant droit', collection: 'carrosserie', price: 312, brand: 'Valeo', description: 'Bloc optique halogène, connectique d\'origine.', image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=80', featured: false, new: true },
  { id: 'retro-hella', name: 'Rétroviseur extérieur gauche', collection: 'carrosserie', price: 148, brand: 'Hella', description: 'Coque à peindre, réglage électrique.', image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80', featured: false, new: false },
];
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b

type SortOption = "featured" | "newest" | "price-asc" | "price-desc";

const sortOptions: { value: SortOption; label: string }[] = [
<<<<<<< HEAD
  { value: "featured", label: "À la une" },
  { value: "newest", label: "Nouveautés" },
  { value: "price-asc", label: "Prix: Croissant" },
  { value: "price-desc", label: "Prix: Décroissant" },
];

// contenue de produits
function ProductsContent() {
=======
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function ProductsPage() {
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
  const searchParams = useSearchParams();
  const activeCollection = searchParams.get('collection') || 'all';
  const activeSort = (searchParams.get('sort') as SortOption) || 'featured';

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];
<<<<<<< HEAD

    // filtration par collection
    if (activeCollection !== 'all') {
      const collection = collections.find((c) => c.slug === activeCollection);
      if (collection) {
        result = result.filter((product) => product.collection === collection.id);
      }
    }

    // Sort
    switch (activeSort) {
      case 'newest':
        result = result.filter((p) => p.new).concat(result.filter((p) => !p.new));
=======
    if (activeCollection !== 'all') {
      result = result.filter(p => p.collection === activeCollection);
    }
    switch (activeSort) {
      case 'newest':
        result = result.filter(p => p.new).concat(result.filter(p => !p.new));
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'featured':
      default:
<<<<<<< HEAD
        result = result.filter((p) => p.featured).concat(result.filter((p) => !p.featured));
        break;
    }

=======
        result = result.filter(p => p.featured).concat(result.filter(p => !p.featured));
        break;
    }
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
    return result;
  }, [activeCollection, activeSort]);

  const currentCollection = activeCollection !== 'all'
<<<<<<< HEAD
    ? collections.find((c) => c.slug === activeCollection)
=======
    ? collections.find(c => c.slug === activeCollection)
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
    : null;

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === 'all' || value === 'featured') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  return (
    <>
<<<<<<< HEAD
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-[70px]">
        {/* hero */}
        <section className="relative h-[40vh] md:h-[55vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={currentCollection?.heroImage || '/images/main.png'}
              alt={currentCollection?.name || 'Tous les produits'}
=======
      <Navbar /> {/* ← ADD NAVBAR HERE */}
      <div className="min-h-screen bg-gray-50 pt-[70px]"> {/* ← Add padding-top for fixed navbar */}
        {/* ===== HERO BANNER ===== */}
        <section className="relative h-[40vh] md:h-[55vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={currentCollection?.heroImage || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80'}
              alt={currentCollection?.name || 'All Products'}
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />
          </div>
          <div className="relative container mx-auto max-w-7xl px-5 h-full flex flex-col justify-end pb-12 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/50 mb-3">
<<<<<<< HEAD
                {currentCollection ? 'Collection' : 'Catalogue'}
              </p>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-3 leading-[0.95]">
                {currentCollection ? currentCollection.name : 'Tous les produits'}
=======
                {currentCollection ? 'Collection' : 'Shop'}
              </p>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-3 leading-[0.95]">
                {currentCollection ? currentCollection.name : 'All Pieces'}
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
              </h1>
              {currentCollection && (
                <p className="text-base text-white/70 max-w-lg">
                  {currentCollection.description}
                </p>
              )}
            </motion.div>
          </div>
        </section>

<<<<<<< HEAD
        {/* flitre a tri */}
=======
        {/* ===== FILTERS & SORTING ===== */}
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
        <section className="sticky top-[70px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 py-4">
          <div className="container mx-auto max-w-7xl px-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                <button
                  onClick={() => updateFilters('collection', 'all')}
                  className={cn(
                    "px-4 py-1.5 text-xs font-medium tracking-[0.1em] uppercase whitespace-nowrap transition-all duration-300 rounded-full",
                    activeCollection === 'all'
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  )}
                >
<<<<<<< HEAD
                  Tous
=======
                  All
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
                </button>
                {collections.map((collection) => (
                  <button
                    key={collection.id}
                    onClick={() => updateFilters('collection', collection.slug)}
                    className={cn(
                      "px-4 py-1.5 text-xs font-medium tracking-[0.1em] uppercase whitespace-nowrap transition-all duration-300 rounded-full",
                      activeCollection === collection.slug
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    )}
                  >
                    {collection.name}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
<<<<<<< HEAD
                <span className="text-xs text-gray-500 tracking-[0.1em] uppercase">
                  Trier par
                </span>
=======
                <span className="text-xs text-gray-500 tracking-[0.1em] uppercase">Sort by</span>
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
                <Select value={activeSort} onValueChange={(value) => updateFilters('sort', value)}>
                  <SelectTrigger className="w-[160px] rounded-full text-xs h-9 border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-xs">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

<<<<<<< HEAD
        {/* grid produits */}
=======
        {/* ===== PRODUCTS GRID ===== */}
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
        <section className="py-10 md:py-16">
          <div className="container mx-auto max-w-7xl px-5">
            {filteredAndSortedProducts.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-8">
                  <p className="text-sm text-gray-500">
<<<<<<< HEAD
                    {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'produit' : 'produits'}
=======
                    {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'piece' : 'pieces'}
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {filteredAndSortedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="group"
                    >
<<<<<<< HEAD
                      <Link href={`/product/${product.slug}`} className="block">
                        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-lg">
                          <img
                            src={product.images[0] || '/images/placeholder-product.jpg'}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/placeholder-product.jpg';
                            }}
                          />
                          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                            {product.new && (
                              <span className="px-2.5 py-1 text-[8px] font-semibold tracking-[0.2em] uppercase bg-black text-white rounded-full">
                                Nouveau
                              </span>
                            )}
                            {product.featured && (
                              <span className="px-2.5 py-1 text-[8px] font-semibold tracking-[0.2em] uppercase bg-blue-600 text-white rounded-full">
                                À la une
                              </span>
=======
                      <Link href={`/product/${product.id}`} className="block">
                        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-lg">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                            {product.new && (
                              <span className="px-2.5 py-1 text-[8px] font-semibold tracking-[0.2em] uppercase bg-black text-white rounded-full">New</span>
                            )}
                            {product.featured && (
                              <span className="px-2.5 py-1 text-[8px] font-semibold tracking-[0.2em] uppercase bg-blue-600 text-white rounded-full">Featured</span>
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
                            )}
                          </div>
                        </div>
                        <div className="mt-3">
<<<<<<< HEAD
                          <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-gray-400">
                            {product.brand || 'Marque'}
                          </p>
                          <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-0.5">
                            {product.price} TND
                          </p>
=======
                          <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-gray-400">{product.brand}</p>
                          <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{product.name}</h3>
                          <p className="text-sm text-gray-600 mt-0.5">{product.price} TND</p>
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
<<<<<<< HEAD
                <p className="text-gray-500">Aucun produit trouvé dans cette collection.</p>
=======
                <p className="text-gray-500">No products found in this collection.</p>
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
              </div>
            )}
          </div>
        </section>

<<<<<<< HEAD
        {/* bootom cta */}
=======
        {/* ===== BOTTOM CTA ===== */}
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
        <section className="bg-blue-900 py-16 text-white">
          <div className="container mx-auto max-w-7xl px-5 text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Besoin spécifique ?</h2>
            <p className="text-blue-200 mb-6">Construisez votre devis sur mesure en quelques clics.</p>
            <Link href="/devis" className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
              Demander un devis <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </div>
<<<<<<< HEAD
      <Footer />
    </>
  );
}

// export
export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">Chargement...</div>}>
      <ProductsContent />
    </Suspense>
  );
=======
      <Footer /> {/* ← ADD FOOTER HERE */}
    </>
  );
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
}