"use client";

import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { About } from '@/components/home/about';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[70px] min-h-screen">
        <About />
      </main>
      <Footer />
    </>
  );
}