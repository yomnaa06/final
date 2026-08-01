
"use client";

import { useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { collections, products } from '@/data/products';

type SortOption = "featured" | "newest" | "price-asc" | "price-desc";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "À la une" },
  { value: "newest", label: "Nouveautés" },
  { value: "price-asc", label: "Prix: Croissant" },
  { value: "price-desc", label: "Prix: Décroissant" },
];

// contenue de produits
function ProductsContent() {
  const searchParams = useSearchParams();
  const activeCollection = searchParams.get('collection') || 'all';
  const activeSort = (searchParams.get('sort') as SortOption) || 'featured';

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

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
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'featured':
      default:
        result = result.filter((p) => p.featured).concat(result.filter((p) => !p.featured));
        break;
    }

    return result;
  }, [activeCollection, activeSort]);

  const currentCollection = activeCollection !== 'all'
    ? collections.find((c) => c.slug === activeCollection)
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
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-[70px]">
        {/* hero */}
        <section className="relative h-[40vh] md:h-[55vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={currentCollection?.heroImage || '/images/main.png'}
              alt={currentCollection?.name || 'Tous les produits'}
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
                {currentCollection ? 'Collection' : 'Catalogue'}
              </p>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-3 leading-[0.95]">
                {currentCollection ? currentCollection.name : 'Tous les produits'}
              </h1>
              {currentCollection && (
                <p className="text-base text-white/70 max-w-lg">
                  {currentCollection.description}
                </p>
              )}
            </motion.div>
          </div>
        </section>

        {/* flitre a tri */}
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
                  Tous
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
                <span className="text-xs text-gray-500 tracking-[0.1em] uppercase">
                  Trier par
                </span>
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

        {/* grid produits */}
        <section className="py-10 md:py-16">
          <div className="container mx-auto max-w-7xl px-5">
            {filteredAndSortedProducts.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-8">
                  <p className="text-sm text-gray-500">
                    {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'produit' : 'produits'}
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
                            )}
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-gray-400">
                            {product.brand || 'Marque'}
                          </p>
                          <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-0.5">
                            {product.price} TND
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500">Aucun produit trouvé dans cette collection.</p>
              </div>
            )}
          </div>
        </section>

        {/* bootom cta */}
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
}