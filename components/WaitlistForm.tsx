"use client";

import { useState } from "react";

// Replace LOOPS_FORM_ID with your actual ID from loops.so → Forms → Embed
// Get it at: app.loops.so → Forms → create form → share → copy form ID
const LOOPS_FORM_ENDPOINT = "https://app.loops.so/api/newsletter-form/cmpiljy3q00k80jypvzt23nqx";

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");

    try {
      const res = await fetch(LOOPS_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-2">
        <div className="text-3xl">🌙</div>
        <p className={`font-bold text-base ${dark ? "text-white" : "text-ink"}`}>
          You&apos;re on the list!
        </p>
        <p className={`text-sm ${dark ? "text-white/60" : "text-muted"}`}>
          We&apos;ll email you the moment My Mini Canvas launches.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") setStatus("idle");
        }}
        placeholder="Your email address"
        required
        disabled={status === "loading"}
        className={`flex-1 px-5 py-4 rounded-full font-medium text-sm focus:outline-none focus:ring-2 ${
          dark
            ? "bg-white text-ink placeholder-muted/60 focus:ring-white/50"
            : "bg-parchment text-ink placeholder-muted/60 border border-ink/10 focus:ring-coral/30"
        } ${status === "error" ? "ring-2 ring-red-400" : ""}`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className={`font-bold px-7 py-4 rounded-full whitespace-nowrap transition-all active:scale-95 ${
          dark
            ? "bg-ink text-white hover:bg-ink/90"
            : "bg-coral text-white hover:bg-coral/90 shadow-lg shadow-coral/30"
        } ${status === "loading" ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {status === "loading" ? "Joining…" : "Get Early Access"}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-xs text-center sm:col-span-2 mt-1">
          Something went wrong. Try again or email us at hello@myminicanvas.com
        </p>
      )}
    </form>
  );
}
