"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";

const rooms = [
  {
    type: "Non AC Room",
    price: "5499",
    features: ["WiFi", "RO Water", "Laundry", "Food Facility", "Daily Cleaning", "Study Desk"],
    recommended: false,
  },
  {
    type: "AC Room",
    price: "5999",
    features: ["Air Conditioning", "WiFi", "RO Water", "Laundry", "Food Facility", "Daily Cleaning", "Study Desk"],
    recommended: true,
  },
];

export function Rooms() {
  return (
    <section id="rooms" className="py-24 bg-background relative">
      <div className="absolute top-1/2 left-0 w-full h-[500px] bg-secondary/5 -translate-y-1/2 skew-y-3 blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-semibold tracking-wider uppercase text-sm">Accommodation</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mt-2 mb-6">
            Choose Your <span className="text-primary">Space</span>
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground">
            Affordable and premium living spaces tailored for your comfort.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-white px-6 py-3 rounded-full shadow-lg border border-primary/20"
          >
            <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
            <span className="font-semibold text-lg">Special Offer: First Month ₹499 Discount!</span>
            <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {rooms.map((room, index) => (
            <motion.div
              key={room.type}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className={`relative h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl ${
                room.recommended 
                  ? "border-secondary/50 shadow-[0_0_30px_rgba(212,162,76,0.15)] bg-gradient-to-b from-card to-secondary/5" 
                  : "border-border/50 bg-card/50 backdrop-blur-sm"
              }`}>
                {room.recommended && (
                  <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground text-xs font-bold px-4 py-1 rounded-bl-lg uppercase tracking-wider">
                    Recommended
                  </div>
                )}
                
                <CardHeader className="text-center pb-8 pt-10">
                  <CardTitle className="text-2xl mb-4">{room.type}</CardTitle>
                  <div className="flex justify-center items-baseline">
                    <span className="text-5xl font-bold tracking-tight text-primary">₹{room.price}</span>
                    <span className="text-muted-foreground ml-2 font-medium">/ Month</span>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <ul className="space-y-4">
                    {room.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-muted-foreground">
                        <Check className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                        <span className="font-medium text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="pt-6 pb-8">
                  <Button 
                    className={`w-full h-12 text-lg font-bold rounded-xl ${
                      room.recommended 
                        ? "bg-primary hover:bg-primary/90 text-white shadow-lg" 
                        : "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    }`}
                    asChild
                  >
                    <Link href="#contact">Book {room.type}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
