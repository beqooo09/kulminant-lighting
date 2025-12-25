import SignupForm from "./signup-form";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur">
        <h1 className="text-2xl font-semibold">Request Access</h1>
        <p className="mt-2 text-sm text-white/70">
          Create an account. We’ll review and approve access.
        </p>

        <div className="mt-6">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
