"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const testimonials = [
  {
    text: "Best PG in Rajasthan. Food quality is amazing and rooms are very clean. Highly recommended for students.",
    author: "Rahul S.",
    role: "Student",
  },
  {
    text: "Feels like home. WiFi speed and facilities are excellent. The management is very cooperative.",
    author: "Amit K.",
    role: "Working Professional",
  },
  {
    text: "Affordable and secure place for students. The tiffin service is a lifesaver, food is just like home.",
    author: "Vikash M.",
    role: "Student",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-semibold tracking-wider uppercase text-sm">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mt-2 mb-6">
            What Our <span className="text-primary">Residents Say</span>
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full mb-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="h-full border-border/50 bg-card hover:border-secondary/30 transition-colors relative">
                <Quote className="absolute top-6 right-6 w-12 h-12 text-secondary/10" />
                <CardContent className="pt-10 pb-8 px-8 flex flex-col h-full">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-6 flex-grow leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <h4 className="font-bold text-foreground font-serif">{testimonial.author}</h4>
                    <p className="text-sm text-secondary">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
