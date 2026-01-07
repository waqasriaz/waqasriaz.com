"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const serviceTypes = [
  { value: "", label: "Select an option" },
  { value: "audit", label: "Site Audit (existing site review)" },
  { value: "kickstart", label: "Founder Kickstart (strategy + roadmap)" },
  { value: "build", label: "Built with Founder (full implementation)" },
  { value: "advisory", label: "Founder Advisory (monthly retainer)" },
  { value: "not-sure", label: "Not sure - recommend for me" },
];

const targetMarkets = [
  { value: "", label: "Select your primary market" },
  { value: "uae", label: "UAE" },
  { value: "ksa", label: "KSA (Saudi Arabia)" },
  { value: "us", label: "United States" },
  { value: "eu", label: "Europe" },
  { value: "uk", label: "United Kingdom" },
  { value: "canada", label: "Canada" },
  { value: "australia", label: "Australia" },
  { value: "other", label: "Other" },
];

const timelines = [
  { value: "", label: "When do you need to start?" },
  { value: "asap", label: "ASAP" },
  { value: "2-4-weeks", label: "2-4 weeks" },
  { value: "1-2-months", label: "1-2 months" },
  { value: "flexible", label: "Flexible" },
];

const budgetRanges = [
  { value: "750-1500", label: "$750 - $1,500" },
  { value: "1500-5000", label: "$1,500 - $5,000" },
  { value: "5000-10000", label: "$5,000 - $10,000" },
  { value: "10000-25000", label: "$10,000 - $25,000" },
  { value: "25000+", label: "$25,000+" },
];

const featureOptions = [
  { value: "custom-search-filters", label: "Custom search filters" },
  { value: "map-search", label: "Map search" },
  { value: "multi-language", label: "Multi-language" },
  { value: "multi-currency", label: "Multi-currency" },
  { value: "crm-integration", label: "CRM integration" },
  { value: "speed-optimization", label: "Speed optimization" },
  { value: "lead-capture", label: "Lead capture funnels" },
  { value: "idx-mls", label: "IDX/MLS planning" },
];

function HouzezApplicationFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceFromUrl = searchParams.get("service");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    company: "",
    website: "",
    usingHouzez: "",
    serviceType: "",
    targetMarket: "",
    timeline: "",
    budget: "",
    features: [] as string[],
    otherFeature: "",
    problem: "",
    notes: "",
  });

  // Initialize form from URL params on mount
  useEffect(() => {
    if (serviceFromUrl) {
      const validServices = ["audit", "kickstart", "build", "advisory", "not-sure"];
      if (validServices.includes(serviceFromUrl)) {
        setFormData((prev) => ({
          ...prev,
          serviceType: serviceFromUrl,
          // Auto-fill usingHouzez to "yes" for audit
          ...(serviceFromUrl === "audit" ? { usingHouzez: "yes" } : {}),
        }));
      }
    }
  }, [serviceFromUrl]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Clear budget when switching away from "not-sure"
      if (name === "serviceType" && value !== "not-sure") {
        updated.budget = "";
      }
      // Auto-fill usingHouzez when switching to audit
      if (name === "serviceType" && value === "audit") {
        updated.usingHouzez = "yes";
      }
      return updated;
    });
  };

  const handleFeatureChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(value)
        ? prev.features.filter((f) => f !== value)
        : [...prev.features, value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/houzez-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/thank-you");
      } else {
        alert("Something went wrong. Please try again.");
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
      {/* Basic Information */}
      <h3 className="text-xl font-bold text-slate-900 mb-6">
        Basic Information
      </h3>

      <div className="mb-6">
        <label
          className="block text-sm font-semibold text-slate-700 mb-2"
          htmlFor="fullName"
        >
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5b21b6] focus:border-[#5b21b6] transition-all"
          required
        />
      </div>

      <div className="mb-6">
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

      <div className="mb-6">
        <label
          className="block text-sm font-semibold text-slate-700 mb-2"
          htmlFor="company"
        >
          Company Name (optional)
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5b21b6] focus:border-[#5b21b6] transition-all"
        />
      </div>

      <div className="mb-6">
        <label
          className="block text-sm font-semibold text-slate-700 mb-2"
          htmlFor="website"
        >
          Existing Website URL{" "}
          {formData.serviceType === "audit" ? (
            <span className="text-red-500">*</span>
          ) : (
            "(if any)"
          )}
        </label>
        <input
          type="url"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5b21b6] focus:border-[#5b21b6] transition-all"
          placeholder="https://yoursite.com"
          required={formData.serviceType === "audit"}
        />
        {formData.serviceType === "audit" && (
          <p className="text-sm text-amber-600 mt-2">
            Website URL is required for Site Audit
          </p>
        )}
      </div>

      <hr className="my-10 border-slate-200" />

      {/* Project Details */}
      <h3 className="text-xl font-bold text-slate-900 mb-6">Project Details</h3>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Are you using Houzez already? <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="usingHouzez"
              value="yes"
              checked={formData.usingHouzez === "yes"}
              onChange={handleInputChange}
              className="w-5 h-5 text-[#5b21b6] focus:ring-violet-500"
              required
            />
            <span className="text-slate-700">Yes</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="usingHouzez"
              value="no"
              checked={formData.usingHouzez === "no"}
              onChange={handleInputChange}
              className="w-5 h-5 text-[#5b21b6] focus:ring-violet-500"
            />
            <span className="text-slate-700">No</span>
          </label>
        </div>
        {formData.serviceType === "audit" && formData.usingHouzez === "yes" && (
          <p className="text-sm text-slate-500 mt-2">
            Pre-selected for Site Audit (existing Houzez site)
          </p>
        )}
      </div>

      <div className="mb-6">
        <label
          className="block text-sm font-semibold text-slate-700 mb-2"
          htmlFor="serviceType"
        >
          What do you need? <span className="text-red-500">*</span>
        </label>
        <select
          id="serviceType"
          name="serviceType"
          value={formData.serviceType}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5b21b6] focus:border-[#5b21b6] transition-all bg-white"
          required
        >
          {serviceTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label
          className="block text-sm font-semibold text-slate-700 mb-2"
          htmlFor="targetMarket"
        >
          Target Market / Country <span className="text-red-500">*</span>
        </label>
        <select
          id="targetMarket"
          name="targetMarket"
          value={formData.targetMarket}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5b21b6] focus:border-[#5b21b6] transition-all bg-white"
          required
        >
          {targetMarkets.map((market) => (
            <option key={market.value} value={market.value}>
              {market.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label
          className="block text-sm font-semibold text-slate-700 mb-2"
          htmlFor="timeline"
        >
          Timeline <span className="text-red-500">*</span>
        </label>
        <select
          id="timeline"
          name="timeline"
          value={formData.timeline}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5b21b6] focus:border-[#5b21b6] transition-all bg-white"
          required
        >
          {timelines.map((timeline) => (
            <option key={timeline.value} value={timeline.value}>
              {timeline.label}
            </option>
          ))}
        </select>
      </div>

      {/* Budget - Only show when "Not sure" is selected */}
      {formData.serviceType === "not-sure" && (
        <>
          <hr className="my-10 border-slate-200" />

          <h3 className="text-xl font-bold text-slate-900 mb-6">Budget</h3>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Budget Range <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              {budgetRanges.map((range) => (
                <label
                  key={range.value}
                  className="flex items-center gap-3 cursor-pointer p-3 border border-slate-200 rounded-xl hover:border-[#c4b5fd] hover:bg-[#c4b5fd]/10 transition-all"
                >
                  <input
                    type="radio"
                    name="budget"
                    value={range.value}
                    checked={formData.budget === range.value}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-[#5b21b6] focus:ring-violet-500"
                    required
                  />
                  <span className="text-slate-700">{range.label}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      <hr className="my-10 border-slate-200" />

      {/* Features */}
      <h3 className="text-xl font-bold text-slate-900 mb-2">
        Key Features Needed
      </h3>
      <p className="text-slate-600 mb-6">
        Select all that apply to your project:
      </p>

      <div className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {featureOptions.map((feature) => (
            <label
              key={feature.value}
              className="flex items-center gap-3 cursor-pointer p-3 border border-slate-200 rounded-xl hover:border-[#c4b5fd] hover:bg-[#c4b5fd]/10 transition-all"
            >
              <input
                type="checkbox"
                checked={formData.features.includes(feature.value)}
                onChange={() => handleFeatureChange(feature.value)}
                className="w-5 h-5 text-[#5b21b6] rounded focus:ring-violet-500"
              />
              <span className="text-slate-700">{feature.label}</span>
            </label>
          ))}
          {/* Other option */}
          <label className="flex items-center gap-3 cursor-pointer p-3 border border-slate-200 rounded-xl hover:border-[#c4b5fd] hover:bg-[#c4b5fd]/10 transition-all">
            <input
              type="checkbox"
              checked={formData.features.includes("other")}
              onChange={() => handleFeatureChange("other")}
              className="w-5 h-5 text-[#5b21b6] rounded focus:ring-violet-500"
            />
            <span className="text-slate-700">Other</span>
          </label>
        </div>
        {/* Text input for Other feature */}
        {formData.features.includes("other") && (
          <div className="mt-3">
            <input
              type="text"
              name="otherFeature"
              value={formData.otherFeature}
              onChange={handleInputChange}
              placeholder="Please specify the feature you need..."
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5b21b6] focus:border-[#5b21b6] transition-all"
            />
          </div>
        )}
      </div>

      <hr className="my-10 border-slate-200" />

      {/* Problem & Notes */}
      <h3 className="text-xl font-bold text-slate-900 mb-6">Tell Me More</h3>

      <div className="mb-6">
        <label
          className="block text-sm font-semibold text-slate-700 mb-2"
          htmlFor="problem"
        >
          Biggest problem you want solved{" "}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          id="problem"
          name="problem"
          value={formData.problem}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5b21b6] focus:border-[#5b21b6] transition-all resize-none"
          required
          placeholder="What's the main challenge you're facing with your real estate website? What would success look like for this project?"
        />
      </div>

      <div className="mb-6">
        <label
          className="block text-sm font-semibold text-slate-700 mb-2"
          htmlFor="notes"
        >
          Additional Notes / Links (optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5b21b6] focus:border-[#5b21b6] transition-all resize-none"
          placeholder="Any reference sites, specific requirements, or additional context you'd like to share."
        />
      </div>

      <hr className="my-10 border-slate-200" />

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-[#5b21b6] text-white font-semibold rounded-full shadow-lg shadow-[#c4b5fd] hover:shadow-xl hover:-translate-y-0.5 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
        <p className="text-sm text-slate-500 text-center mt-4">
          By submitting, you agree to our{" "}
          <a href="/terms" className="text-[#5b21b6] hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/terms#privacy" className="text-[#5b21b6] hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </form>
  );
}

// Loading skeleton for Suspense fallback
function FormSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-12 animate-pulse">
      <div className="h-6 bg-slate-200 rounded w-1/3 mb-6"></div>
      <div className="space-y-4">
        <div className="h-12 bg-slate-200 rounded"></div>
        <div className="h-12 bg-slate-200 rounded"></div>
        <div className="h-12 bg-slate-200 rounded"></div>
      </div>
      <div className="h-px bg-slate-200 my-10"></div>
      <div className="h-6 bg-slate-200 rounded w-1/4 mb-6"></div>
      <div className="space-y-4">
        <div className="h-12 bg-slate-200 rounded"></div>
        <div className="h-12 bg-slate-200 rounded"></div>
      </div>
    </div>
  );
}

// Exported component with Suspense wrapper
export default function HouzezApplicationForm() {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <HouzezApplicationFormContent />
    </Suspense>
  );
}
