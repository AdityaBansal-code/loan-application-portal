import { useState } from "react";
import { api } from "../services/api";
import axios from "axios";

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    amount: "",
    purpose: "",
    language: "English",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Frontend Validation
    if (!formData.name.trim()) {
      setError("Applicant name is required");
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      setError("Mobile number must be exactly 10 digits");
      return;
    }

    if (Number(formData.amount) <= 0) {
      setError("Loan amount must be greater than 0");
      return;
    }

    if (!formData.purpose.trim()) {
      setError("Loan purpose is required");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/applications",
        {
          ...formData,
          amount: Number(formData.amount),
        }
      );

      setSuccess(
        `Application submitted successfully! Reference ID: ${response.data.id}`
      );

      setFormData({
        name: "",
        mobile: "",
        amount: "",
        purpose: "",
        language: "English",
      });
    } catch (err) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.error ||
            "Failed to submit application"
        );
      } else {
        setError(
          "An unexpected error occurred. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div>
        <input
          name="name"
          placeholder="Applicant Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <input
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <input
          name="amount"
          type="number"
          placeholder="Loan Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <input
          name="purpose"
          placeholder="Loan Purpose"
          value={formData.purpose}
          onChange={handleChange}
          className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
          className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Tamil">Tamil</option>
          <option value="Telugu">Telugu</option>
          <option value="Marathi">Marathi</option>
        </select>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-lg bg-green-50 p-3 text-sm text-green-600">
          {success}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Submitting..."
          : "Submit Application"}
      </button>
    </form>
  );
}