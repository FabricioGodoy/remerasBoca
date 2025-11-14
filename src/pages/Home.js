import React from 'react';
import Hero from "../components/HeroSection.tsx";
import PackagesSection from '../components/PackagesSection';

export default function Home() {
  return (
    <>
      <Hero
        headline="Llevamos tus sueños a cualquier rincón del mundo"
        subhead="Paquetes claros, buen precio y respuesta rápida."
        secondaryHref="#packages"
        whatsappMessage="¡Hola! Quiero info de los paquetes."
        stats={[
          { value: "+300", label: "eventos" },
          { value: "4.9/5", label: "reseñas" },
          { value: "24h", label: "respuesta" },
        ]}
      />
      <PackagesSection />
    </>
  );
}
