export default function PendingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur">
        <h1 className="text-2xl font-semibold">Access Pending</h1>
        <p className="mt-2 text-sm text-white/70">
          Your account has been created and is awaiting approval.
          We’ll notify you once access is granted.
        </p>
      </div>
    </div>
  );
}
