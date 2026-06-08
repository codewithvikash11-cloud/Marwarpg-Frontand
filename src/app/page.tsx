import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Facilities } from "@/components/facilities";
import { Rooms } from "@/components/rooms";
import { Gallery } from "@/components/gallery";
import { Tiffin } from "@/components/tiffin";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { FloatingButtons } from "@/components/floating-buttons";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <About />
      <Facilities />
      <Rooms />
      <Tiffin />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
      <FloatingButtons />
    </main>
  );
}
