"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

function AnimatedCounter({ end, duration = 2, suffix = "" }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      if (progress < duration * 1000) {
        const nextCount = Math.min(Math.floor((progress / (duration * 1000)) * end), end);
        setCount(nextCount);
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
}

export function About() {
  const stats = [
    { label: "Years of Experience", value: 10, suffix: "+" },
    { label: "Happy Residents", value: 500, suffix: "+" },
    { label: "Premium Facilities", value: 15, suffix: "+" },
    { label: "Google Rating", value: 4, suffix: ".8" },
  ];

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Gold Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Images Grid */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg border border-border">
                  <Image src="/images/pg_room_1780949052458.png" alt="PG Room" fill className="object-cover" />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg border border-border">
                  <Image src="/images/laundry_area_1780949107483.png" alt="Laundry Area" fill className="object-cover" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg border border-border">
                  <Image src="/images/dining_area_1780949084024.png" alt="Dining Area" fill className="object-cover" />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg border border-border">
                  <Image src="/images/study_room_1780949065473.png" alt="Study Area" fill className="object-cover" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div>
              <span className="text-secondary font-semibold tracking-wider uppercase text-sm">About Us</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mt-2 mb-6">
                Welcome To <span className="text-primary">Royal Marwar</span> Boys PG
              </h2>
              <div className="w-20 h-1 bg-secondary rounded-full mb-6" />
              <p className="text-lg text-muted-foreground leading-relaxed">
                Royal Marwar Boys PG provides comfortable, secure, and affordable accommodation for students and working professionals. Experience the perfect blend of traditional hospitality and modern amenities.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                We focus on cleanliness, healthy homemade food, top-tier security, and fostering a peaceful family-like environment conducive to both study and relaxation.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border/50">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="text-4xl font-serif font-bold text-primary">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </h3>
                  <p className="text-sm font-medium text-foreground uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
