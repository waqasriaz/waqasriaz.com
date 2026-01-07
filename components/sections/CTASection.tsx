import Link from "next/link";

interface CTASectionProps {
  badge?: string;
  title: string;
  description: string;
  primaryCTA: {
    href: string;
    label: string;
  };
  secondaryCTA?: {
    href: string;
    label: string;
  };
}

export default function CTASection({
  badge = "Ready to start?",
  title,
  description,
  primaryCTA,
  secondaryCTA,
}: CTASectionProps) {
  return (
    <section className="py-28 bg-[#c4b5fd]/20 relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-[#c4b5fd]/30 rounded-full -top-48 -left-48 blur-3xl" />
      <div className="absolute w-80 h-80 bg-[#c4b5fd]/30 rounded-full -bottom-40 -right-40 blur-3xl" />
      <div className="absolute w-64 h-64 bg-[#c4b5fd]/30 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center">
          <span className="inline-block text-sm font-semibold text-[#5b21b6] bg-[#c4b5fd]/30 px-4 py-1.5 rounded-full mb-6">
            {badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {title}
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href={primaryCTA.href} className="btn-neo btn-neo-primary">
              {primaryCTA.label}
            </Link>
            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className="btn-neo btn-neo-secondary"
              >
                {secondaryCTA.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
