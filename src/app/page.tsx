import SignupForm from "../components/SignupForm";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main className="flex gap-[32px] row-start-2 items-center justify-center min-h-screen w-screen">
        {/* Custom Form */}
        <div className="w-screen md:w-2/3 lg:w-1/2">
          <Link
            href={"/form-usage-sample"}
            className="text-xl font-semibold text-blue-600 underline"
          >
            Other component usage
          </Link>
          <SignupForm />
        </div>
      </main>
    </div>
  );
}
