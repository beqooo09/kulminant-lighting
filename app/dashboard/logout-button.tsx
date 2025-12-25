"use client";

import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/utils/supabase/browser";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  return (
    <button
      className="rounded-xl border border-white/15 px-3 py-2 text-sm text-white/80 hover:text-white"
      onClick={async () => {
        await supabase.auth.signOut();
        router.replace("/");   // ✅ go home after logout
        router.refresh();
      }}
    >
      Logout
    </button>
  );
}
