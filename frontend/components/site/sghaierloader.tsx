// components/site/SeghaierLoader.tsx
"use client";

import React, { useEffect, useState } from 'react';

const SeghaierLoader = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const letters = 'SEGHAIER'.split('');

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Rotating rings */}
      <div className="absolute inset-0 rounded-full border-2 border-blue-400/20 animate-[spin_8s_linear_infinite]" />
      <div className="absolute inset-3 rounded-full border-2 border-red-400/20 animate-[spin_6s_linear_infinite_reverse]" />
      <div className="absolute inset-6 rounded-full border-2 border-blue-400/30 animate-[spin_10s_linear_infinite]" />
      
      {/* Glowing background */}
      <div className="absolute inset-8 rounded-full bg-gradient-to-br from-blue-600/20 to-red-500/20 animate-pulse blur-2xl" />
      
      {/* Letters */}
      <div className="relative z-10 flex gap-1">
        {letters.map((letter, index) => (
          <span
            key={index}
            className="text-3xl md:text-4xl font-bold text-white"
            style={{
              animation: `letterGlow 1.5s ease-in-out infinite`,
              animationDelay: `${index * 0.15}s`,
              opacity: 0.3,
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SeghaierLoader;