import Navigation from "./components/ui/Navigation";
import Hero from "./components/hero/Hero";
import ThreePillars from "./components/sections/ThreePillars";
import TrustSection from "./components/sections/TrustSection";
import FeeTransparency from "./components/sections/FeeTransparency";
import StrategyCards from "./components/sections/StrategyCards";
import HowItWorks from "./components/sections/HowItWorks";
import FinalCTA from "./components/sections/FinalCTA";
import Footer from "./components/ui/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <Hero />
        <ThreePillars />
        <TrustSection />
        <FeeTransparency />
        <StrategyCards />
        <HowItWorks />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
