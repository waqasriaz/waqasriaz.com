"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import StatusBadge from "@/components/admin/StatusBadge";

interface Application {
  _id: string;
  fullName: string;
  email: string;
  company?: string;
  serviceType: string;
  budget: string;
  status: string;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
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

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchApplications() {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: "20",
          ...(statusFilter !== "all" && { status: statusFilter }),
          ...(search && { search }),
        });
        const res = await fetch(`/api/admin/applications?${params}`);
        const data = await res.json();
        setApplications(data.applications || []);
        setPagination(data.pagination);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, [page, statusFilter, search]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />

      <main className="ml-64 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Houzez Applications
            </h1>
            <p className="text-slate-600 mt-1">
              Manage consulting applications
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name, email, or company..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-[#5b21b6] focus:ring-2 focus:ring-[#5b21b6]/20 outline-none transition-all"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 rounded-xl border border-slate-200 focus:border-[#5b21b6] focus:ring-2 focus:ring-[#5b21b6]/20 outline-none transition-all"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="reviewing">Reviewing</option>
              <option value="qualified">Qualified</option>
              <option value="call-scheduled">Call Scheduled</option>
              <option value="proposal-sent">Proposal Sent</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-4 border-[#5b21b6] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : applications.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              No applications found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                      Name
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                      Company
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                      Service
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                      Budget
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                      Status
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.map((app) => (
                    <tr
                      key={app._id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/applications/${app._id}`}
                          className="font-medium text-slate-900 hover:text-[#5b21b6]"
                        >
                          {app.fullName}
                        </Link>
                        <p className="text-sm text-slate-500">{app.email}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {app.company || "-"}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {serviceLabels[app.serviceType] || app.serviceType}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {budgetLabels[app.budget] || app.budget}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={app.status} />
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {formatDate(app.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing {(page - 1) * pagination.limit + 1} to{" "}
                {Math.min(page * pagination.limit, pagination.total)} of{" "}
                {pagination.total} applications
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === pagination.totalPages}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
