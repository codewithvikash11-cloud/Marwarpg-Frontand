"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";

// A simple floating particles component
const Particles = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-secondary/60 blur-[1px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            boxShadow: "0 0 10px 2px rgba(212, 162, 76, 0.4)",
          }}
          animate={{
            y: ["0vh", "-100vh"],
            x: [`${p.x}%`, `${p.x + (Math.random() * 10 - 5)}%`],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);

  // Use the generated hero banner image
  // The exact filename might vary slightly, assuming we rename it or use a known pattern.
  // Actually, we know there's one image starting with hero_banner in public/images
  // We can just use the first matching one or hardcode if we know the exact name.
  // For safety, let's use a standard path and assume we'll rename or we pass it via props.
  // Wait, I will use `hero_banner_1780949040269.png` as it was listed earlier.

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <Image
          src="/images/hero_banner_1780949040269.png"
          alt="Luxury Royal Rajasthan Haveli"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
      </motion.div>

      <Particles />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 border border-secondary/50 text-secondary text-sm font-semibold tracking-widest uppercase mb-6 backdrop-blur-md">
            Premium Student Living
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 tracking-tight drop-shadow-2xl"
        >
          ROYAL MARWAR <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-[#FFE29F] to-secondary">
            BOYS PG
          </span>
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xl md:text-3xl font-light text-gray-200 mb-8 font-serif"
        >
          Your Home Away From Home
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-2xl mx-auto text-base md:text-lg text-gray-300 mb-10 leading-relaxed"
        >
          Premium Accommodation for Students & Working Professionals with Hygienic Food, High-Speed WiFi and Modern Facilities.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full shadow-[0_0_20px_rgba(212,162,76,0.3)] hover:shadow-[0_0_30px_rgba(212,162,76,0.5)] transition-all" asChild>
            <Link href="#contact">Book Now</Link>
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full bg-white/5 border-white/20 text-white hover:bg-white/10 backdrop-blur-md" asChild>
            <Link href="#rooms">View Rooms</Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
      >
        <span className="text-white/60 text-xs tracking-[0.2em] uppercase mb-2">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-12 bg-gradient-to-b from-secondary to-transparent"
        />
      </motion.div>
    </section>
  );
}
