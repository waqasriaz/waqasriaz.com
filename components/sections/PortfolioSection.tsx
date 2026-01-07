import Image from "next/image";
import { ScrollAnimator } from "@/components/animations";

const portfolioItems = [
  {
    title: "Houzez",
    description:
      "The #1 real estate WordPress theme, powering 54,000+ websites globally. Complete property management, advanced search, and CRM features.",
    category: "WordPress Theme",
    image: "/images/houzez.png",
    link: "https://houzez.co",
    linkText: "Visit houzez.co",
  },
  {
    title: "Homey",
    description:
      "Premium vacation rental theme for Airbnb-style websites. Booking system, availability calendar, and multi-vendor marketplace features.",
    category: "WordPress Theme",
    image: "/images/homey.jpeg",
    link: "https://gethomey.io",
    linkText: "Visit gethomey.io",
  },
  {
    title: "Houzez Mobile App",
    description:
      "Native mobile app for Houzez users. Property search, agent communication, and lead management on the go.",
    category: "Mobile App",
    image: "/images/houzez-app.svg",
    link: "https://apps.apple.com/us/app/houzez/id6741146373",
    linkText: "Download on App Store",
    isApp: true,
  },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Work
          </h2>
          <p className="text-lg text-slate-600">
            Products I&apos;ve built that are used by thousands of businesses
            worldwide.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <ScrollAnimator key={item.title} delay={index * 100}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-card group rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 block h-full"
              >
                <div
                  className={`aspect-video overflow-hidden relative ${
                    item.isApp
                      ? "bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center"
                      : "bg-gradient-to-br from-slate-100 to-slate-50"
                  }`}
                >
                  {item.isApp ? (
                    <>
                      <div className="absolute w-32 h-32 bg-violet-500/20 rounded-full -top-8 -right-8 blur-2xl" />
                      <div className="absolute w-24 h-24 bg-indigo-500/20 rounded-full -bottom-6 -left-6 blur-2xl" />
                      <div className="flex items-center justify-center gap-4 relative z-10">
                        <div className="w-16 h-28 bg-slate-700 rounded-xl border-2 border-slate-600 flex flex-col p-1.5 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                          <div className="flex-1 bg-gradient-to-b from-violet-500 to-indigo-600 rounded-lg" />
                        </div>
                        <div className="w-20 h-36 bg-slate-700 rounded-xl border-2 border-slate-600 flex flex-col p-2 z-10 group-hover:scale-110 transition-transform duration-500">
                          <div className="flex-1 bg-gradient-to-b from-violet-500 to-indigo-600 rounded-lg" />
                        </div>
                        <div className="w-16 h-28 bg-slate-700 rounded-xl border-2 border-slate-600 flex flex-col p-1.5 transform rotate-6 group-hover:rotate-0 transition-transform duration-500">
                          <div className="flex-1 bg-gradient-to-b from-violet-500 to-indigo-600 rounded-lg" />
                        </div>
                      </div>
                      <span className="absolute bottom-3 text-white/50 text-xs font-medium">iOS & Android</span>
                    </>
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6">
                  <span className="inline-block text-xs font-semibold text-[#5b21b6] bg-[#c4b5fd]/20 px-3 py-1 rounded-full uppercase tracking-wide mb-3">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-[#5b21b6] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <span className="text-sm font-semibold text-[#5b21b6] group-hover:gap-3 inline-flex items-center gap-2 transition-all">
                    {item.linkText} →
                  </span>
                </div>
              </a>
            </ScrollAnimator>
          ))}
        </div>
      </div>
    </section>
  );
}
