"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/utils/supabase/browser";

export default function SignupForm() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    // 1️⃣ Create auth user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          company,
          phone,
        },
      },
    });

    if (error) {
      setLoading(false);
      return setMsg(error.message);
    }

    

    setLoading(false);

    // redirect to login (or pending page later)
    router.replace("/login");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        placeholder="Full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2"
        required
      />
      <input
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2"
        required
      />
      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2"
      />
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2"
        required
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2"
        required
      />

      {msg && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-200">
          {msg}
        </div>
      )}

      <button
        disabled={loading}
        className="w-full rounded-xl bg-white text-black font-medium py-2 disabled:opacity-60"
      >
        {loading ? "Creating…" : "Request access"}
      </button>
    </form>
  );
}
