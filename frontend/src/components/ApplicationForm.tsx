import { useState } from "react";
import {
  User, Phone, IndianRupee, FileText, Globe,
  CheckCircle2, AlertCircle, Loader2, ArrowRight,
} from "lucide-react";
import { api } from "../services/api";
import axios from "axios";

interface Field {
  name: string;
  label: string;
  placeholder: string;
  icon: typeof User;
  type?: string;
}

const fields: Field[] = [
  { name: "name", label: "Applicant Name", placeholder: "e.g. Rahul Sharma", icon: User },
  { name: "mobile", label: "Mobile Number", placeholder: "10-digit mobile number", icon: Phone },
  { name: "amount", label: "Loan Amount (₹)", placeholder: "e.g. 50000", icon: IndianRupee, type: "number" },
  { name: "purpose", label: "Loan Purpose", placeholder: "e.g. Business, Education, Agriculture", icon: FileText },
];

const languages = ["English", "Hindi", "Tamil", "Telugu", "Marathi"];

const inputCls =
  "w-full rounded-xl border border-[#E8E8E6] bg-[#FAFAF8] py-3 pl-10 pr-4 text-sm text-[#111110] placeholder:text-[#C4C4C0] outline-none transition-all duration-150 focus:border-[#111110] focus:bg-white focus:shadow-[0_0_0_3px_rgba(17,17,16,0.06)]";

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    name: "", mobile: "", amount: "", purpose: "", language: "English",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = (): string => {
    if (!formData.name.trim()) return "Applicant name is required";
    if (!/^\d{10}$/.test(formData.mobile)) return "Mobile number must be exactly 10 digits";
    if (!formData.amount || Number(formData.amount) <= 0) return "Loan amount must be greater than 0";
    if (!formData.purpose.trim()) return "Loan purpose is required";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    try {
      setLoading(true);
      const response = await api.post("/applications", {
        ...formData, amount: Number(formData.amount),
      });
      setSuccess(response.data.id);
      setFormData({ name: "", mobile: "", amount: "", purpose: "", language: "English" });
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error ?? "Failed to submit application");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {fields.map((field) => {
        const Icon = field.icon;
        return (
          <div key={field.name}>
            <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.1em] text-[#636360]">
              {field.label}
            </label>
            <div className="relative">
              <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C4C4C0]" strokeWidth={1.5} />
              <input
                name={field.name}
                type={field.type ?? "text"}
                placeholder={field.placeholder}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                maxLength={field.name === "mobile" ? 10 : undefined}
                min={field.type === "number" ? 1 : undefined}
                className={inputCls}
              />
            </div>
          </div>
        );
      })}

      {/* Language */}
      <div>
        <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.1em] text-[#636360]">
          Preferred Language
        </label>
        <div className="relative">
          <Globe className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C4C4C0]" strokeWidth={1.5} />
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className={`${inputCls} appearance-none cursor-pointer`}
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2.5 rounded-xl border border-[#FECDD3] bg-[#FFF1F2] px-4 py-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#E11D48]" strokeWidth={1.5} />
          <p className="text-sm text-[#9F1239]">{error}</p>
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] px-4 py-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#16A34A]" strokeWidth={1.5} />
            <p className="text-sm font-semibold text-[#15803D]">Application Submitted</p>
          </div>
          <p className="mt-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#166534]">
            Reference ID
          </p>
          <p className="mt-1 rounded-lg bg-[#DCFCE7] px-3 py-2 font-mono text-xs text-[#166534] break-all">
            {success}
          </p>
        </div>
      )}

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#111110] px-4 py-3.5 text-sm font-semibold text-white transition-all duration-150 hover:bg-[#2A2A28] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting…
            </>
          ) : (
            <>
              Submit Application
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
