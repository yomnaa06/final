
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { getProductBySlug, getRelatedProducts, collections } from '@/data/products';
import { cn } from '@/lib/utils';
import { useDevis } from '@/hooks/useDevis';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);
  const { items, addItem, removeItem, totalItems } = useDevis();

  useEffect(() => {
    if (slug) {
      const found = getProductBySlug(slug);
      if (found) {
        setProduct(found);
      }
      setLoading(false);
    }
  }, [slug]);

  // Check if product is already in devis
  const isInDevis = product ? items.some(item => item.productId === product.id) : false;

  const handleAddToDevis = () => {
    if (product) {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        brand: product.brand || '',
        reference: product.dimensions || '',
        image: product.images[0] || '',
      });
      setQuantity(1);
    }
  };

  const handleRemoveFromDevis = () => {
    if (product) {
      removeItem(product.id);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-[70px]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Chargement...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-[70px]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Produit non trouvé</h1>
            <p className="text-gray-500 mb-6">Le produit que vous recherchez n'existe pas.</p>
            <Link href="/products" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              <ArrowLeft className="size-4" />
              Retour au catalogue
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const relatedProducts = getRelatedProducts(product.id);
  const collection = collections.find((c) => c.id === product.collection);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-[70px]">
        <div className="container mx-auto max-w-7xl px-5 py-8">
          
          {/* boutton back */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-6"
          >
            <ArrowLeft className="size-4" />
            Retour au catalogue
          </Link>

          {/* details produits */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
            
            {/* images */}
            <div>
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-xl">
                <img
                  src={product.images[0] || '/images/placeholder-product.jpg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                    >
                      <ChevronRight className="size-5" />
                    </button>
                  </>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                  {product.images.map((img: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all",
                        index === currentImageIndex
                          ? "border-blue-600"
                          : "border-transparent hover:border-gray-300"
                      )}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* infos */}
            <div>
              {collection && (
                <Link
                  href={`/products?collection=${collection.slug}`}
                  className="text-xs font-medium tracking-[0.2em] uppercase text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {collection.name}
                </Link>
              )}
              
              <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
                {product.name}
              </h1>
              
              <p className="text-3xl font-bold text-blue-600 mb-4">
                {product.price} TND
              </p>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                {product.longDescription || product.description}
              </p>

              {/* details */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                {product.materials && (
                  <div>
                    <span className="text-xs font-medium uppercase text-gray-400">Compatibilité</span>
                    <p className="text-sm text-gray-700">{product.materials}</p>
                  </div>
                )}
                {product.dimensions && (
                  <div>
                    <span className="text-xs font-medium uppercase text-gray-400">Référence</span>
                    <p className="text-sm text-gray-700">{product.dimensions}</p>
                  </div>
                )}
                {product.brand && (
                  <div>
                    <span className="text-xs font-medium uppercase text-gray-400">Marque</span>
                    <p className="text-sm text-gray-700">{product.brand}</p>
                  </div>
                )}
              </div>

              {/* quantite a adding l devis */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">Quantité</span>
                  <div className="flex items-center gap-0 border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="px-6 py-2 text-center min-w-[50px] font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {isInDevis ? (
                    <button
                      onClick={handleRemoveFromDevis}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="size-5" />
                      Retirer du devis
                    </button>
                  ) : (
                    <button
                      onClick={handleAddToDevis}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      <ShoppingBag className="size-5" />
                      Ajouter au devis
                    </button>
                  )}
                  
                  <Link
                    href="/devis"
                    className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Voir mon devis
                  </Link>
                </div>

                {totalItems() > 0 && (
                  <p className="text-sm text-gray-500">
                    {totalItems()} produit{totalItems() > 1 ? 's' : ''} dans votre devis
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Produits similaires</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/product/${related.slug}`}
                    className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                      <img
                        src={related.images[0] || '/images/placeholder-product.jpg'}
                        alt={related.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {related.name}
                      </h3>
                      <p className="text-sm font-bold text-blue-600 mt-1">
                        {related.price} TND
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}