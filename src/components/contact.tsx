"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Mail, Send, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import api from "@/config/api";

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    interestedRoomType: "Non AC Room",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/inquiries/submit', {
        ...formData,
        sourcePage: window.location.pathname
      });
      if (data.success) {
        setSuccess(true);
        setFormData({ fullName: "", mobileNumber: "", email: "", interestedRoomType: "Non AC Room", message: "" });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      alert("Failed to submit inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background relative border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-semibold tracking-wider uppercase text-sm">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mt-2 mb-6">
            Contact <span className="text-primary">Us</span>
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full mb-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-muted/30 p-8 rounded-2xl border border-border/50">
              <h3 className="text-2xl font-serif font-bold mb-6 text-foreground">Reach Out Directly</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Call Us (Ishwar / Ak)</p>
                    <a href="tel:8107842564" className="block text-xl font-medium text-foreground hover:text-primary transition-colors">
                      +91 8107842564
                    </a>
                    <a href="tel:9772783814" className="block text-xl font-medium text-foreground hover:text-primary transition-colors mt-1">
                      +91 9772783814
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Location</p>
                    <p className="text-lg font-medium text-foreground">
                      Royal Marwar Boys PG<br />
                      Rajasthan, India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                    <a href="mailto:info@royalmarwar.com" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                      info@royalmarwar.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form className="bg-card p-8 rounded-2xl shadow-lg border border-border/50" onSubmit={handleSubmit}>
              <h3 className="text-2xl font-serif font-bold mb-6 text-foreground">Inquiry Form</h3>
              
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Inquiry submitted successfully! We will contact you soon.
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Full Name *</label>
                  <input required type="text" id="name" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" placeholder="Your Name" />
                </div>
                
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-muted-foreground mb-1">Mobile Number *</label>
                  <input required type="tel" id="mobile" value={formData.mobileNumber} onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" placeholder="Your Mobile Number" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email Address *</label>
                  <input required type="email" id="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" placeholder="Your Email Address" />
                </div>
                
                <div>
                  <label htmlFor="room" className="block text-sm font-medium text-muted-foreground mb-1">Room Type Interested</label>
                  <select id="room" value={formData.interestedRoomType} onChange={(e) => setFormData({...formData, interestedRoomType: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow">
                    <option value="Non AC Room">Non AC Room (₹5499)</option>
                    <option value="AC Room">AC Room (₹5999)</option>
                    <option value="Tiffin Only">Tiffin Service Only</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">Message</label>
                  <textarea id="message" rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none" placeholder="Any specific requirements..."></textarea>
                </div>
                
                <Button className="w-full h-12 text-lg font-bold" type="submit" disabled={loading}>
                  <Send className="w-5 h-5 mr-2" />
                  {loading ? "Sending..." : "Send Inquiry"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
