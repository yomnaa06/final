import Image from 'next/image'
import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center', className)}>
      <Image
        src="/images/logo.png"
        alt="Seghaier Pièces Auto"
        width={180}
        height={180}
        priority
        className="h-12 w-12 shrink-0 object-contain md:h-14 md:w-14"
      />
    </span>
  )
}
