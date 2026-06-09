interface Props { language: string; }

export default function LanguageBadge({ language }: Props) {
  return (
    <span className="inline-flex items-center rounded-md border border-[#E8E8E6] bg-[#FAFAF8] px-2.5 py-1 text-xs font-medium text-[#636360]">
      {language}
    </span>
  );
}
