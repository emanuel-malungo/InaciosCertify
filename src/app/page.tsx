import Hero from "@/components/layout/Hero";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutSection from "@/components/sections/About";
import ServicesSection from "@/components/sections/Services";
import SpeakersSection from "@/components/sections/Speakers";
import LocationSection from "@/components/sections/Location";
import FAQSection from "@/components/sections/FAQ";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import CertificateModal from "@/components/ui/CertificateModal";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-text selection:bg-primary selection:text-white relative">
      {/* Header Fixo de Navegação */}
      <Header />

      {/* Seção 1: Hero Principal (Home) */}
      <Hero />

      {/* Seção 2: Sobre Nós (#sobre) */}
      <AboutSection />

      {/* Seção 3: Razões para Investir (#servicos) */}
      <ServicesSection />

      {/* Seção 4: Programação Final de Oradores (#oradores) */}
      <SpeakersSection />

      {/* Seção 5: Perguntas Frequentes (#faq) */}
      <FAQSection />

      {/* Seção 6: Localização do Evento - Hotel Diamante (#localizacao) */}
      <LocationSection />

      {/* Rodapé da Página */}
      <Footer />

      {/* Botão Flutuante de Navegação (Topo / Fim) */}
      <FloatingActionButton />

      {/* Modal de Emissão e Credenciamento de Certificado */}
      <CertificateModal />
    </main>
  );
}
