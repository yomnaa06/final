import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { Hero } from '@/components/home/hero'
import { About } from '@/components/home/about'
import { Services } from '@/components/home/services'
import { Brands } from '@/components/home/brands'
import { CtaBand } from '@/components/home/cta'


export default function HomePage() {
  return (
    <>
      <Navbar overlay />
      <main>
        <Hero />
        <About />
        <Services />
        <Brands />
        <CtaBand />
      </main>
      <Footer />
    </>
  )
}
