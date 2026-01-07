"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import StatusBadge from "@/components/admin/StatusBadge";

interface Lead {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: string;
  notes?: string;
  createdAt: string;
  emailSent: boolean;
}

export default function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchLead() {
      try {
        const res = await fetch(`/api/admin/leads/${id}`);
        if (!res.ok) throw new Error("Lead not found");
        const data = await res.json();
        setLead(data);
        setNotes(data.notes || "");
        setStatus(data.status);
      } catch (error) {
        console.error("Failed to fetch lead:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLead();
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes }),
      });
      if (res.ok) {
        const updated = await res.json();
        setLead(updated);
      }
    } catch (error) {
      console.error("Failed to update lead:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this lead?")) return;

    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/leads");
      }
    } catch (error) {
      console.error("Failed to delete lead:", error);
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

  if (!lead) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AdminSidebar />
        <main className="ml-64 p-8">
          <div className="text-center py-12">
            <p className="text-slate-600">Lead not found</p>
            <Link
              href="/admin/leads"
              className="text-[#5b21b6] hover:underline mt-4 inline-block"
            >
              Back to leads
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
              href="/admin/leads"
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
              Back to leads
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">{lead.name}</h1>
            <p className="text-slate-600 mt-1">{formatDate(lead.createdAt)}</p>
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
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Contact Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">
                    Email
                  </label>
                  <a
                    href={`mailto:${lead.email}`}
                    className="text-[#5b21b6] hover:underline"
                  >
                    {lead.email}
                  </a>
                </div>
                {lead.subject && (
                  <div>
                    <label className="block text-sm font-medium text-slate-500 mb-1">
                      Subject
                    </label>
                    <p className="text-slate-900">{lead.subject}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Message
              </h2>
              <p className="text-slate-700 whitespace-pre-wrap">
                {lead.message}
              </p>
            </div>
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
                  <StatusBadge status={lead.status} />
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
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-2">
                    Admin Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
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
                  href={`mailto:${lead.email}?subject=Re: ${lead.subject || "Your message"}`}
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
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
