import Navbar from "../components/Navbar";
import ApplicationForm from "../components/ApplicationForm";

export default function ApplyPage() {
  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-3xl p-6">
        <h1 className="mb-6 text-3xl font-bold">
          Loan Application
        </h1>

        <ApplicationForm />
      </div>
    </>
  );
}