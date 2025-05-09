'use client';

import { useRef } from 'react';
import gsap from 'gsap';

export const AnimatedActiveButton = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particleLayerRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect || !particleLayerRef.current) return;

    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;

    for (let i = 0; i < 55; i++) {
      const delay = gsap.utils.random(0, 0.3);
      setTimeout(() => {
        createParticle(x, y);
      }, delay * 1000);
    }
  };

  const createParticle = (x: number, y: number) => {
    if (!particleLayerRef.current) return;

    const particle = document.createElement('div');
    const size = gsap.utils.random(30, 40);
    const color = `hsl(${gsap.utils.random(330, 60)}, 100%, 50%)`;

    Object.assign(particle.style, {
      position: 'absolute',
      left: `${x - size / 2}px`,
      top: `${y - size / 2}px`,
      width: `${size}px`,
      height: `${size}px`,
      background: color,
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: '0',
      opacity: '1',
      filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.7))',
    });

    particleLayerRef.current.appendChild(particle);

    gsap.to(particle, {
      x: gsap.utils.random(-600, 600),
      y: gsap.utils.random(-600, 600),
      opacity: 0,
      scale: gsap.utils.random(1.5, 3.5),
      duration: gsap.utils.random(1.5, 3),
      ease: 'power2.out',
      onComplete: () => {
        particle.remove();
      }
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-block w-fit h-fit"
      onClick={handleClick}
    >
      <div
        ref={particleLayerRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />
      <span
        className="relative z-10 text-white font-medium bg-primary px-4 pb-1 rounded-3xl cursor-pointer active:scale-95 transition-transform select-none"
      >
        active
      </span>
    </div>
  );
};
