import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim().slice(0, max);
  return v.length ? v : null;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real people never fill this hidden field, bots usually do.
  if (body.website) return NextResponse.json({ ok: true });

  const email = clean(body.email, 254)?.toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  try {
    await pool.query(
      `INSERT INTO waitlist (email, country, sells) VALUES ($1, $2, $3)
       ON CONFLICT (email) DO NOTHING`,
      [email, clean(body.country, 80), clean(body.sells, 200)],
    );
  } catch (err) {
    console.error("waitlist insert failed", err);
    return NextResponse.json({ error: "Something went wrong. Try again later." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
