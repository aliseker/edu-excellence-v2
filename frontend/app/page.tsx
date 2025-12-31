import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FilterSection from '@/components/FilterSection';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import StatsSection from '@/components/StatsSection';
import ProgramsSection from '@/components/ProgramsSection';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      
      <FilterSection />

      <StatsSection />
      <ProgramsSection />
      <Features />
      <Testimonials />

      <Footer />
      <WhatsAppWidget />
      <ScrollToTop />
    </div>
  );
}
