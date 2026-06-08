import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import StatsBar from "../components/StatsBar";
import ApplicationsTable from "../components/ApplicationsTable";

import { api } from "../services/api";

import type { Summary } from "../types/summary";
import type { Application } from "../types/application";

export default function DashboardPage() {
  const [summary, setSummary] = useState<Summary | null>(
    null
  );

  const [applications, setApplications] = useState<
    Application[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const validStatuses = [
    "pending",
    "approved",
    "rejected",
  ];

  const fetchApplications = async (
    status = ""
  ) => {
    try {
      setError("");

      if (
        status &&
        !validStatuses.includes(status)
      ) {
        setError("Invalid status filter");
        return;
      }

      const response = await api.get(
        "/applications",
        {
          params: {
            status:
              status || undefined,
          },
        }
      );

      setApplications(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (err) {
      console.error(err);
      setError(
        "Failed to load applications"
      );
    }
  };

  const fetchSummary = async () => {
    try {
      const response =
        await api.get("/summary");

      setSummary(response.data);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to load dashboard summary"
      );
    }
  };

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      await Promise.all([
        fetchSummary(),
        fetchApplications(),
      ]);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
    try {
      setError("");

      if (!id?.trim()) {
        setError(
          "Invalid application ID"
        );
        return;
      }

      if (
        status !== "approved" &&
        status !== "rejected"
      ) {
        setError("Invalid status");
        return;
      }

      await api.patch(
        `/applications/${id}/status`,
        { status }
      );

      await Promise.all([
        fetchApplications(
          statusFilter
        ),
        fetchSummary(),
      ]);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to update application status"
      );
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="mt-1 text-gray-500">
            Manage and review loan
            applications
          </p>
        </div>

        {loading && (
          <div className="rounded-xl border bg-white p-6 text-center">
            Loading dashboard...
          </div>
        )}

        {!loading && error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {!loading && summary && (
          <>
            <StatsBar summary={summary} />

            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Applications
                </h2>

                <select
                  value={statusFilter}
                  onChange={async (e) => {
                    const value =
                      e.target.value;

                    setStatusFilter(
                      value
                    );

                    await fetchApplications(
                      value
                    );
                  }}
                  className="rounded-lg border p-2"
                >
                  <option value="">
                    All Applications
                  </option>

                  <option value="pending">
                    Pending
                  </option>

                  <option value="approved">
                    Approved
                  </option>

                  <option value="rejected">
                    Rejected
                  </option>
                </select>
              </div>

              {applications.length ===
              0 ? (
                <div className="rounded-xl border bg-white p-8 text-center">
                  <h3 className="text-lg font-medium">
                    No applications found

                    Try changing the filter or create a new application.
                  </h3>

                  <p className="mt-2 text-gray-500">
                    No applications
                    match the selected
                    filter.
                  </p>
                </div>
              ) : (
                <ApplicationsTable
                  applications={
                    applications
                  }
                  onStatusChange={
                    updateStatus
                  }
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}