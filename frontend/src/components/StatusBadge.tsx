interface Props {
  status: string;
}

export default function StatusBadge({
  status,
}: Props) {
  const styles = {
    pending:
      "bg-yellow-100 text-yellow-800",
    approved:
      "bg-green-100 text-green-800",
    rejected:
      "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${
        styles[
          status as keyof typeof styles
        ]
      }`}
    >
      {status}
    </span>
  );
}