import { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { ScrollAnimator } from "@/components/animations";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { JsonLd } from "@/components/seo";

export const metadata: Metadata = {
  title: "Houzez Consulting",
  description:
    "Work directly with the founder of Houzez. Get expert guidance, strategy sessions, and implementation support for your real estate website.",
};

const packages = [
  {
    name: "Site Audit",
    duration: "3-5 days",
    price: "$500",
    features: [
      "Performance analysis",
      "Plugin conflict review",
      "SEO health check",
      "Theme configuration audit",
      "Security assessment",
      "Recommendations report",
    ],
    cta: "Apply for Audit",
    ctaLink: "/houzez-apply?service=audit",
  },
  {
    name: "Founder Kickstart",
    duration: "1-2 weeks",
    price: "$1,000",
    features: [
      "Requirements + sitemap",
      "Theme setup strategy",
      "Performance-first plugin stack",
      "Search filter planning",
      "SEO foundation",
      "Implementation roadmap",
    ],
    cta: "Apply for Kickstart",
    ctaLink: "/houzez-apply?service=kickstart",
  },
  {
    name: "Built with the Founder",
    duration: "4-8 weeks",
    price: "$3,500",
    features: [
      "Full Houzez setup + branding",
      "Custom features & integrations",
      "Listings + search + map config",
      "Performance optimization",
      "GA4/GTM + SEO setup",
      "Training + handover",
    ],
    featured: true,
    cta: "Apply for Implementation",
    ctaLink: "/houzez-apply?service=build",
  },
  {
    name: "Founder Advisory",
    duration: "Monthly Retainer",
    price: "$499",
    priceLabel: "/month",
    features: [
      "2-4 calls per month",
      "Async reviews (Loom/video)",
      "Architecture review",
      "Quarterly roadmap",
      "Priority support",
      "Strategic guidance",
    ],
    cta: "Apply for Advisory",
    ctaLink: "/houzez-apply?service=advisory",
  },
];

const faqs = [
  {
    question: "Do you personally work on the project?",
    answer:
      "Yes - strategy, key decisions, reviews, and final sign-off are all done by me personally. Execution is handled with my team where applicable, but I'm involved in every project at a strategic level.",
  },
  {
    question: "Do you work globally?",
    answer:
      "Yes, I work with clients across UAE, KSA, US, EU, and beyond. All delivery is remote, and I accommodate different time zones for calls and communication.",
  },
  {
    question: "Can you do custom features?",
    answer:
      "Yes, after a Kickstart or Audit engagement to properly define the scope. Custom development is available for unique requirements that go beyond Houzez's built-in capabilities.",
  },
  {
    question: "What's the best starting point?",
    answer:
      "If your site already exists: start with an Audit. If you're building something new: start with Kickstart. Not sure? Apply and I'll recommend the best path forward.",
  },
  {
    question: "How long until we can start?",
    answer:
      "Due to limited capacity, there's typically a 2-4 week waitlist. Apply early to secure your spot. Advisory retainer clients get priority scheduling.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function HouzezPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-[#c4b5fd]/20 overflow-hidden">
          {/* Decorative blur elements */}
          <div className="hero-blob absolute w-96 h-96 bg-[#c4b5fd]/30 rounded-full -top-48 -left-48 blur-3xl" />
          <div className="hero-blob absolute w-80 h-80 bg-[#c4b5fd]/30 rounded-full -bottom-40 -right-40 blur-3xl" style={{ animationDelay: '2s' }} />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-left max-w-3xl">
              <span className="hero-animate hero-animate-1 inline-block text-sm font-semibold text-[#5b21b6] bg-[#c4b5fd]/30 px-4 py-1.5 rounded-full mb-6">
                Limited Monthly Capacity
              </span>
              <h1 className="hero-animate hero-animate-2 text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Work with the Houzez Founder
              </h1>
              <p className="hero-animate hero-animate-3 text-lg text-slate-600 leading-relaxed mb-8">
                Get direct access to the creator of Houzez - the world&apos;s #1
                real estate WordPress theme. Build your real estate website the
                right way, from day one.
              </p>
              <div className="hero-animate hero-animate-4 flex flex-col sm:flex-row gap-4">
                <Link href="/houzez-apply" className="btn-neo btn-neo-primary">
                  Apply to Work Together
                </Link>
              </div>
              <p className="hero-animate hero-animate-5 text-sm text-slate-500 mt-4">
                Limited capacity: 2 build projects/month and 5 advisory clients.
              </p>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section id="services" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                How I Can Help
              </h2>
              <p className="text-lg text-slate-600">
                Choose the engagement that fits your needs. From strategy to
                full implementation, I offer services designed to get your real
                estate website built right.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Site Audit */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:-translate-y-2 hover:shadow-xl transition-all">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">
                  {packages[0].name}
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  {packages[0].duration}
                </p>
                <p className="text-xs text-slate-500 mb-1">Starting from</p>
                <p className="text-xl font-bold text-slate-900 mb-6">
                  {packages[0].price}
                </p>
                <ul className="space-y-3 mb-8 text-slate-600 text-sm">
                  {packages[0].features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-[#5b21b6] flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={packages[0].ctaLink}
                  className="btn-neo btn-neo-secondary w-full text-center"
                >
                  {packages[0].cta}
                </Link>
              </div>

              {/* Founder Kickstart */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:-translate-y-2 hover:shadow-xl transition-all">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">
                  {packages[1].name}
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  {packages[1].duration}
                </p>
                <p className="text-xs text-slate-500 mb-1">Starting from</p>
                <p className="text-xl font-bold text-slate-900 mb-6">
                  {packages[1].price}
                </p>
                <ul className="space-y-3 mb-8 text-slate-600 text-sm">
                  {packages[1].features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-[#5b21b6] flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={packages[1].ctaLink}
                  className="btn-neo btn-neo-secondary w-full text-center"
                >
                  {packages[1].cta}
                </Link>
              </div>

              {/* Built with the Founder - Featured */}
              <div className="bg-[#5b21b6] rounded-2xl p-6 shadow-xl text-white relative overflow-hidden hover:-translate-y-2 transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <div className="text-4xl mb-4">⚙️</div>
                  <h3 className="text-2xl font-bold mb-1">{packages[2].name}</h3>
                  <p className="text-sm text-[#c4b5fd] mb-4">
                    {packages[2].duration}
                  </p>
                  <p className="text-xs text-white/70 mb-1">Starting from</p>
                  <p className="text-xl font-bold mb-6">{packages[2].price}</p>
                  <ul className="space-y-3 mb-8 text-[#c4b5fd] text-sm">
                    {packages[2].features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-white flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={packages[2].ctaLink}
                    className="block w-full text-center px-6 py-3 bg-white text-[#5b21b6] font-semibold rounded-full hover:bg-violet-50 transition-all"
                  >
                    {packages[2].cta}
                  </Link>
                </div>
              </div>

              {/* Founder Advisory */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:-translate-y-2 hover:shadow-xl transition-all">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">
                  {packages[3].name}
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  {packages[3].duration}
                </p>
                <p className="text-xl font-bold text-slate-900 mb-6">
                  {packages[3].price}
                  <span className="text-base font-normal text-slate-500">
                    {packages[3].priceLabel}
                  </span>
                </p>
                <ul className="space-y-3 mb-8 text-slate-600 text-sm">
                  {packages[3].features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-[#5b21b6] flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={packages[3].ctaLink}
                  className="btn-neo btn-neo-secondary w-full text-center"
                >
                  {packages[3].cta}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                How It Works
              </h2>
              <p className="text-lg text-slate-600">
                A simple, transparent process designed to ensure we&apos;re a
                good fit and deliver exactly what you need.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#5b21b6] text-white text-2xl font-bold rounded-2xl flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Apply</h4>
                <p className="text-slate-600">
                  Share your scope, budget, and timeline through our application
                  form.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#5b21b6] text-white text-2xl font-bold rounded-2xl flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  Founder Call
                </h4>
                <p className="text-slate-600">
                  If qualified, schedule a 30-minute call to discuss your
                  project.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#5b21b6] text-white text-2xl font-bold rounded-2xl flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  Proposal
                </h4>
                <p className="text-slate-600">
                  Receive a detailed proposal with fixed scope and milestones.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#5b21b6] text-white text-2xl font-bold rounded-2xl flex items-center justify-center mx-auto mb-4">
                  4
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  Delivery
                </h4>
                <p className="text-slate-600">
                  Work begins with weekly updates and review checkpoints.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                Who This Is For
              </h2>
              <p className="text-lg text-slate-600">
                I work with serious businesses that want to do things right the
                first time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-50 rounded-2xl p-8 hover:-translate-y-2 transition-all">
                <h4 className="text-xl font-bold text-slate-900 mb-4">
                  Agencies & Brokerages
                </h4>
                <p className="text-slate-600">
                  That want a correct, scalable Houzez setup built by someone
                  who knows every detail of the theme.
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-8 hover:-translate-y-2 transition-all">
                <h4 className="text-xl font-bold text-slate-900 mb-4">
                  Frustrated Businesses
                </h4>
                <p className="text-slate-600">
                  Tired of slow websites, plugin conflicts, and developers who
                  don&apos;t understand real estate.
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-8 hover:-translate-y-2 transition-all">
                <h4 className="text-xl font-bold text-slate-900 mb-4">
                  Growing Teams
                </h4>
                <p className="text-slate-600">
                  That want founder-level architecture review before investing
                  further in their platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-slate-50">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                Frequently Asked Questions
              </h2>
            </div>
            <FAQAccordion items={faqs} />
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-[#5b21b6] text-white text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Build Your Real Estate Website Right?
            </h2>
            <p className="text-xl text-[#c4b5fd] mb-10">
              Apply now to work directly with the Houzez founder. Limited spots
              available each month.
            </p>
            <Link
              href="/houzez-apply"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#5b21b6] font-semibold rounded-full hover:bg-slate-100 transition-all shadow-lg"
            >
              Apply to Work With Waqas
            </Link>
            <p className="text-[#c4b5fd] mt-6 text-sm">
              Limited capacity: 2 build projects/month and 5 advisory clients.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
