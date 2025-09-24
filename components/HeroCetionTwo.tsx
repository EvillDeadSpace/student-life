"use client";

import React, { useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  {
    name: "Ana Petrović",
    role: "Student ekonomije",
    text: "Ova platforma mi je totalno promijenila studiranje — brz pristup praksama i iskustvima. Preporučujem svima!",
  },
  {
    name: "Marko Jovanović",
    role: "Student računarstva",
    text: "Sjajan UX i korisne informacije. Lajk za tim koji vodi projekat — sve radi glatko.",
  },
  {
    name: "Ivana Kostić",
    role: "Studentica arhitekture",
    text: "Iskustva i stipendije su mi pomogli da pronađem praksu iz snova. Design je top — izgleda odlično.",
  },
];

export default function HeroCetionTwo() {
  const [index, setIndex] = useState(0);
  const mounted = useRef(false);
  const timerRef = useRef<number | null>(null);
  const autoplayMs = 5200;

  useEffect(() => {
    mounted.current = true;
    startAutoplay();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
      if (e.key === "ArrowRight")
        setIndex((i) => (i + 1) % TESTIMONIALS.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      mounted.current = false;
      stopAutoplay();
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startAutoplay() {
    stopAutoplay();
    timerRef.current = window.setInterval(() => {
      setIndex((v) => (v + 1) % TESTIMONIALS.length);
    }, autoplayMs);
  }

  function stopAutoplay() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function goPrev() {
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  function goNext() {
    setIndex((i) => (i + 1) % TESTIMONIALS.length);
  }

  return (
    <section className='h-screen relative overflow-hidden bg-gradient-to-br to-gray-50 from-gray-100 dark:to-gray-900 dark:from-gray-800 flex items-center'>
      <div className='relative mt-8 sm:mt-12 md:mt-16 lg:mt-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='relative bg-gradient-to-r from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-lg rounded-3xl p-10 sm:p-12 lg:p-16 shadow-3xl border border-gray-100 dark:border-gray-800 overflow-hidden'>
            {/* Large decorative quote mark */}
            <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
              <div className='text-teal-50 dark:text-teal-900 opacity-10 text-[220px] font-extrabold leading-none select-none transform -translate-y-8'>
                “
              </div>
            </div>

            <div className='relative z-10 flex flex-col lg:flex-row items-center gap-8'>
              <div className='flex-1 text-center lg:text-left'>
                {TESTIMONIALS.map((t, i) => (
                  <div
                    key={t.name}
                    className={`transition-all duration-700 ease-in-out ${
                      i === index
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95 pointer-events-none absolute"
                    }`}
                  >
                    <p className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight max-w-3xl mx-auto lg:mx-0'>
                      {t.text}
                    </p>

                    <div className='mt-6 flex items-center justify-center lg:justify-start gap-4'>
                      <div className='w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl'>
                        {t.name.split(" ")[0].slice(0, 1)}
                      </div>
                      <div>
                        <div className='font-semibold text-lg text-gray-900 dark:text-white'>
                          {t.name}
                        </div>
                        <div className='text-sm text-gray-500 dark:text-gray-400'>
                          {t.role}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className='flex flex-col items-center lg:items-end gap-6'>
                <div className='flex items-center gap-3'>
                  <button
                    aria-label='Previous testimonial'
                    onClick={goPrev}
                    className='w-12 h-12 rounded-full bg-white dark:bg-gray-700 shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-200 hover:scale-105 transition-transform text-2xl'
                  >
                    ‹
                  </button>
                  <button
                    aria-label='Next testimonial'
                    onClick={goNext}
                    className='w-12 h-12 rounded-full bg-white dark:bg-gray-700 shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-200 hover:scale-105 transition-transform text-2xl'
                  >
                    ›
                  </button>
                </div>

                <div className='flex items-center gap-3'>
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      aria-label={`Go to testimonial ${i + 1}`}
                      className={`w-4 h-4 rounded-full ${
                        i === index
                          ? "bg-teal-500"
                          : "bg-gray-300 dark:bg-gray-600"
                      } transition-colors`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Background pattern and floating particles */}
      <div className='absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10 pointer-events-none'></div>
    </section>
  );
}
