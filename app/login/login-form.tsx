"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/utils/supabase/browser";

export default function LoginForm() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) return setMsg(error.message);

    router.replace("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="text-sm text-white/80">Email</label>
        <input
          className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-white/25"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
          required
        />
      </div>

      <div>
        <label className="text-sm text-white/80">Password</label>
        <input
          className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-white/25"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete="current-password"
          required
        />
      </div>

      {msg && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          {msg}
        </div>
      )}

      <button
        disabled={loading}
        className="w-full rounded-xl bg-white text-black font-medium py-2 disabled:opacity-60"
        type="submit"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
