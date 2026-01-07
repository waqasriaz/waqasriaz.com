import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service and privacy policy for waqasriaz.com",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-20 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <h1 className="text-4xl font-bold text-slate-900 mb-8">
              Terms of Service
            </h1>

            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 mb-8">
                Last updated: January 2025
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
                1. Agreement to Terms
              </h2>
              <p className="text-slate-600 mb-4">
                By accessing or using our services, you agree to be bound by
                these Terms of Service. If you disagree with any part of the
                terms, you may not access our services.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
                2. Services
              </h2>
              <p className="text-slate-600 mb-4">
                We provide web development, mobile app development, WordPress
                theme/plugin development, and consulting services. All projects
                are subject to individual agreements and scope documents.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
                3. Payment Terms
              </h2>
              <p className="text-slate-600 mb-4">
                Payment terms are specified in individual project agreements.
                Generally, a deposit is required to begin work, with the balance
                due upon project completion or according to the agreed payment
                schedule.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
                4. Intellectual Property
              </h2>
              <p className="text-slate-600 mb-4">
                Upon full payment, clients receive ownership of custom work
                created specifically for their project. Pre-existing tools,
                frameworks, and reusable components remain our property.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
                5. Limitation of Liability
              </h2>
              <p className="text-slate-600 mb-4">
                We shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages resulting from your use of
                our services.
              </p>

              <h2
                id="privacy"
                className="text-3xl font-bold text-slate-900 mt-16 mb-8 pt-8 border-t border-slate-200"
              >
                Privacy Policy
              </h2>

              <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                Information We Collect
              </h3>
              <p className="text-slate-600 mb-4">
                We collect information you provide directly to us, such as when
                you fill out a contact form, submit an application, or
                communicate with us via email. This may include your name, email
                address, phone number, company name, and project details.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                How We Use Your Information
              </h3>
              <p className="text-slate-600 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
                <li>Respond to your inquiries and provide requested services</li>
                <li>Send project updates and communications</li>
                <li>Improve our services and website</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                Data Security
              </h3>
              <p className="text-slate-600 mb-4">
                We implement appropriate security measures to protect your
                personal information. However, no method of transmission over
                the Internet is 100% secure.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                Contact
              </h3>
              <p className="text-slate-600 mb-4">
                If you have questions about these terms or our privacy
                practices, please contact us at hello@waqasriaz.com.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
