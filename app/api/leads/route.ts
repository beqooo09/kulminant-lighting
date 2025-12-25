import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Simple in-memory rate limit (good for dev; for production we can upgrade later)
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000; // 1 min
const MAX_REQ = 10; // per minute

function getIP(req: Request) {
  // Vercel / proxies commonly set this
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return "unknown";
}

export async function POST(req: Request) {
  try {
    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        { error: "Server env missing Supabase keys." },
        { status: 500 }
      );
    }

    const ip = getIP(req);
    const now = Date.now();

    // Rate limit
    const entry = hits.get(ip);
    if (!entry || entry.resetAt < now) {
      hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    } else {
      entry.count += 1;
      if (entry.count > MAX_REQ) {
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 }
        );
      }
    }

    const body = await req.json();

    // Honeypot: bots fill hidden field
    if (body?.company && String(body.company).trim().length > 0) {
      // pretend success to not teach bots
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const phone = String(body?.phone || "").trim();
    const message = String(body?.message || "").trim();
    const source = String(body?.source || "website").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    const { error } = await supabase.from("leads").insert({
      name,
      email,
      phone,
      message,
      source,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
