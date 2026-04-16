"use client";

import { useState } from "react";
import Image from "next/image";

function BotanicalCorner({ className }: { className: string }) {
  return (
    <div className={`botanical-corner ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 90 Q 10 50, 30 30 Q 40 20, 50 15 Q 45 25, 42 35 Q 38 50, 40 65"
          stroke="#A8876E"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M30 30 Q 35 22, 45 18 M30 30 Q 25 22, 20 18"
          stroke="#A8876E"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="50" cy="13" r="3" fill="none" stroke="#A8876E" strokeWidth="0.8" />
        <circle cx="18" cy="16" r="2.5" fill="none" stroke="#A8876E" strokeWidth="0.8" />
        <path
          d="M42 35 Q 50 30, 55 32 Q 48 34, 42 35Z"
          fill="#A8876E"
          opacity="0.3"
        />
        <path
          d="M42 35 Q 34 30, 30 32 Q 37 34, 42 35Z"
          fill="#A8876E"
          opacity="0.3"
        />
        <path
          d="M40 50 Q 48 46, 52 48 Q 46 50, 40 50Z"
          fill="#A8876E"
          opacity="0.3"
        />
        <path
          d="M40 50 Q 32 46, 28 48 Q 34 50, 40 50Z"
          fill="#A8876E"
          opacity="0.3"
        />
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
    <main className="relative h-dvh w-full flex items-center justify-center overflow-hidden bg-warm-bg">
      {/* Decorative border */}
      <div className="absolute inset-3 sm:inset-6 md:inset-10 border border-gardenia/60 rounded-sm pointer-events-none" />
      <div className="absolute inset-4 sm:inset-7 md:inset-11 border border-gardenia/30 rounded-sm pointer-events-none" />

      {/* Botanical corners */}
      <BotanicalCorner className="top-6 left-6 sm:top-10 sm:left-10 md:top-14 md:left-14" />
      <BotanicalCorner className="top-6 right-6 sm:top-10 sm:right-10 md:top-14 md:right-14 -scale-x-100" />
      <BotanicalCorner className="bottom-6 left-6 sm:bottom-10 sm:left-10 md:bottom-14 md:left-14 -scale-y-100" />
      <BotanicalCorner className="bottom-6 right-6 sm:bottom-10 sm:right-10 md:bottom-14 md:right-14 -scale-x-100 -scale-y-100" />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-lg mx-auto flex flex-col items-center gap-3 sm:gap-4">
        {/* Bismillah */}
        <p
          className="animate-fade-up delay-1 text-text-secondary text-sm sm:text-base tracking-wider"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          بسم الله الرحمن الرحيم
        </p>

        {/* Quranic verse */}
        <p
          className="animate-fade-up delay-2 text-text-secondary/70 text-xs sm:text-sm leading-relaxed max-w-sm"
          dir="rtl"
          lang="ar"
        >
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
        </p>

        {/* Invitation text */}
        <p
          className="animate-fade-up delay-3 text-text-secondary text-sm sm:text-base italic mt-1"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          We joyfully invite you to the katb kitab of
        </p>

        {/* Monogram */}
        <div className="animate-fade-up delay-4 my-1 sm:my-2">
          <Image
            src="/monogram.jpg"
            alt="J & H monogram"
            width={120}
            height={150}
            className="rounded-sm opacity-80 w-[80px] h-[100px] sm:w-[100px] sm:h-[125px] md:w-[120px] md:h-[150px] object-cover"
            priority
          />
        </div>

        {/* Names */}
        <h1
          className="animate-fade-up delay-5 text-2xl sm:text-3xl md:text-4xl tracking-wide text-text-primary"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Jana Malek{" "}
          <span className="text-clay-dark font-light italic text-xl sm:text-2xl md:text-3xl">&</span>{" "}
          Hassan Diaa
        </h1>

        {/* Date & Time */}
        <div className="animate-fade-up delay-6 flex flex-col items-center gap-1 mt-1">
          <p
            className="text-base sm:text-lg font-medium tracking-widest text-text-primary"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            June 6th, 2026
          </p>
          <p className="text-sm sm:text-base text-text-secondary tracking-wide">
            11:00 AM &mdash; 12:00 PM
          </p>
        </div>

        {/* Venue */}
        <div className="animate-fade-up delay-6 text-center mt-1">
          <p
            className="text-sm sm:text-base text-text-secondary italic"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Islamic Center of Irvine
          </p>
          <p className="text-xs sm:text-sm text-text-secondary/70 mt-0.5">
            2 Truman St, Irvine, CA 92620
          </p>
        </div>

        {/* RSVP Button */}
        <button
          onClick={() => setShowRsvp(true)}
          className="animate-fade-up delay-7 mt-3 sm:mt-4 px-8 sm:px-10 py-2.5 sm:py-3 border border-clay text-clay-dark text-sm sm:text-base tracking-[0.2em] uppercase transition-all duration-300 hover:bg-clay hover:text-warm-white cursor-pointer"
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
          <div className="absolute inset-0 bg-text-primary/30 backdrop-blur-sm" />
          <div
            className="relative bg-warm-white rounded-sm shadow-xl p-8 sm:p-10 w-[90vw] max-w-md animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {submitted ? (
              <div className="text-center py-4">
                <p
                  className="text-2xl text-text-primary mb-3"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Thank You
                </p>
                <p className="text-text-secondary text-sm">
                  We look forward to celebrating with you.
                </p>
                <button
                  onClick={() => setShowRsvp(false)}
                  className="mt-6 px-6 py-2 border border-clay text-clay-dark text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:bg-clay hover:text-warm-white cursor-pointer"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <p
                  className="text-xl text-center text-text-primary tracking-wide"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  RSVP
                </p>

                <div>
                  <label className="block text-xs text-text-secondary tracking-wider uppercase mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-2.5 border border-gardenia bg-warm-bg/50 text-text-primary text-sm rounded-sm focus:outline-none focus:border-clay transition-colors placeholder:text-text-secondary/40"
                  />
                </div>

                <div>
                  <label className="block text-xs text-text-secondary tracking-wider uppercase mb-1.5">
                    Number of Guests
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-gardenia text-text-secondary text-lg flex items-center justify-center rounded-sm hover:border-clay hover:text-clay-dark transition-colors cursor-pointer"
                    >
                      &minus;
                    </button>
                    <span
                      className="w-10 text-center text-lg text-text-primary"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(20, quantity + 1))}
                      className="w-10 h-10 border border-gardenia text-text-secondary text-lg flex items-center justify-center rounded-sm hover:border-clay hover:text-clay-dark transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-red-400 text-xs text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting || !name.trim()}
                  className="mt-1 px-6 py-2.5 border border-clay text-clay-dark text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:bg-clay hover:text-warm-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
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
