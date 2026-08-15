import Hero from "@/components/layout/Hero";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutSection from "@/components/sections/About";
import ServicesSection from "@/components/sections/Services";

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


      <Footer />
    </main>
  );
}
