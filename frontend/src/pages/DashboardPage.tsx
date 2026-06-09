import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, RefreshCw, AlertCircle, InboxIcon } from "lucide-react";

import Navbar from "../components/Navbar";
import StatsBar from "../components/StatsBar";
import ApplicationsTable from "../components/ApplicationsTable";

import { api } from "../services/api";
import type { Summary } from "../types/summary";
import type { Application } from "../types/application";

const VALID_STATUSES = ["pending", "approved", "rejected"] as const;

export default function DashboardPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchApplications = async (status = "") => {
    if (status && !VALID_STATUSES.includes(status as typeof VALID_STATUSES[number])) {
      setError("Invalid status filter");
      return;
    }
    const response = await api.get("/applications", {
      params: { status: status || undefined },
    });
    setApplications(Array.isArray(response.data) ? response.data : []);
  };

  const fetchSummary = async () => {
    const response = await api.get("/summary");
    setSummary(response.data);
  };

  const loadDashboard = async (quiet = false) => {
    try {
      quiet ? setRefreshing(true) : setLoading(true);
      setError("");
      await Promise.all([fetchSummary(), fetchApplications(statusFilter)]);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      setError("");
      await api.patch(`/applications/${id}/status`, { status });
      await Promise.all([fetchApplications(statusFilter), fetchSummary()]);
    } catch (err) {
      console.error(err);
      setError("Failed to update status. Please try again.");
    }
  };

  useEffect(() => { loadDashboard(); }, []);

  const filtered = applications.filter(
    (app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.mobile.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-14">

        {/* Page header */}
        <div className="mb-8 flex items-end justify-between border-b border-[#E8E8E6] pb-7">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A8A8A3]">
              Overview
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-[#111110]">Dashboard</h1>
            <p className="mt-1 text-sm text-[#A8A8A3]">Monitor and manage all loan applications</p>
          </div>

          <button
            onClick={() => loadDashboard(true)}
            disabled={loading || refreshing}
            className="flex items-center gap-1.5 rounded-lg border border-[#E8E8E6] bg-white px-3.5 py-2 text-xs font-medium text-[#636360] transition-all hover:border-[#CECEC8] hover:text-[#111110] disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} strokeWidth={1.5} />
            Refresh
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-[#FECDD3] bg-[#FFF1F2] px-4 py-3">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#E11D48]" strokeWidth={1.5} />
            <p className="text-sm text-[#9F1239]">{error}</p>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-24 animate-pulse rounded-2xl bg-[#EFEFED]" />
              ))}
            </div>
            <div className="h-64 animate-pulse rounded-2xl bg-[#EFEFED]" />
          </div>
        )}

        {/* Content */}
        {!loading && summary && (
          <>
            <StatsBar summary={summary} />

            <div className="mt-10">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-[#111110]">Applications</h2>
                  <p className="mt-0.5 text-xs text-[#A8A8A3]">
                    {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                    {statusFilter ? ` · ${statusFilter}` : ""}
                    {searchTerm ? ` · "${searchTerm}"` : ""}
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#C4C4C0]" strokeWidth={1.5} />
                    <input
                      type="text"
                      placeholder="Search name or mobile…"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full rounded-lg border border-[#E8E8E6] bg-white py-2 pl-9 pr-4 text-sm text-[#111110] placeholder:text-[#C4C4C0] outline-none transition focus:border-[#111110] focus:shadow-[0_0_0_3px_rgba(17,17,16,0.06)] sm:w-56"
                    />
                  </div>

                  <div className="relative">
                    <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#C4C4C0]" strokeWidth={1.5} />
                    <select
                      value={statusFilter}
                      onChange={async (e) => {
                        const val = e.target.value;
                        setStatusFilter(val);
                        try { await fetchApplications(val); }
                        catch { setError("Failed to filter applications."); }
                      }}
                      className="appearance-none rounded-lg border border-[#E8E8E6] bg-white py-2 pl-9 pr-4 text-sm text-[#636360] outline-none transition focus:border-[#111110] focus:shadow-[0_0_0_3px_rgba(17,17,16,0.06)] cursor-pointer"
                    >
                      <option value="">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E8E8E6] bg-white py-20">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E8E8E6] bg-[#FAFAF8]">
                    <InboxIcon className="h-5 w-5 text-[#C4C4C0]" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-semibold text-[#636360]">No applications found</p>
                  <p className="mt-1 text-xs text-[#A8A8A3]">
                    {searchTerm
                      ? `No results matching "${searchTerm}"`
                      : "No applications match the selected filter."}
                  </p>
                </div>
              ) : (
                <ApplicationsTable applications={filtered} onStatusChange={updateStatus} />
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
