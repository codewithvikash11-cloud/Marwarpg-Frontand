"use client";

import { motion } from "framer-motion";
import { Droplets, Wifi, WashingMachine, Sparkles, ShieldCheck, Utensils, Zap, BookOpen, Bike } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";

const facilities = [
  {
    icon: Droplets,
    title: "RO Water",
    description: "Pure & Safe Drinking Water",
  },
  {
    icon: Wifi,
    title: "High-Speed WiFi",
    description: "Unlimited Internet Access",
  },
  {
    icon: WashingMachine,
    title: "Laundry Service",
    description: "Fully Automatic Washing Machines",
  },
  {
    icon: Sparkles,
    title: "Daily Cleaning",
    description: "Clean and Hygienic Rooms",
  },
  {
    icon: ShieldCheck,
    title: "24x7 CCTV Security",
    description: "Safe Environment",
  },
  {
    icon: Utensils,
    title: "Food Facility",
    description: "Healthy Homemade Meals",
  },
  {
    icon: Zap,
    title: "Power Backup",
    description: "24 Hours Electricity",
  },
  {
    icon: BookOpen,
    title: "Study Environment",
    description: "Peaceful Study Zone",
  },
  {
    icon: Bike,
    title: "Parking Facility",
    description: "Bike Parking Available",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Facilities() {
  return (
    <section id="facilities" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-semibold tracking-wider uppercase text-sm">Amenities</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mt-2 mb-6">
            Premium <span className="text-primary">Facilities</span>
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground">
            We provide everything you need for a comfortable and productive stay, ensuring you never miss home.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {facilities.map((facility, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full border-border/50 hover:border-secondary/50 group bg-card/50 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative z-10 pb-2">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <facility.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">{facility.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-base">{facility.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
