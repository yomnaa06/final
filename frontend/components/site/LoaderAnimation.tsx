<<<<<<< HEAD
=======
// components/site/LoaderAnimation.tsx
>>>>>>> 0b84bae6a5da1fec2ea21b3fa8e6addf05d4415b
"use client";

import React, { useEffect, useState } from 'react';

const LoaderAnimation = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const letters = ['G', 'r', 'o', 'u', 'p', 'e', '_', 'S', 'e', 'g', 'h', 'a', 'i', 'e', 'i', 'r'];

  return (
    <div className="loader" id="loader">
      <div className="loader-wrapper" style={{ width: '190px', height: '190px' }}>
        {letters.map((letter, index) => (
          <span
            key={index}
            className="loader-letter"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              fontSize: '1.05em'
            }}
          >
            {letter}
          </span>
        ))}
        <div className="loader-circle" />
      </div>
    </div>
  );
};

export default LoaderAnimation;