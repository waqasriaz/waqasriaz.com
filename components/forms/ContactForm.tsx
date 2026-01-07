"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const serviceOptions = [
  { value: "", label: "Select a service" },
  { value: "web-development", label: "Web Development" },
  { value: "mobile-apps", label: "Mobile Apps (iOS & Android)" },
  { value: "wordpress", label: "WordPress Development" },
  { value: "consulting", label: "Technical Consulting" },
  { value: "other", label: "Other" },
];

const budgetOptions = [
  { value: "", label: "Select your budget (optional)" },
  { value: "1000-5000", label: "$1,000 - $5,000" },
  { value: "5000-10000", label: "$5,000 - $10,000" },
  { value: "10000-25000", label: "$10,000 - $25,000" },
  { value: "25000+", label: "$25,000+" },
];

function ContactFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceFromUrl = searchParams.get("service");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    service: "",
    budget: "",
    message: "",
  });

  // Pre-populate service from URL param
  useEffect(() => {
    if (serviceFromUrl) {
      const validServices = ["web-development", "mobile-apps", "wordpress", "consulting", "other"];
      if (validServices.includes(serviceFromUrl)) {
        setFormData((prev) => ({ ...prev, service: serviceFromUrl }));
      }
    }
  }, [serviceFromUrl]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/thank-you");
      } else {
        const data = await response.json();
        alert(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-12"
    >
      <h3 className="text-xl font-bold text-slate-900 mb-6">
        Tell me about your project
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label
            className="block text-sm font-semibold text-slate-700 mb-2"
            htmlFor="name"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5b21b6] focus:border-[#5b21b6] transition-all"
            required
          />
        </div>

        <div>
          <label
            className="block text-sm font-semibold text-slate-700 mb-2"
            htmlFor="email"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5b21b6] focus:border-[#5b21b6] transition-all"
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <label
          className="block text-sm font-semibold text-slate-700 mb-2"
          htmlFor="whatsapp"
        >
          WhatsApp (optional)
        </label>
        <input
          type="tel"
          id="whatsapp"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5b21b6] focus:border-[#5b21b6] transition-all"
          placeholder="+1 234 567 8900"
        />
        <p className="text-sm text-slate-500 mt-2">
          Include country code for international numbers
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label
            className="block text-sm font-semibold text-slate-700 mb-2"
            htmlFor="service"
          >
            Service Interested In
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5b21b6] focus:border-[#5b21b6] transition-all bg-white"
          >
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className="block text-sm font-semibold text-slate-700 mb-2"
            htmlFor="budget"
          >
            Budget
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5b21b6] focus:border-[#5b21b6] transition-all bg-white"
          >
            {budgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-8">
        <label
          className="block text-sm font-semibold text-slate-700 mb-2"
          htmlFor="message"
        >
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={5}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5b21b6] focus:border-[#5b21b6] transition-all resize-none"
          required
          placeholder="Tell me about your project, goals, and how I can help..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 py-4 bg-[#5b21b6] text-white font-semibold rounded-full shadow-lg shadow-[#c4b5fd] hover:shadow-xl hover:-translate-y-0.5 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

// Loading skeleton for Suspense fallback
function FormSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-12 animate-pulse">
      <div className="h-6 bg-slate-200 rounded w-1/3 mb-6"></div>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="h-12 bg-slate-200 rounded"></div>
        <div className="h-12 bg-slate-200 rounded"></div>
      </div>
      <div className="h-12 bg-slate-200 rounded mb-6"></div>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="h-12 bg-slate-200 rounded"></div>
        <div className="h-12 bg-slate-200 rounded"></div>
      </div>
      <div className="h-32 bg-slate-200 rounded mb-8"></div>
      <div className="h-14 bg-slate-200 rounded-full"></div>
    </div>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <ContactFormContent />
    </Suspense>
  );
}
