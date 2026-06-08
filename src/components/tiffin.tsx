"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";

const plans = [
  {
    name: "Plan 1",
    price: "80",
    description: "Basic Daily Meal",
    items: ["Dal", "Roti", "Rice", "Salad"],
    premium: false,
  },
  {
    name: "Plan 2",
    price: "100",
    description: "Standard Thali",
    items: ["2 Sabji", "Dal", "Roti", "Salad", "Chaas"],
    premium: false,
  },
  {
    name: "Plan 3",
    price: "120",
    description: "Deluxe Thali",
    items: ["2 Premium Sabji", "Dal", "Rice", "Roti", "Salad", "Chaas", "Sweet Dish"],
    premium: true,
  },
  {
    name: "Plan 4 (Special)",
    price: "150",
    description: "Royal Feast",
    items: ["Paneer Sabji", "Dal Fry", "Jeera Rice", "Butter Roti", "Salad", "Chaas", "Sweet"],
    premium: true,
  },
];

export function Tiffin() {
  return (
    <section id="tiffin" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative bg elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 rounded-l-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-secondary/20">
              <Image 
                src="/images/tiffin_food_1780949095723.png" 
                alt="Premium Indian Thali" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                  ))}
                </div>
                <h3 className="text-white text-2xl font-bold font-serif">100% Pure Veg</h3>
                <p className="text-white/80">Hygienic & Homemade Taste</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <span className="text-secondary font-semibold tracking-wider uppercase text-sm">Food Service</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mt-2 mb-6">
              Royal Marwar <span className="text-primary">Tiffin Service</span>
            </h2>
            <div className="w-20 h-1 bg-secondary rounded-full mb-6" />
            <h3 className="text-2xl font-medium text-foreground">Healthy Homemade Food Delivered Daily</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We understand the importance of good food away from home. Our dedicated tiffin service provides nutritious, hygienic, and incredibly tasty meals that will remind you of home-cooked food.
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`h-full flex flex-col relative transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                plan.premium ? "border-secondary/50 shadow-lg bg-gradient-to-b from-card to-secondary/5" : "border-border"
              }`}>
                {plan.premium && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex justify-center items-baseline">
                    <span className="text-4xl font-bold text-primary">₹{plan.price}</span>
                    <span className="text-muted-foreground ml-1">/ Meal</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="w-4 h-4 text-secondary mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm font-medium text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.premium ? "default" : "outline"}
                    asChild
                  >
                    <Link href="#contact">Subscribe</Link>
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
