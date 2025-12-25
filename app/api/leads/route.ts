import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

type LeadPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source?: string;
};

function badRequest(message: string) {
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<LeadPayload>;

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const phone = (body.phone ?? "").trim();
    const message = (body.message ?? "").trim();
    const source = (body.source ?? "website").trim();

    if (!name) return badRequest("Name is required.");
    if (!email) return badRequest("Email is required.");
    if (!message) return badRequest("Message is required.");

    // 1) Save to Supabase
    const { error: dbError } = await supabase.from("leads").insert([
      { name, email, phone: phone || null, message, source },
    ]);

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json({ ok: false, error: "Database insert failed." }, { status: 500 });
    }

    // 2) Send email notification
    const to = process.env.LEADS_NOTIFY_TO_EMAIL!;
    const from = process.env.LEADS_FROM_EMAIL || "Kulminant <onboarding@resend.dev>";

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ ok: true, warning: "RESEND_API_KEY missing; saved lead only." });
    }

    await resend.emails.send({
      from,
      to,
      subject: `New Kulminant lead — ${name}`,
      text: [
        `New lead submitted:`,
        ``,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "-"}`,
        `Source: ${source}`,
        ``,
        `Message:`,
        message,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ ok: false, error: "Unexpected error." }, { status: 500 });
  }
}
