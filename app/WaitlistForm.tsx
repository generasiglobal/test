"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "done" | "error";

export default function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "done") {
    return <p className="success">You&apos;re on the list! We&apos;ll email you when early access opens.</p>;
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <input name="email" type="email" required placeholder="you@yourshop.com" aria-label="Email" />
      <input name="country" placeholder="Country (e.g. Indonesia)" aria-label="Country" />
      <input name="sells" placeholder="What do you sell? (e.g. cakes, clothes)" aria-label="What do you sell" />
      {/* Honeypot field, hidden from people */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Joining…" : "Get early access"}
      </button>
      {status === "error" && <p className="error">{message}</p>}
    </form>
  );
}
