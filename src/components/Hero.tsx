import { ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";

const SLIDES = [
  {
    url: "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=1600",
    label: "Jardinage & Extérieur",
    caption: "Entretien de jardin & espaces verts",
  },
  {
    url: "https://images.pexels.com/photos/5905702/pexels-photo-5905702.jpeg?auto=compress&cs=tinysrgb&w=1600",
    label: "Cours Particuliers",
    caption: "Aide aux devoirs & soutien à domicile",
  },
  {
    url: "https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=1600",
    label: "Et bien d'autres services...",
    caption: "Bricolage, déménagement, ménage & plus",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index: number) => {
    setCurrent(index);
  };

  return (
    <section className="relative w-full h-[88vh] min-h-[620px] flex items-center justify-center overflow-hidden bg-forest-950 font-sans">
      {/* 1. Full-Width Background Slideshow */}
      {SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
          } transition-transform duration-[6000ms]`}
        >
          <img
            src={slide.url}
            alt={slide.label}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}

      {/* 2. Top-to-Bottom Isolation Shadow (Protects Navbar readability on light images) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-forest-950" />

      {/* 3. Center Atmospheric Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-black/40" />

      {/* 4. Hero Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Glassmorphism Badge */}
        <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8 text-white shadow-2xl transition-all duration-500">
          <ShieldCheck size={17} className="text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide">
            {SLIDES[current].label}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Main Original Title */}
        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-extrabold text-white leading-[1.08] tracking-tight mb-6 drop-shadow-2xl">
          Réservez le <br />
          <span className="bg-gradient-to-r from-cream-100 via-amber-100 to-cream-300 bg-clip-text text-transparent">
            prestataire idéal
          </span>
        </h1>

        {/* Subtitle / Description */}
        <p className="text-base sm:text-lg text-cream-100/90 max-w-xl font-sans leading-relaxed mb-4 drop-shadow-md">
          Des milliers de professionnels de confiance pour vos services à
          domicile et au-delà. Bricolage, ménage, cours, déménagement —
          dites-nous ce dont vous avez besoin.
        </p>

        {/* Dynamic Caption */}
        <p className="text-xs sm:text-sm text-emerald-300/90 font-mono tracking-widest uppercase transition-all duration-500 min-h-[20px]">
          — {SLIDES[current].caption} —
        </p>
      </div>

      {/* 5. Minimalist Carousel Indicators */}
      <div className="absolute bottom-8 z-20 flex items-center gap-2 bg-black/30 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="h-2 rounded-full transition-all duration-500 cursor-pointer"
            style={{
              width: i === current ? 28 : 8,
              backgroundColor:
                i === current ? "#ffffff" : "rgba(255, 255, 255, 0.35)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
