import { Reveal } from '@/components/site/reveal'

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <section className="border-b border-border bg-background pt-28 md:pt-36">
      <div className="mx-auto max-w-7xl px-5 pb-12 md:px-8 md:pb-16">
        <Reveal>
          <p className="label-eyebrow">{eyebrow}</p>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="mt-4 max-w-3xl text-pretty text-4xl font-semibold leading-[1.05] tracking-display md:text-6xl">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
