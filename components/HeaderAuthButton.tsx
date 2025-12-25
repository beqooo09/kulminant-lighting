import Link from "next/link";
import { createSupabaseServerClient } from "@/utils/supabase/server";

export default async function HeaderAuthButton() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    return (
      <Link
        href="/dashboard"
        className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/90 hover:border-white/30"
      >
        Dashboard
      </Link>
    );
  }

  return (
    <Link
      href="/signup"
      className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/90 hover:border-white/30"
    >
      Request Access
    </Link>
  );
}
