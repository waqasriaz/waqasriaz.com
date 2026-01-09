import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact - Waqas Riaz | Software Developer",
  description:
    "Get in touch with Waqas Riaz. Let's discuss your project and how I can help bring your ideas to life.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-[#c4b5fd]/10 overflow-hidden">
          <div className="hero-blob absolute w-96 h-96 bg-[#c4b5fd]/20 rounded-full -top-48 -right-48 blur-3xl" />
          <div className="hero-blob absolute w-80 h-80 bg-[#c4b5fd]/20 rounded-full -bottom-40 -left-40 blur-3xl" style={{ animationDelay: '2s' }} />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <span className="hero-animate hero-animate-1 inline-block text-sm font-semibold text-[#5b21b6] bg-[#c4b5fd]/30 px-4 py-1.5 rounded-full mb-6">
              Contact
            </span>
            <h1 className="hero-animate hero-animate-2 text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Get in Touch
            </h1>
            <p className="hero-animate hero-animate-3 text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Have a project in mind? I&apos;d love to hear about it. Let&apos;s
              discuss how I can help bring your ideas to life.
            </p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-white">
          <div className="max-w-2xl mx-auto px-6">
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
