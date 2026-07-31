"use client";

import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { Brands } from '@/components/home/brands';

export default function MarquesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[70px] min-h-screen">
        <Brands />
      </main>
      <Footer />
    </>
  );
}