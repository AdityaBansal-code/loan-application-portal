interface Props {
  language: string;
}

export default function LanguageBadge({
  language,
}: Props) {
  const styles = {
    English:
      "bg-blue-100 text-blue-700",
    Hindi:
      "bg-green-100 text-green-700",
    Tamil:
      "bg-purple-100 text-purple-700",
    Telugu:
      "bg-orange-100 text-orange-700",
    Marathi:
      "bg-pink-100 text-pink-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        styles[
          language as keyof typeof styles
        ] ||
        "bg-gray-100 text-gray-700"
      }`}
    >
      {language}
    </span>
  );
}