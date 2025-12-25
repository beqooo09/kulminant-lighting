"use client";

import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorMsg(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      source: "website",
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to send.");
      }

      setSuccess(true);
      form.reset();
    } catch (err: any) {
      setErrorMsg(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 max-w-xl">
      <input
        name="name"
        required
        placeholder="Your name"
        className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 text-white"
      />

      <input
        name="email"
        type="email"
        required
        placeholder="Email address"
        className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 text-white"
      />

      <input
        name="phone"
        placeholder="Phone (optional)"
        className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 text-white"
      />

      <input
       name="company"
       tabIndex={-1}
       autoComplete="off"
       className="hidden"
      />


      <textarea
        name="message"
        required
        placeholder="Tell us about your project"
        rows={4}
        className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 text-white"
      />

      <button
        disabled={loading}
        className="rounded-md bg-amber-600 px-6 py-3 font-semibold text-black hover:bg-amber-500 disabled:opacity-60"
      >
        {loading ? "Sending…" : "Send request"}
      </button>

      {success && (
        <p className="text-sm text-amber-400">
          Thank you — we’ll contact you shortly.
        </p>
      )}

      {errorMsg && <p className="text-sm text-red-300">{errorMsg}</p>}
    </form>
  );
}
