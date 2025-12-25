import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/utils/supabase/server";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: userRes } = await supabase.auth.getUser();

  if (!userRes.user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userRes.user.id)
    .single();

  if (!profile) redirect("/login");

  if (profile.role === "pending") redirect("/pending");
  if (profile.role === "partner") redirect("/partner");

  redirect("/architect");
}
