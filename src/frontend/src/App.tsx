import { Suspense } from "react";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import PortfolioSection from "./components/PortfolioSection";
import ScrollProgress from "./components/ScrollProgress";
import ServicesSection from "./components/ServicesSection";
import TechSection from "./components/TechSection";
import WhyChooseSection from "./components/WhyChooseSection";

function SectionLoader() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: "#03040a" }}>
      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Fixed Navbar */}
      <Navbar />

      {/* Main content */}
      <main>
        {/* Hero — loaded eagerly for fast initial view */}
        <HeroSection />

        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ServicesSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <TechSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <PortfolioSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <WhyChooseSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
