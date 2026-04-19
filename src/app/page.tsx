"use client";

import { useState } from "react";

function LeafCorner({ className }: { className: string }) {
  return (
    <div className={`leaf-corner ${className}`}>
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Small olive branch */}
        <path
          d="M30 55 Q 28 40, 25 30 Q 22 20, 20 10"
          stroke="#9C7B63"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        {/* Left leaves */}
        <path d="M25 32 Q 18 28, 14 30 Q 19 33, 25 32Z" fill="#9C7B63" opacity="0.5" />
        <path d="M23 24 Q 16 20, 12 22 Q 17 25, 23 24Z" fill="#9C7B63" opacity="0.5" />
        <path d="M21 16 Q 15 12, 11 14 Q 16 17, 21 16Z" fill="#9C7B63" opacity="0.4" />
        {/* Right leaves */}
        <path d="M26 36 Q 33 32, 37 34 Q 32 37, 26 36Z" fill="#9C7B63" opacity="0.5" />
        <path d="M24 28 Q 31 24, 35 26 Q 30 29, 24 28Z" fill="#9C7B63" opacity="0.5" />
        <path d="M22 20 Q 28 16, 32 18 Q 27 21, 22 20Z" fill="#9C7B63" opacity="0.4" />
        {/* Small berries/buds */}
        <circle cx="20" cy="10" r="1.5" fill="#9C7B63" opacity="0.3" />
        <circle cx="14" cy="30" r="1.2" fill="#9C7B63" opacity="0.3" />
      </svg>
    </div>
  );
}

export default function Home() {
  const [showRsvp, setShowRsvp] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), quantity }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative h-dvh w-full flex items-center justify-center overflow-hidden bg-card-bg">
      {/* Ornate outer border */}
      <div className="ornate-border" />
      {/* Inner border lines */}
      <div className="inner-border" />
      <div className="inner-border-2" />

      {/* Corner leaf decorations - positioned between borders */}
      <LeafCorner className="top-[28px] left-[28px] sm:top-[38px] sm:left-[38px] md:top-[50px] md:left-[50px] -rotate-45" />
      <LeafCorner className="top-[28px] right-[28px] sm:top-[38px] sm:right-[38px] md:top-[50px] md:right-[50px] rotate-45 -scale-x-100" />
      <LeafCorner className="bottom-[28px] left-[28px] sm:bottom-[38px] sm:left-[38px] md:bottom-[50px] md:left-[50px] -rotate-135" />
      <LeafCorner className="bottom-[28px] right-[28px] sm:bottom-[38px] sm:right-[38px] md:bottom-[50px] md:right-[50px] rotate-135 -scale-x-100" />

      {/* Main content */}
      <div className="relative z-10 text-center px-8 max-w-xl mx-auto flex flex-col items-center">

        {/* Quranic calligraphy (includes the Bismillah) — rendered as a single image so the thuluth font is preserved.
            object-fit: cover crops the square SVG's top/bottom whitespace so the layout isn't padded by empty canvas. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/wa-mn-aayatehe-T-012.svg"
          alt="بسم الله الرحمن الرحيم — ومن آياته أن خلق لكم من أنفسكم أزواجاً لتسكنوا إليها وجعل بينكم مودة ورحمة"
          className="animate-fade-up delay-1 w-[300px] h-[175px] sm:w-[360px] sm:h-[210px] md:w-[400px] md:h-[230px]"
          style={{
            mixBlendMode: "multiply",
            opacity: 0.92,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        {/* "We joyfully invite you..." */}
        <p
          className="animate-fade-up delay-3 text-text-secondary text-sm sm:text-base md:text-lg italic mt-2 sm:mt-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          We joyfully invite you to the katb kitab of:
        </p>

        {/* HJ monogram — ink-like, centered, restrained size */}
        <div
          aria-label="H & J monogram"
          role="img"
          className="jh-mark animate-fade-up delay-4 my-3 sm:my-4 md:my-5 w-[150px] h-[180px] sm:w-[170px] sm:h-[205px] md:w-[185px] md:h-[220px]"
        />

        {/* Couple names - large and elegant */}
        <h1
          className="animate-fade-up delay-5 text-2xl sm:text-3xl md:text-4xl italic text-text-primary tracking-wide"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Hassan Diaa{" "}
          <span className="text-clay-dark not-italic font-normal">&amp;</span>{" "}
          Jana Malek
        </h1>

        {/* Date & Time - bold, prominent */}
        <p
          className="animate-fade-up delay-6 text-lg sm:text-xl md:text-2xl font-bold tracking-wider text-text-primary mt-3 sm:mt-4"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          June 6th <span className="mx-1">|</span> 11 AM &ndash; 12 PM
        </p>

        {/* Venue */}
        <div className="animate-fade-up delay-7 mt-3 sm:mt-4 text-center">
          <p
            className="text-sm sm:text-base md:text-lg italic text-text-secondary"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Islamic Center of Irvine
          </p>
          <p
            className="text-xs sm:text-sm text-text-secondary/80 mt-1 italic"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            2 Truman St,
          </p>
          <p
            className="text-xs sm:text-sm text-text-secondary/80 italic"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Irvine, CA 92620
          </p>
        </div>

        {/* RSVP Button */}
        <button
          onClick={() => setShowRsvp(true)}
          className="animate-fade-up delay-8 mt-5 sm:mt-6 px-10 sm:px-12 py-2.5 sm:py-3 border-2 border-clay-dark/60 text-text-primary text-sm sm:text-base tracking-[0.25em] uppercase transition-all duration-300 hover:bg-clay-dark/20 cursor-pointer"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          RSVP
        </button>
      </div>

      {/* RSVP Modal */}
      {showRsvp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
          onClick={() => !submitting && setShowRsvp(false)}
        >
          <div className="absolute inset-0 bg-text-primary/40 backdrop-blur-sm" />
          <div
            className="paper-panel relative bg-card-bg shadow-2xl p-8 sm:p-10 w-[90vw] max-w-md animate-scale-in border border-border-color"
            onClick={(e) => e.stopPropagation()}
          >
            {submitted ? (
              <div className="text-center py-6">
                <p
                  className="text-2xl sm:text-3xl italic text-text-primary mb-3"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Thank You
                </p>
                <p className="text-text-secondary text-sm sm:text-base">
                  We look forward to celebrating with you.
                </p>
                <button
                  onClick={() => setShowRsvp(false)}
                  className="mt-8 px-8 py-2.5 border-2 border-clay-dark/60 text-text-primary text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:bg-clay-dark/20 cursor-pointer"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <p
                  className="text-2xl italic text-center text-text-primary tracking-wide"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  RSVP
                </p>

                <div>
                  <label
                    className="block text-xs text-text-secondary tracking-[0.15em] uppercase mb-2"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-3 border border-border-color bg-warm-bg/40 text-text-primary text-sm focus:outline-none focus:border-clay-dark transition-colors placeholder:text-text-secondary/40"
                  />
                </div>

                <div>
                  <label
                    className="block text-xs text-text-secondary tracking-[0.15em] uppercase mb-2"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Number of Guests
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-11 h-11 border border-border-color text-text-secondary text-lg flex items-center justify-center hover:border-clay-dark hover:text-text-primary transition-colors cursor-pointer"
                    >
                      &minus;
                    </button>
                    <span
                      className="w-8 text-center text-xl text-text-primary"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(20, quantity + 1))}
                      className="w-11 h-11 border border-border-color text-text-secondary text-lg flex items-center justify-center hover:border-clay-dark hover:text-text-primary transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-red-500/80 text-xs text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting || !name.trim()}
                  className="mt-1 px-8 py-3 border-2 border-clay-dark/60 text-text-primary text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:bg-clay-dark/20 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {submitting ? "Submitting..." : "Confirm"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
