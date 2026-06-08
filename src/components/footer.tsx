"use client";

import Link from "next/link";
import { MessageSquare, Camera, Globe, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-serif font-bold tracking-wider text-secondary">
                ROYAL MARWAR
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium accommodation for students and professionals. Experience luxury, security, and a home-like environment in the heart of Rajasthan.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                <Camera className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Facilities', 'Rooms', 'Tiffin Service', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-secondary transition-colors inline-block">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6 text-white">Our Services</h4>
            <ul className="space-y-4 text-gray-400">
              <li>AC / Non AC Rooms</li>
              <li>Premium Tiffin Service</li>
              <li>Laundry Facility</li>
              <li>High Speed WiFi</li>
              <li>Daily Cleaning</li>
              <li>24x7 Security</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6 text-white">Contact Details</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-secondary flex-shrink-0 mt-0.5" />
                <span>Royal Marwar Boys PG,<br />Rajasthan, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-secondary flex-shrink-0" />
                <span>8107842564 / 9772783814</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-secondary flex-shrink-0" />
                <span>info@royalmarwar.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Royal Marwar Boys PG. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
