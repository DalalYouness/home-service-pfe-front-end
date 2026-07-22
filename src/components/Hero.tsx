import { Search, ShieldCheck, Star } from "lucide-react";
import { useState, useEffect } from "react";

const SLIDES = [
  {
    url: "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=900",
    label: "Jardinage",
    caption: "Entretien de jardin",
  },
  {
    url: "https://images.pexels.com/photos/5905702/pexels-photo-5905702.jpeg?auto=compress&cs=tinysrgb&w=900",
    label: "Cours particuliers",
    caption: "Aide aux devoirs à domicile",
  },
  {
    url: "https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=900",
    label: "Déménagement",
    caption: "Transport & déménagement",
  },
];

export default function Hero() {
  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % SLIDES.length);
        setFading(false);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index: number) => {
    if (index === current) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
    }, 400);
  };

  return (
    <section className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left content */}
        <div className="flex-1 max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-[#e0d8c4] rounded-full px-4 py-2 mb-8 shadow-sm">
            <ShieldCheck size={15} className="text-forest-700" />
            <span className="text-xs font-medium text-gray-700">
              Prestataires vérifiés & assurés
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-5xl lg:text-6xl font-bold leading-[1.1] text-[#1a1208] mb-5">
            Réservez le
            <br />
            prestataire idéal
          </h1>

          {/* Sub */}
          <p className="text-[15px] leading-relaxed text-gray-600 mb-8 max-w-md">
            Des milliers de professionnels de confiance pour vos services à
            domicile et au-delà. Bricolage, ménage, cours, déménagement —
            dites-nous ce dont vous avez besoin, on s'occupe du reste.
          </p>

          {/* Search */}
          <div className="flex items-center gap-0 bg-white border border-[#ddd5bf] rounded-xl shadow-card overflow-hidden mb-5">
            <div className="flex items-center gap-2 pl-4 flex-1">
              <Search size={17} className="text-gray-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="De quel service avez-vous besoin ?"
                className="w-full py-3.5 text-[14px] text-gray-800 placeholder-gray-400 bg-transparent outline-none"
              />
            </div>
            <button className="m-1.5 px-6 py-3 bg-forest-800 hover:bg-forest-900 text-white text-[13px] font-semibold rounded-lg transition-colors shrink-0">
              Rechercher
            </button>
          </div>
        </div>

        {/* Right — slideshow */}
        <div className="flex-1 max-w-md w-full">
          <div className="relative rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.14)]">
            {/* Image */}
            <div className="relative h-[480px]">
              <img
                key={current}
                src={SLIDES[current].url}
                alt={SLIDES[current].caption}
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{
                  opacity: fading ? 0 : 1,
                  transition: "opacity 0.4s ease-in-out",
                }}
              />

              {/* Service label pill */}
              <div
                className="absolute top-4 left-4"
                style={{
                  opacity: fading ? 0 : 1,
                  transition: "opacity 0.4s ease-in-out",
                }}
              >
                <span className="inline-flex items-center bg-forest-800/90 backdrop-blur-sm text-white text-[12px] font-semibold px-3 py-1.5 rounded-full">
                  {SLIDES[current].label}
                </span>
              </div>
            </div>

            {/* Rating overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center justify-between shadow-card">
              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Slide ${i + 1}`}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? 18 : 7,
                      height: 7,
                      backgroundColor: i === current ? "#1e3d2d" : "#c8bfad",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Caption */}
          <p
            className="text-center text-[12px] text-gray-500 mt-3 font-medium tracking-wide"
            style={{
              opacity: fading ? 0 : 1,
              transition: "opacity 0.4s ease-in-out",
            }}
          >
            {SLIDES[current].caption}
          </p>
        </div>
      </div>
    </section>
  );
}
