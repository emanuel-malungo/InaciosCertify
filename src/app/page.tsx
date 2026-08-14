import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import AboutSection from "@/components/sections/About";
import ServicesSection from "@/components/sections/Services";
import CertificateSection from "@/components/sections/CertificateSection";
import PartnersSection from "@/components/sections/Partners";
import LocationSection from "@/components/sections/Location";
import ContactSection from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-text selection:bg-primary selection:text-white">
      {/* Header Fixo de Navegação */}
      <Header />

      {/* Seção 1: Hero Principal (Home) */}
      <Hero />

      {/* Seção 2: Sobre Nós (#sobre) */}
      <AboutSection />

      {/* Seção 3: Os Nossos Serviços (#servicos) */}
      <ServicesSection />

      {/* Seção 4: Emissão & Validação de Certificado (#emitir e #participar) */}
      <CertificateSection />

      {/* Seção 5: Parceiros Estratégicos (#parceiros) */}
      <PartnersSection />

      {/* Seção 6: Localização & Programa (#localizacao) */}
      <LocationSection />

      {/* Seção 7: Contacte-nos (#contacto) */}
      <ContactSection />

      {/* Rodapé Corporativo Premium */}
      <Footer />
    </main>
  );
}
