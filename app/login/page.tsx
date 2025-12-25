import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import LoginForm from "./login-form";

export default async function LoginPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) redirect("/dashboard");

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur">
        <h1 className="text-2xl font-semibold">Architect Login</h1>
        <p className="mt-2 text-sm text-white/70">
          Sign in to access your dashboard.
        </p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
