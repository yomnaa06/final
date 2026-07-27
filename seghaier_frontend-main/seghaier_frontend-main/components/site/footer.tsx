import Link from 'next/link'
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react'
import { Logo } from './logo'
import { NAV_LINKS, BRANCHES } from '@/lib/site'

export function Footer() {
  return (
    <footer
      id="contact"
      className="bg-steel text-steel-foreground scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="text-steel-foreground">
              <Logo />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-steel-foreground/60">
              Distributeur de pièces automobiles de précision en Tunisie.
              Qualité constructeur, disponibilité et service B2B irréprochable
              depuis plus de vingt ans.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-steel-foreground/40">
              Navigation
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-steel-foreground/70 transition-colors hover:text-steel-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/reclamation"
                  className="text-sm text-steel-foreground/70 transition-colors hover:text-steel-foreground"
                >
                  Réclamation
                </Link>
              </li>
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-steel-foreground/40">
              Nos branches
            </h3>
            <ul className="mt-5 space-y-4">
              {BRANCHES.map((b) => (
                <li key={b.id}>
                  <p className="text-sm font-medium text-steel-foreground">
                    {b.name}
                  </p>
                  <p className="text-xs text-steel-foreground/50">{b.role}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-steel-foreground/40">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-steel-foreground/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-steel-foreground/40" />
                <span>Zone Industrielle, Ben Arous, Tunisie</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-steel-foreground/40" />
                <span>+216 71 000 000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-steel-foreground/40" />
                <span>contact@seghaier.tn</span>
              </li>
            </ul>
            <Link
              href="/devis"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-steel-foreground"
            >
              Demander un devis
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-steel-foreground/40 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Seghaier Auto Parts. Tous droits réservés.</p>
          <p className="font-mono uppercase tracking-[0.18em]">
            Précision · Fiabilité · Confiance
          </p>
        </div>
      </div>
    </footer>
  )
}
