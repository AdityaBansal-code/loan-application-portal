import { Users, IndianRupee, CheckCircle2, Clock3, XCircle } from "lucide-react";
import type { Summary } from "../types/summary";

interface Props { summary: Summary; }

const cards = (s: Summary) => [
  {
    label: "Total",
    value: s.total_applications,
    icon: Users,
    valueColor: "text-[#111110]",
    iconColor: "text-[#111110]",
  },
  {
    label: "Total Amount",
    value: `₹${Number(s.total_amount || 0).toLocaleString("en-IN")}`,
    icon: IndianRupee,
    valueColor: "text-[#111110]",
    iconColor: "text-[#111110]",
  },
  {
    label: "Approved",
    value: s.approved,
    icon: CheckCircle2,
    valueColor: "text-[#15803D]",
    iconColor: "text-[#16A34A]",
  },
  {
    label: "Pending",
    value: s.pending,
    icon: Clock3,
    valueColor: "text-[#B45309]",
    iconColor: "text-[#D97706]",
  },
  {
    label: "Rejected",
    value: s.rejected,
    icon: XCircle,
    valueColor: "text-[#BE123C]",
    iconColor: "text-[#E11D48]",
  },
];

export default function StatsBar({ summary }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {cards(summary).map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="relative overflow-hidden rounded-2xl border border-[#E8E8E6] bg-white p-5 transition-all duration-150 hover:border-[#CECEC8] hover:shadow-sm"
          >
            <Icon className={`mb-4 h-4 w-4 ${card.iconColor}`} strokeWidth={1.5} />
            <p className="text-xs font-medium text-[#A8A8A3]">{card.label}</p>
            <p className={`mt-1.5 text-2xl font-bold tracking-tight ${card.valueColor}`}>
              {card.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
