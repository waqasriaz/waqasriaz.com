import Link from "next/link";
import { ScrollAnimator } from "@/components/animations";

const services = [
  {
    title: "Web Development",
    description:
      "Custom websites and web applications built with modern technologies for optimal performance.",
    icon: (
      <svg
        className="w-7 h-7"
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
    ),
  },
  {
    title: "Mobile Apps",
    description:
      "Native iOS and Android applications with seamless user experiences and intuitive design.",
    icon: (
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
    ),
  },
  {
    title: "WordPress Themes & Plugins",
    description:
      "Premium themes that power thousands of websites globally with flexibility and style.",
    icon: (
      <svg
        className="w-7 h-7"
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
    ),
  },
  {
    title: "Consulting",
    description:
      "Technical strategy and expert advisory to guide your projects to success.",
    icon: (
      <svg
        className="w-7 h-7"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    title: "SaaS Products",
    description:
      "End-to-end software-as-a-service product development from idea to launch.",
    icon: (
      <svg
        className="w-7 h-7"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
  },
  {
    title: "E-commerce Solutions",
    description:
      "Online stores with secure payments, inventory management, and seamless checkout.",
    icon: (
      <svg
        className="w-7 h-7"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
  },
];

export default function ServicesOverview() {
  return (
    <section id="services-overview" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Do</h2>
          <p className="text-lg text-slate-600">
            From concept to launch, I build digital products that help
            businesses grow and scale globally.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ScrollAnimator key={service.title} delay={index * 100}>
              <div className="service-card group p-8 rounded-3xl bg-white/80 backdrop-blur-sm shadow-lg border border-white/50 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden h-full">
                <div className="service-icon w-16 h-16 bg-gradient-to-br from-[#c4b5fd]/40 to-[#5b21b6]/10 rounded-2xl flex items-center justify-center mb-6 text-[#5b21b6] group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-500">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-[#5b21b6] transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </ScrollAnimator>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center px-8 py-4 border-2 border-[#5b21b6] text-[#5b21b6] font-semibold rounded-full hover:bg-[#5b21b6] hover:text-white transition-all"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
