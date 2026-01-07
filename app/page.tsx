import { Header, Footer } from "@/components/layout";
import {
  HeroSection,
  ServicesOverview,
  PortfolioSection,
  HouzezConsultingCTA,
  CTASection,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesOverview />
        <PortfolioSection />
        <HouzezConsultingCTA />
        <CTASection
          title="Let's Build Something Great"
          description="Have a project in mind? I'd love to hear about it and help bring your vision to life."
          primaryCTA={{ href: "/contact", label: "Get in Touch" }}
          secondaryCTA={{ href: "/services", label: "View Services" }}
        />
      </main>
      <Footer />
    </>
  );
}
