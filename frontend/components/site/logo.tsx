<<<<<<< HEAD
=======
// components/site/logo.tsx
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center gap-3 group">
<<<<<<< HEAD
      {/* logo */}
=======
      {/* Logo Image */}
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
      <div className="relative flex-shrink-0">
        <Image
          src="/images/logo.png"
          alt="SEGHAIER Pièces Auto GROS"
          width={60}
          height={60}
          className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>
      
<<<<<<< HEAD
      {/* text */}
=======
      {/* Text */}
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
      <div className="leading-none">
        <span className="block font-serif text-xl md:text-2xl lg:text-3xl font-bold text-foreground tracking-tight group-hover:text-blue-600 transition-colors duration-300">
          SEGHAIER
        </span>
        <span className="block text-[9px] md:text-[10px] lg:text-[11px] font-semibold tracking-[0.28em] uppercase text-muted-foreground">
          Pièces Auto — GROS
        </span>
      </div>
    </div>
  );
}