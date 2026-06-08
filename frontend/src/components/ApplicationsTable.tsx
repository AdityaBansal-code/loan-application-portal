import type { Application } from "../types/application";
import StatusBadge from "./StatusBadge";
import LanguageBadge from "./LanguageBadge";

interface Props {
  applications: Application[];
  onStatusChange: (
    id: string,
    status: "approved" | "rejected"
  ) => void;
}

export default function ApplicationsTable({
  applications,
  onStatusChange,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-3 text-left">
              Name
            </th>
            <th className="p-3 text-left">
              Mobile
            </th>
            <th className="p-3 text-left">
              Amount
            </th>
            <th className="p-3 text-left">
              Purpose
            </th>
            <th className="p-3 text-left">
              Language
            </th>
            <th className="p-3 text-left">
              Status
            </th>
            <th className="p-3 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {applications.map(
            (application) => (
              <tr
                key={application.id}
                className="border-b"
              >
                <td className="p-3">
                  {application.name}
                </td>

                <td className="p-3">
                  {application.mobile}
                </td>

                <td className="p-3">
                  ₹
                  {application.amount.toLocaleString()}
                </td>

                <td className="p-3">
                  {application.purpose}
                </td>

                <td className="p-3">
  <LanguageBadge
    language={application.language}
  />
</td>

                <td className="p-3">
                  <StatusBadge
                    status={
                      application.status
                    }
                  />
                </td>

                <td className="p-3">
                  {application.status ===
                    "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          onStatusChange(
                            application.id,
                            "approved"
                          )
                        }
                        className="rounded bg-green-600 px-3 py-1 text-white"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          onStatusChange(
                            application.id,
                            "rejected"
                          )
                        }
                        className="rounded bg-red-600 px-3 py-1 text-white"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}