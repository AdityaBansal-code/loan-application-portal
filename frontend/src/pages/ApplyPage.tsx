import { ShieldCheck, Clock, Globe } from "lucide-react";
import Navbar from "../components/Navbar";
import ApplicationForm from "../components/ApplicationForm";

const perks = [
  { icon: ShieldCheck, title: "Secure & Private", desc: "Your data is encrypted and never shared without consent." },
  { icon: Clock, title: "Quick Decisions", desc: "Most applications reviewed within 24 hours." },
  { icon: Globe, title: "Your Language", desc: "Apply in Hindi, Tamil, Telugu, Marathi, or English." },
];

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-14 sm:px-10 lg:px-14">
        <div className="grid gap-16 lg:grid-cols-[1fr_460px] lg:items-start">

          {/* Left — editorial copy */}
          <div className="lg:pt-6">
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A8A8A3]">
              <span className="inline-block h-px w-5 bg-[#CECEC8]" />
              Loan Application
            </span>

            <h1
              className="mt-5 text-[2.75rem] leading-[1.08] tracking-tight text-[#111110] sm:text-[3.5rem]"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Apply for a loan<br />
              <em className="not-italic" style={{ color: "#636360" }}>in minutes.</em>
            </h1>

            <p className="mt-5 max-w-sm text-base leading-relaxed text-[#636360]">
              Fill in your details below. Our team reviews every application
              personally and reaches out in your preferred language.
            </p>

            <div className="mt-10 divide-y divide-[#E8E8E6] border-y border-[#E8E8E6]">
              {perks.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4 py-5">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#E8E8E6] bg-white">
                    <Icon className="h-4 w-4 text-[#636360]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#111110]">{title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-[#A8A8A3]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form card */}
          <div className="rounded-2xl border border-[#E8E8E6] bg-white p-7 shadow-sm sm:p-9">
            <div className="mb-7 border-b border-[#F0F0EE] pb-6">
              <h2 className="text-lg font-semibold tracking-tight text-[#111110]">Your Details</h2>
              <p className="mt-1 text-sm text-[#A8A8A3]">All fields are required</p>
            </div>
            <ApplicationForm />
          </div>

        </div>
      </main>
    </div>
  );
}
