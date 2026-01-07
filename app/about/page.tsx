import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { CTASection } from "@/components/sections";

export const metadata: Metadata = {
  title: "About - Waqas Riaz | Software Developer",
  description:
    "About Waqas Riaz - Software Developer and Product Builder. Creator of Houzez and Homey, with 10+ years of experience building digital products.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-[#c4b5fd]/20 overflow-hidden">
          {/* Decorative blur elements */}
          <div className="hero-blob absolute w-96 h-96 bg-[#c4b5fd]/30 rounded-full -top-48 -left-48 blur-3xl" />
          <div className="hero-blob absolute w-80 h-80 bg-[#c4b5fd]/30 rounded-full -bottom-40 -right-40 blur-3xl" style={{ animationDelay: '2s' }} />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-24 items-center">
              {/* Photo */}
              <div className="hero-animate hero-animate-1 flex justify-center lg:justify-start">
                <Image
                  src="/images/profile-1.jpeg"
                  alt="Waqas Riaz - Software Developer"
                  width={400}
                  height={400}
                  className="w-full max-w-[400px] h-auto rounded-2xl border-4 border-white shadow-2xl shadow-slate-900/10"
                  priority
                />
              </div>
              {/* Text */}
              <div className="text-center lg:text-left">
                <h1 className="hero-animate hero-animate-2 text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                  Waqas Riaz
                </h1>
                <p className="hero-animate hero-animate-3 text-xl font-semibold text-[#5b21b6] mb-4">
                  Software Developer & Product Builder
                </p>
                <p className="hero-animate hero-animate-4 text-lg text-slate-600 leading-relaxed mb-8">
                  Building digital products that help businesses grow. Creator
                  of Houzez and Homey, powering 60,000+ websites worldwide.
                </p>
                <div className="hero-animate hero-animate-5 flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                  <Link href="/contact" className="btn-neo btn-neo-primary">
                    Work With Me
                  </Link>
                  <a href="#products" className="btn-neo btn-neo-secondary">
                    View Products
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* My Story Section */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900">
              My Story
            </h2>
            <p className="text-xl text-slate-700 leading-relaxed mb-6">
              I&apos;ve been building software for over a decade, driven by a
              passion for creating products that solve real problems.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              My journey started with freelance web development, where I worked
              with clients across various industries. Over time, I noticed a gap
              in the market for specialized WordPress solutions - particularly
              in the real estate sector.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              In 2015, I created Houzez - a WordPress theme designed
              specifically for real estate professionals. What started as a
              solution to a common problem quickly became an industry standard,
              now powering over 54,000 websites across 50+ countries. I followed
              this with Homey, a premium theme for vacation rentals.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Today, I continue to build products and offer development services
              to businesses that want to create something exceptional. Whether
              it&apos;s a custom web application, mobile app, or WordPress
              solution, I bring the same attention to detail and commitment to
              quality that made Houzez successful.
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                Products I&apos;ve Built
              </h2>
              <p className="text-lg text-slate-600">
                Software products used by thousands of businesses worldwide.
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Houzez */}
              <div className="group bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 bg-[#c4b5fd]/30 rounded-xl flex items-center justify-center mb-6 text-[#5b21b6] group-hover:bg-[#5b21b6] group-hover:text-white transition-colors">
                  <svg
                    className="w-7 h-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">
                  Houzez
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  The #1 real estate WordPress theme with 54,000+ sales.
                  Complete property management, advanced search, and CRM
                  features.
                </p>
                <a
                  href="https://houzez.co"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center text-[#5b21b6] font-semibold hover:text-[#5b21b6]/80 transition-colors"
                >
                  Visit Houzez
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>

              {/* Homey */}
              <div className="group bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 bg-[#c4b5fd]/30 rounded-xl flex items-center justify-center mb-6 text-[#5b21b6] group-hover:bg-[#5b21b6] group-hover:text-white transition-colors">
                  <svg
                    className="w-7 h-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Homey</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Premium vacation rental theme for Airbnb-style websites.
                  Booking system, availability calendar, and marketplace
                  features.
                </p>
                <a
                  href="https://gethomey.io"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center text-[#5b21b6] font-semibold hover:text-[#5b21b6]/80 transition-colors"
                >
                  Visit Homey
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>

              {/* Houzez Mobile App */}
              <div className="group bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 bg-[#c4b5fd]/30 rounded-xl flex items-center justify-center mb-6 text-[#5b21b6] group-hover:bg-[#5b21b6] group-hover:text-white transition-colors">
                  <svg
                    className="w-7 h-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">
                  Houzez Mobile App
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Native mobile app companion for Houzez. Property search, agent
                  dashboard, and push notifications for iOS and Android.
                </p>
                <a
                  href="https://apps.apple.com/us/app/houzez/id6741146373"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center text-[#5b21b6] font-semibold hover:text-[#5b21b6]/80 transition-colors"
                >
                  Learn More
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Skills & Expertise Section */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                Skills & Expertise
              </h2>
              <p className="text-lg text-slate-600">
                Technologies and areas I specialize in.
              </p>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Development */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-[#c4b5fd]/30 rounded-xl flex items-center justify-center mb-5 text-[#5b21b6]">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">
                  Development
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  PHP, JavaScript, React, Node.js, WordPress, MySQL, REST APIs,
                  Git, and modern development practices.
                </p>
              </div>

              {/* Mobile */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-[#c4b5fd]/30 rounded-xl flex items-center justify-center mb-5 text-[#5b21b6]">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">
                  Mobile
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  iOS and Android development, React Native, Flutter, app store
                  deployment and optimization.
                </p>
              </div>

              {/* WordPress */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-[#c4b5fd]/30 rounded-xl flex items-center justify-center mb-5 text-[#5b21b6]">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 19l7-7 3 3-7 7-3-3z" />
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                    <path d="M2 2l7.586 7.586" />
                    <circle cx="11" cy="11" r="2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">
                  WordPress
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Custom theme and plugin development, performance optimization,
                  security, and complex integrations.
                </p>
              </div>

              {/* Product */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-[#c4b5fd]/30 rounded-xl flex items-center justify-center mb-5 text-[#5b21b6]">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">
                  Product
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Product strategy, UX design, market research, and building
                  software that scales to thousands of users.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#5b21b6] mb-2">
                  60K+
                </div>
                <div className="text-slate-600 font-medium">
                  Websites Powered
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#5b21b6] mb-2">
                  10+
                </div>
                <div className="text-slate-600 font-medium">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#5b21b6] mb-2">
                  50+
                </div>
                <div className="text-slate-600 font-medium">
                  Countries Served
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#5b21b6] mb-2">
                  4.8
                </div>
                <div className="text-slate-600 font-medium">Average Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* How I Work Section */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-900">
              How I Work
            </h2>

            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">
                  Quality Over Quantity
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  I focus on building things right rather than fast. Every
                  project gets the attention it deserves.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">
                  Clear Communication
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Regular updates, honest timelines, and transparent pricing. No
                  surprises.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">
                  Long-term Thinking
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  I build software that scales and is maintainable over time,
                  not just quick fixes.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">
                  Results-Focused
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  The goal is always to help your business succeed, not just
                  deliver code.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CTASection
          badge="Ready to start?"
          title="Let's Work Together"
          description="Have a project in mind? I'd love to hear about it."
          primaryCTA={{ href: "/contact", label: "Get in Touch" }}
        />
      </main>
      <Footer />
    </>
  );
}
