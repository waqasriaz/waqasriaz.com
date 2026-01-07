import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import HouzezApplicationForm from "@/components/forms/HouzezApplicationForm";

export const metadata: Metadata = {
  title: "Apply - Work With Waqas Riaz",
  description:
    "Apply to work with Waqas Riaz, founder of Houzez. Limited spots available each month for consulting and implementation projects.",
};

export default function HouzezApplyPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-12 bg-[#c4b5fd]/20 overflow-hidden">
          <div className="absolute w-96 h-96 bg-[#c4b5fd]/30 rounded-full -top-48 -left-48 blur-3xl" />
          <div className="absolute w-80 h-80 bg-[#c4b5fd]/30 rounded-full -bottom-40 -right-40 blur-3xl" />

          <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Apply to Work with Waqas
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              I accept a limited number of projects each month to maintain
              quality. Please answer the questions below so I can recommend the
              best package and confirm fit.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <HouzezApplicationForm />

            {/* What Happens Next */}
            <div className="text-center mt-12">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                What Happens Next?
              </h3>
              <p className="text-slate-600">
                After you submit your application, I&apos;ll review it within
                24-48 hours. If we&apos;re a good fit, you&apos;ll receive a
                link to schedule a 30-minute founder call to discuss your
                project in detail.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
