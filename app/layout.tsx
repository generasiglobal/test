import type { Metadata } from "next";
import "./globals.css";

const brand = process.env.NEXT_PUBLIC_BRAND || "OrderChat";

export const metadata: Metadata = {
  title: `${brand} — take orders on chat, without the chaos`,
  description:
    "A simple order page for your shop. Customers pick items, and the order arrives in your chat app, ready to confirm.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
