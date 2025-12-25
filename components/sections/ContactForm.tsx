"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase/client";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const { error } = await supabase.from("leads").insert({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      source: "website",
    });

    setLoading(false);

    if (!error) {
      setSuccess(true);
      form.reset();
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

      <textarea
        name="message"
        required
        placeholder="Tell us about your project"
        rows={4}
        className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 text-white"
      />

      <button
        disabled={loading}
        className="rounded-md bg-amber-600 px-6 py-3 font-semibold text-black hover:bg-amber-500"
      >
        {loading ? "Sending…" : "Send request"}
      </button>

      {success && (
        <p className="text-sm text-amber-400">
          Thank you — we’ll contact you shortly.
        </p>
      )}
    </form>
  );
}
