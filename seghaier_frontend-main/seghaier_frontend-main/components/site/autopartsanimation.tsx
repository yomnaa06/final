// components/site/AutoPartsAnimation.tsx
"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const AutoPartsAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const parts = [
      { symbol: '⚙️', x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: 30 + Math.random() * 20, speed: 0.2 + Math.random() * 0.3, opacity: 0.1 + Math.random() * 0.15 },
      { symbol: '🔧', x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: 25 + Math.random() * 20, speed: 0.15 + Math.random() * 0.3, opacity: 0.1 + Math.random() * 0.15 },
      { symbol: '🔩', x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: 20 + Math.random() * 15, speed: 0.25 + Math.random() * 0.3, opacity: 0.1 + Math.random() * 0.15 },
      { symbol: '⚡', x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: 25 + Math.random() * 20, speed: 0.3 + Math.random() * 0.3, opacity: 0.08 + Math.random() * 0.12 },
      { symbol: '🔋', x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: 20 + Math.random() * 15, speed: 0.18 + Math.random() * 0.3, opacity: 0.1 + Math.random() * 0.15 },
      { symbol: '🚗', x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: 35 + Math.random() * 25, speed: 0.1 + Math.random() * 0.2, opacity: 0.08 + Math.random() * 0.12 },
      { symbol: '🛞', x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: 25 + Math.random() * 20, speed: 0.2 + Math.random() * 0.3, opacity: 0.1 + Math.random() * 0.15 },
      { symbol: '🔧', x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: 20 + Math.random() * 15, speed: 0.22 + Math.random() * 0.3, opacity: 0.1 + Math.random() * 0.15 },
      { symbol: '⚙️', x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: 30 + Math.random() * 20, speed: 0.15 + Math.random() * 0.3, opacity: 0.1 + Math.random() * 0.15 },
      { symbol: '🔩', x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: 20 + Math.random() * 15, speed: 0.28 + Math.random() * 0.3, opacity: 0.08 + Math.random() * 0.12 },
      { symbol: '⚡', x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: 22 + Math.random() * 18, speed: 0.3 + Math.random() * 0.3, opacity: 0.08 + Math.random() * 0.12 },
      { symbol: '🔋', x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: 18 + Math.random() * 15, speed: 0.2 + Math.random() * 0.3, opacity: 0.1 + Math.random() * 0.15 },
    ];

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      parts.forEach((part, i) => {
        part.x += part.speed * (i % 2 === 0 ? 1 : -1);
        part.y += part.speed * (i % 3 === 0 ? 1 : -1);

        if (part.x > canvas.width + 50) part.x = -50;
        if (part.x < -50) part.x = canvas.width + 50;
        if (part.y > canvas.height + 50) part.y = -50;
        if (part.y < -50) part.y = canvas.height + 50;

        // Rotate effect with gradient
        const rotation = (Date.now() / 20000 + i) * 0.5;

        ctx.save();
        ctx.translate(part.x, part.y);
        ctx.rotate(rotation);
        ctx.font = `${part.size}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = part.opacity;
        
        // Add glow effect
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, part.size * 0.8);
        gradient.addColorStop(0, `rgba(59, 130, 246, ${part.opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(59, 130, 246, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, part.size * 0.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 255, 255, ${part.opacity * 0.8})`;
        ctx.fillText(part.symbol, 0, 0);
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default AutoPartsAnimation;