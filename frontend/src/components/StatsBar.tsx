import type { Summary } from "../types/summary";

interface Props {
  summary: Summary;
}

export default function StatsBar({
  summary,
}: Props) {
  const cards = [
    {
      title: "Applications",
      value: summary.total_applications,
    },
    {
      title: "Total Amount",
      value: `₹${Number(
        summary.total_amount
      ).toLocaleString()}`,
    },
    {
      title: "Approved",
      value: summary.approved,
    },
    {
      title: "Rejected",
      value: summary.rejected,
    },
    {
      title: "Pending",
      value: summary.pending,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-5">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border bg-white p-4 shadow-sm"
        >
          <p className="text-sm text-gray-500">
            {card.title}
          </p>

          <p className="mt-2 text-2xl font-bold">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}