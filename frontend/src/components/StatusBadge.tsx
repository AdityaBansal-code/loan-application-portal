import { CheckCircle2, Clock3, XCircle } from "lucide-react";

interface Props { status: string; }

const config: Record<string, { label: string; classes: string; icon: typeof Clock3 }> = {
  pending: {
    label: "Pending",
    classes: "bg-[#FFFBEB] text-[#B45309] ring-[#FDE68A]",
    icon: Clock3,
  },
  approved: {
    label: "Approved",
    classes: "bg-[#F0FDF4] text-[#15803D] ring-[#BBF7D0]",
    icon: CheckCircle2,
  },
  rejected: {
    label: "Rejected",
    classes: "bg-[#FFF1F2] text-[#BE123C] ring-[#FECDD3]",
    icon: XCircle,
  },
};

export default function StatusBadge({ status }: Props) {
  const cfg = config[status] ?? {
    label: status,
    classes: "bg-[#FAFAF8] text-[#636360] ring-[#E8E8E6]",
    icon: Clock3,
  };
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ring-1 ${cfg.classes}`}
    >
      <Icon className="h-3 w-3" strokeWidth={2.5} />
      {cfg.label}
    </span>
  );
}
