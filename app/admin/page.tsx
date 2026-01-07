"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import StatsCard from "@/components/admin/StatsCard";
import StatusBadge from "@/components/admin/StatusBadge";

interface Stats {
  totalLeads: number;
  newLeads: number;
  totalApplications: number;
  newApplications: number;
}

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
}

interface Application {
  _id: string;
  fullName: string;
  email: string;
  serviceType: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [recentApplications, setRecentApplications] = useState<Application[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        setStats(data.stats);
        setRecentLeads(data.recentLeads || []);
        setRecentApplications(data.recentApplications || []);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />

      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">
            Welcome back! Here&apos;s what&apos;s happening.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-[#5b21b6] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total Leads"
                value={stats?.totalLeads || 0}
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                }
                color="violet"
              />
              <StatsCard
                title="New This Week"
                value={stats?.newLeads || 0}
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
                color="green"
              />
              <StatsCard
                title="Applications"
                value={stats?.totalApplications || 0}
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                }
                color="blue"
              />
              <StatsCard
                title="New Applications"
                value={stats?.newApplications || 0}
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                }
                color="amber"
              />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Leads */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Recent Leads
                  </h2>
                  <Link
                    href="/admin/leads"
                    className="text-sm text-[#5b21b6] hover:underline"
                  >
                    View all
                  </Link>
                </div>
                <div className="divide-y divide-slate-100">
                  {recentLeads.length === 0 ? (
                    <div className="p-6 text-center text-slate-500">
                      No leads yet
                    </div>
                  ) : (
                    recentLeads.map((lead) => (
                      <Link
                        key={lead._id}
                        href={`/admin/leads/${lead._id}`}
                        className="block p-4 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-900">
                              {lead.name}
                            </p>
                            <p className="text-sm text-slate-500">
                              {lead.email}
                            </p>
                          </div>
                          <div className="text-right">
                            <StatusBadge status={lead.status} />
                            <p className="text-xs text-slate-400 mt-1">
                              {formatDate(lead.createdAt)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>

              {/* Recent Applications */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Recent Applications
                  </h2>
                  <Link
                    href="/admin/applications"
                    className="text-sm text-[#5b21b6] hover:underline"
                  >
                    View all
                  </Link>
                </div>
                <div className="divide-y divide-slate-100">
                  {recentApplications.length === 0 ? (
                    <div className="p-6 text-center text-slate-500">
                      No applications yet
                    </div>
                  ) : (
                    recentApplications.map((app) => (
                      <Link
                        key={app._id}
                        href={`/admin/applications/${app._id}`}
                        className="block p-4 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-900">
                              {app.fullName}
                            </p>
                            <p className="text-sm text-slate-500">
                              {app.serviceType}
                            </p>
                          </div>
                          <div className="text-right">
                            <StatusBadge status={app.status} />
                            <p className="text-xs text-slate-400 mt-1">
                              {formatDate(app.createdAt)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
