import { pool } from "@/lib/db";

function csvCell(v: unknown): string {
  const s = v == null ? "" : v instanceof Date ? v.toISOString() : String(v);
  // Quote everything and neutralise spreadsheet formula injection.
  const safe = /^[=+\-@]/.test(s) ? `'${s}` : s;
  return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token");
  const expected = process.env.ADMIN_TOKEN;
  if (!expected || expected.startsWith("change-me") || token !== expected) {
    return new Response("Not found", { status: 404 });
  }

  const { rows } = await pool.query(
    "SELECT email, country, sells, created_at FROM waitlist ORDER BY created_at",
  );
  const lines = [
    "email,country,sells,created_at",
    ...rows.map((r) => [r.email, r.country, r.sells, r.created_at].map(csvCell).join(",")),
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="waitlist.csv"',
    },
  });
}
