import React from 'react';
import Navbar from './components/Navbar';
import AboutSection from './components/AboutSection';
import PackagesSection from './components/PackagesSection';
/* import ContactSection from './components/ContactSection'; */
import Footer from './components/Footer';
import Hero from "./components/HeroSection.tsx";

 
export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-20"> {/* Add padding-top to account for fixed navbar */}
          <Hero
            headline="Llevamos tus sueños a cualquier rincón del mundo"
            subhead="Paquetes claros, buen precio y respuesta rápida."
            secondaryHref="#packages"
            whatsappMessage="¡Hola! Quiero info de los paquetes."
            // backgroundImageUrl="/img/hero.jpg" // opcional
            stats={[
              { value: "+300", label: "eventos" },
              { value: "4.9/5", label: "reseñas" },
              { value: "24h", label: "respuesta" },
            ]}
          />
        <AboutSection />
        <PackagesSection />
        {/* <ContactSection /> */}
      </main>
      <Footer />
    </div>
  );
}