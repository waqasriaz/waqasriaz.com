import { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thank you for your submission.",
};

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main>
        <section className="min-h-[70vh] flex items-center justify-center bg-[#c4b5fd]/10">
          <div className="max-w-xl mx-auto px-6 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#5b21b6] to-[#c4b5fd] rounded-full flex items-center justify-center mx-auto mb-8">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Thank You!
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Your message has been sent successfully. I&apos;ll review it and
              get back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn-neo btn-neo-primary">
                Back to Home
              </Link>
              <Link href="/work" className="btn-neo btn-neo-secondary">
                View My Work
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
