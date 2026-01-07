import { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { CTASection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Services - Waqas Riaz | Software Developer",
  description:
    "Services by Waqas Riaz - Web development, mobile apps, WordPress themes, and consulting. Expert solutions for your digital projects.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center pt-32 pb-16 bg-[#c4b5fd]/20 overflow-hidden">
          {/* Decorative blur elements */}
          <div className="absolute w-96 h-96 bg-[#c4b5fd]/30 rounded-full -top-48 -left-48 blur-3xl" />
          <div className="absolute w-80 h-80 bg-[#c4b5fd]/30 rounded-full -bottom-40 -right-40 blur-3xl" />
          <div className="absolute w-64 h-64 bg-[#c4b5fd]/30 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl" />

          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <span className="inline-block text-sm font-semibold text-[#5b21b6] bg-white/80 backdrop-blur px-4 py-1.5 rounded-full mb-6 shadow-sm">
              What I Offer
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Services
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              From custom web applications to mobile apps and WordPress
              solutions, I offer comprehensive development services to bring
              your ideas to life.
            </p>
          </div>
        </section>

        {/* Web Development */}
        <section id="web-development" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <span className="inline-block text-sm font-semibold text-[#5b21b6] bg-[#c4b5fd]/30 px-4 py-1.5 rounded-full mb-6">
                  Web Development
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
                  Custom Websites & Web Apps
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  High-performance websites and web applications built with
                  modern technologies and best practices.
                </p>
                <Link href="/contact?service=web-development" className="btn-neo btn-neo-primary">
                  Discuss Your Project
                </Link>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all">
                <h4 className="text-xl font-bold mb-6 text-slate-900">
                  What I Offer
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#5b21b6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">Custom Websites</strong>{" "}
                      - Tailored designs that reflect your brand
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#5b21b6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">Web Applications</strong>{" "}
                      - Full-stack development for complex requirements
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#5b21b6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">
                        E-commerce Solutions
                      </strong>{" "}
                      - Online stores and marketplaces
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#5b21b6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">API Development</strong>{" "}
                      - RESTful APIs and integrations
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#5b21b6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">
                        Performance Optimization
                      </strong>{" "}
                      - Fast, scalable solutions
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#5b21b6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">
                        Maintenance & Support
                      </strong>{" "}
                      - Ongoing technical support
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile App Development */}
        <section id="mobile-apps" className="py-24 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <span className="inline-block text-sm font-semibold text-[#5b21b6] bg-[#c4b5fd]/30 px-4 py-1.5 rounded-full mb-6">
                  Mobile Development
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
                  iOS & Android Apps
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  Native and cross-platform mobile applications that deliver
                  exceptional user experiences.
                </p>
                <Link href="/contact?service=mobile-apps" className="btn-neo btn-neo-primary">
                  Discuss Your Project
                </Link>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all">
                <h4 className="text-xl font-bold mb-6 text-slate-900">
                  What I Offer
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#5b21b6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">iOS Development</strong>{" "}
                      - Native apps for iPhone and iPad
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#5b21b6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">
                        Android Development
                      </strong>{" "}
                      - Native apps for Android devices
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#5b21b6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">Cross-Platform</strong> -
                      React Native and Flutter solutions
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#5b21b6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">
                        App Store Deployment
                      </strong>{" "}
                      - Publishing to App Store and Play Store
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#5b21b6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">
                        Push Notifications
                      </strong>{" "}
                      - Engagement and retention features
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#5b21b6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">App Maintenance</strong>{" "}
                      - Updates and ongoing support
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* WordPress Development */}
        <section id="wordpress" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <span className="inline-block text-sm font-semibold text-[#5b21b6] bg-[#c4b5fd]/30 px-4 py-1.5 rounded-full mb-6">
                  WordPress
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
                  WordPress Development
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  Custom WordPress themes, plugins, and solutions. Creator of
                  Houzez (54K+ sales) and Homey.
                </p>
                <Link href="/contact?service=wordpress" className="btn-neo btn-neo-primary">
                  Discuss Your Project
                </Link>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all">
                <h4 className="text-xl font-bold mb-6 text-slate-900">
                  What I Offer
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#5b21b6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">
                        Custom Theme Development
                      </strong>{" "}
                      - Unique themes from scratch
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#5b21b6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">
                        Theme Customization
                      </strong>{" "}
                      - Modifications to existing themes
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#5b21b6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">
                        Plugin Development
                      </strong>{" "}
                      - Custom functionality and features
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#5b21b6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">
                        Performance Optimization
                      </strong>{" "}
                      - Speed and caching setup
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#5b21b6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">
                        Migration & Updates
                      </strong>{" "}
                      - Safe site transfers and upgrades
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#5b21b6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">
                        Security Hardening
                      </strong>{" "}
                      - Protection against threats
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Houzez Consulting */}
        <section
          id="houzez-consulting"
          className="py-24 bg-[#c4b5fd]/20 relative overflow-hidden"
        >
          <div className="absolute w-72 h-72 bg-[#c4b5fd]/30 rounded-full -top-20 -left-20 blur-3xl" />
          <div className="absolute w-64 h-64 bg-[#c4b5fd]/30 rounded-full -bottom-16 -right-16 blur-3xl" />
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <span className="inline-block text-sm font-semibold text-white bg-[#5b21b6] px-4 py-1.5 rounded-full mb-6">
                  Specialized
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
                  Houzez Consulting
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  As the founder of Houzez, I offer specialized consulting for
                  real estate websites. Get founder-level expertise for your
                  Houzez project.
                </p>
                <Link href="/houzez" className="btn-neo btn-neo-primary">
                  View Houzez Services
                </Link>
              </div>
              <div className="bg-white rounded-2xl shadow-xl border border-[#c4b5fd] p-8 hover:shadow-2xl hover:-translate-y-1 transition-all">
                <h4 className="text-xl font-bold mb-6 text-slate-900">
                  Houzez Services Include
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#c4b5fd]/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-[#5b21b6]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">Founder Kickstart</strong>{" "}
                      - Strategy, planning, and roadmap ($1,000-$3,500)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#c4b5fd]/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-[#5b21b6]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">
                        Built with Founder
                      </strong>{" "}
                      - Full implementation ($5,000-$25,000+)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#c4b5fd]/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-[#5b21b6]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">
                        Advisory Retainer
                      </strong>{" "}
                      - Ongoing support (from $499/month)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#c4b5fd]/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-[#5b21b6]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">
                        Custom Development
                      </strong>{" "}
                      - Unique features and integrations
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#c4b5fd]/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-[#5b21b6]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">
                        Performance Optimization
                      </strong>{" "}
                      - Speed and SEO improvements
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#c4b5fd]/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-[#5b21b6]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">
                        Training & Handover
                      </strong>{" "}
                      - Team education and documentation
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Consulting */}
        <section id="consulting" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <span className="inline-block text-sm font-semibold text-[#5b21b6] bg-[#c4b5fd]/30 px-4 py-1.5 rounded-full mb-6">
                  Consulting
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
                  Technical Consulting
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  Strategic guidance and technical advisory for your digital
                  projects. Benefit from 10+ years of experience building
                  successful products.
                </p>
                <Link href="/contact?service=consulting" className="btn-neo btn-neo-primary">
                  Schedule a Call
                </Link>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all">
                <h4 className="text-xl font-bold mb-6 text-slate-900">
                  What I Offer
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#5b21b6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">
                        Technical Strategy
                      </strong>{" "}
                      - Architecture and technology decisions
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#5b21b6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">Code Review</strong> -
                      Quality assessment and recommendations
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#5b21b6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">Product Advisory</strong>{" "}
                      - Feature planning and roadmapping
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#5b21b6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">Team Mentoring</strong> -
                      Developer training and guidance
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#5b21b6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">Due Diligence</strong> -
                      Technical assessment for acquisitions
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#5b21b6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-slate-900">Ongoing Retainer</strong>{" "}
                      - Regular strategic support
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <CTASection
          title="Ready to Start Your Project?"
          description="Let's discuss how I can help bring your ideas to life."
          primaryCTA={{ href: "/contact", label: "Get in Touch" }}
        />
      </main>
      <Footer />
    </>
  );
}
