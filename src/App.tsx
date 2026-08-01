import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VideoSection } from './components/VideoSection';
import { Features } from './components/Features';
import { StepProcess } from './components/StepProcess';
import { PricingPagarme } from './components/PricingPagarme';
import { Testimonial } from './components/Testimonial';
import { FAQSection } from './components/FAQSection';
import { BottomCTA } from './components/BottomCTA';
import { Footer } from './components/Footer';

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Hero />
        <VideoSection />
        <Features />
        <StepProcess />
        <PricingPagarme />
        <Testimonial />
        <FAQSection />
        <BottomCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
