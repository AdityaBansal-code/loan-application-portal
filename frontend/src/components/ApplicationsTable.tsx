import { CheckCheck, Ban, Calendar } from "lucide-react";
import type { Application } from "../types/application";
import StatusBadge from "./StatusBadge";
import LanguageBadge from "./LanguageBadge";

interface Props {
  applications: Application[];
  onStatusChange: (id: string, status: "approved" | "rejected") => void;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

export default function ApplicationsTable({ applications, onStatusChange }: Props) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#E8E8E6] bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#F0F0EE]">
            {["Name", "Mobile", "Amount", "Purpose", "Language", "Status", "Date", "Actions"].map((h) => (
              <th
                key={h}
                className="whitespace-nowrap px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-[#A8A8A3]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-[#F4F4F2]">
          {applications.map((app) => (
            <tr key={app.id} className="transition-colors duration-100 hover:bg-[#FAFAF8]">
              <td className="px-5 py-4">
                <span className="font-medium text-[#111110]">{app.name}</span>
              </td>
              <td className="px-5 py-4">
                <span className="font-mono text-xs text-[#A8A8A3]">{app.mobile}</span>
              </td>
              <td className="px-5 py-4">
                <span className="font-semibold text-[#111110]">
                  ₹{Number(app.amount).toLocaleString("en-IN")}
                </span>
              </td>
              <td className="px-5 py-4">
                <span className="block max-w-[140px] truncate text-[#636360]">{app.purpose}</span>
              </td>
              <td className="px-5 py-4">
                <LanguageBadge language={app.language} />
              </td>
              <td className="px-5 py-4">
                <StatusBadge status={app.status} />
              </td>
              <td className="px-5 py-4">
                <span className="flex items-center gap-1.5 whitespace-nowrap text-xs text-[#A8A8A3]">
                  <Calendar className="h-3 w-3 shrink-0" strokeWidth={1.5} />
                  {formatDate(app.created_at)}
                </span>
              </td>
              <td className="px-5 py-4">
                {app.status === "pending" ? (
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => onStatusChange(app.id, "approved")}
                      className="flex items-center gap-1 rounded-lg border border-[#BBF7D0] bg-[#F0FDF4] px-3 py-1.5 text-xs font-semibold text-[#15803D] transition-all hover:bg-[#DCFCE7] active:scale-95"
                    >
                      <CheckCheck className="h-3 w-3" strokeWidth={2} />
                      Approve
                    </button>
                    <button
                      onClick={() => onStatusChange(app.id, "rejected")}
                      className="flex items-center gap-1 rounded-lg border border-[#FECDD3] bg-[#FFF1F2] px-3 py-1.5 text-xs font-semibold text-[#BE123C] transition-all hover:bg-[#FFE4E6] active:scale-95"
                    >
                      <Ban className="h-3 w-3" strokeWidth={2} />
                      Reject
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-[#D4D4D0]">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
