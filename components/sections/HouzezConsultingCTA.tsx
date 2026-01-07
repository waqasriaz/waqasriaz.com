import Link from "next/link";

export default function HouzezConsultingCTA() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-sm font-semibold text-[#5b21b6] bg-[#c4b5fd]/30 px-4 py-1.5 rounded-full mb-6">
              From the Houzez Creator
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
              Need Help With Your Houzez Website?
            </h2>
            <p className="text-slate-600 mb-4 leading-relaxed text-lg">
              As the creator of Houzez, I offer specialized consulting services
              for real estate businesses. From strategy and planning to full
              implementation, get founder-level expertise for your project.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Whether you&apos;re launching a new site or optimizing an existing
              one, I can help you build it right.
            </p>
            <Link href="/houzez" className="btn-neo btn-neo-primary">
              Houzez Consulting Services
            </Link>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#c4b5fd]/30 rounded-xl flex items-center justify-center text-[#5b21b6]">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-slate-900">
                Houzez Consulting Includes:
              </h4>
            </div>
            <ul className="space-y-4 mb-8">
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
                  - Strategy & planning
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
                  <strong className="text-slate-900">Built with Founder</strong>{" "}
                  - Full implementation
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
                  <strong className="text-slate-900">Advisory Retainer</strong>{" "}
                  - Ongoing support
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
                  <strong className="text-slate-900">Custom development</strong>{" "}
                  & integrations
                </span>
              </li>
            </ul>
            <Link
              href="/houzez"
              className="btn-neo btn-neo-secondary w-full justify-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
