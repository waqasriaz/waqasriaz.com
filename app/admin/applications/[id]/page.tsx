"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import StatusBadge from "@/components/admin/StatusBadge";

interface Application {
  _id: string;
  fullName: string;
  email: string;
  whatsapp?: string;
  company?: string;
  website?: string;
  usingHouzez: string;
  serviceType: string;
  targetMarket: string;
  timeline: string;
  budget: string;
  features: string[];
  problem: string;
  notes?: string;
  status: string;
  adminNotes?: string;
  createdAt: string;
  emailSent: boolean;
}

const serviceLabels: Record<string, string> = {
  audit: "Audit",
  kickstart: "Kickstart",
  build: "Full Build",
  advisory: "Advisory",
  "not-sure": "Not Sure",
};

const budgetLabels: Record<string, string> = {
  "750-1500": "$750 - $1,500",
  "1500-5000": "$1,500 - $5,000",
  "5000-10000": "$5,000 - $10,000",
  "10000-25000": "$10,000 - $25,000",
  "25000+": "$25,000+",
};

const marketLabels: Record<string, string> = {
  uae: "UAE",
  ksa: "Saudi Arabia",
  us: "United States",
  eu: "Europe",
  uk: "United Kingdom",
  canada: "Canada",
  australia: "Australia",
  other: "Other",
};

const timelineLabels: Record<string, string> = {
  asap: "ASAP",
  "2-4-weeks": "2-4 Weeks",
  "1-2-months": "1-2 Months",
  flexible: "Flexible",
};

export default function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchApplication() {
      try {
        const res = await fetch(`/api/admin/applications/${id}`);
        if (!res.ok) throw new Error("Application not found");
        const data = await res.json();
        setApplication(data);
        setAdminNotes(data.adminNotes || "");
        setStatus(data.status);
      } catch (error) {
        console.error("Failed to fetch application:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchApplication();
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, adminNotes }),
      });
      if (res.ok) {
        const updated = await res.json();
        setApplication(updated);
      }
    } catch (error) {
      console.error("Failed to update application:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this application?")) return;

    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/admin/applications");
      }
    } catch (error) {
      console.error("Failed to delete application:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AdminSidebar />
        <main className="ml-64 p-8">
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-[#5b21b6] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AdminSidebar />
        <main className="ml-64 p-8">
          <div className="text-center py-12">
            <p className="text-slate-600">Application not found</p>
            <Link
              href="/admin/applications"
              className="text-[#5b21b6] hover:underline mt-4 inline-block"
            >
              Back to applications
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />

      <main className="ml-64 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/admin/applications"
              className="text-sm text-slate-600 hover:text-[#5b21b6] mb-2 inline-flex items-center gap-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to applications
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">
              {application.fullName}
            </h1>
            <p className="text-slate-600 mt-1">
              {formatDate(application.createdAt)}
            </p>
          </div>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
          >
            Delete
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Contact Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">
                    Email
                  </label>
                  <a
                    href={`mailto:${application.email}`}
                    className="text-[#5b21b6] hover:underline"
                  >
                    {application.email}
                  </a>
                </div>
                {application.whatsapp && (
                  <div>
                    <label className="block text-sm font-medium text-slate-500 mb-1">
                      WhatsApp
                    </label>
                    <p className="text-slate-900">{application.whatsapp}</p>
                  </div>
                )}
                {application.company && (
                  <div>
                    <label className="block text-sm font-medium text-slate-500 mb-1">
                      Company
                    </label>
                    <p className="text-slate-900">{application.company}</p>
                  </div>
                )}
                {application.website && (
                  <div>
                    <label className="block text-sm font-medium text-slate-500 mb-1">
                      Website
                    </label>
                    <a
                      href={application.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5b21b6] hover:underline"
                    >
                      {application.website}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Project Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">
                    Using Houzez
                  </label>
                  <p className="text-slate-900 capitalize">
                    {application.usingHouzez}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">
                    Service Type
                  </label>
                  <p className="text-slate-900">
                    {serviceLabels[application.serviceType] ||
                      application.serviceType}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">
                    Target Market
                  </label>
                  <p className="text-slate-900">
                    {marketLabels[application.targetMarket] ||
                      application.targetMarket}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">
                    Timeline
                  </label>
                  <p className="text-slate-900">
                    {timelineLabels[application.timeline] ||
                      application.timeline}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">
                    Budget
                  </label>
                  <p className="text-slate-900 font-semibold text-[#5b21b6]">
                    {budgetLabels[application.budget] || application.budget}
                  </p>
                </div>
              </div>
            </div>

            {/* Features */}
            {application.features && application.features.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                  Requested Features
                </h2>
                <div className="flex flex-wrap gap-2">
                  {application.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#5b21b6]/10 text-[#5b21b6] rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Problem Statement */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Problem Statement
              </h2>
              <p className="text-slate-700 whitespace-pre-wrap">
                {application.problem}
              </p>
            </div>

            {/* Additional Notes */}
            {application.notes && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                  Additional Notes from Applicant
                </h2>
                <p className="text-slate-700 whitespace-pre-wrap">
                  {application.notes}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Status
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-2">
                    Current Status
                  </label>
                  <StatusBadge status={application.status} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-2">
                    Update Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-[#5b21b6] focus:ring-2 focus:ring-[#5b21b6]/20 outline-none transition-all"
                  >
                    <option value="new">New</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="qualified">Qualified</option>
                    <option value="call-scheduled">Call Scheduled</option>
                    <option value="proposal-sent">Proposal Sent</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-2">
                    Admin Notes
                  </label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-[#5b21b6] focus:ring-2 focus:ring-[#5b21b6]/20 outline-none transition-all resize-none"
                    placeholder="Add notes..."
                  />
                </div>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full bg-gradient-to-r from-[#5b21b6] to-[#7c3aed] text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <a
                  href={`mailto:${application.email}?subject=Re: Your Houzez Consulting Application`}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors w-full"
                >
                  <svg
                    className="w-5 h-5 text-slate-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-medium text-slate-700">
                    Reply via Email
                  </span>
                </a>
                {application.whatsapp && (
                  <a
                    href={`https://wa.me/${application.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors w-full"
                  >
                    <svg
                      className="w-5 h-5 text-slate-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span className="font-medium text-slate-700">
                      Message on WhatsApp
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
