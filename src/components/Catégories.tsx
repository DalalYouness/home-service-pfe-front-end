import { useState, useEffect, useRef } from "react";
import {
  Wrench,
  Flower2,
  Truck,
  Sparkles,
  Baby,
  PawPrint,
  Monitor,
  Heart,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

const CATEGORIES = [
  {
    icon: Wrench,
    label: "Bricolage",
    desc: "Montage, fixation, petits travaux",
    color: "#1e3d2d",
    accent: "#4a7c64",
  },
  {
    icon: Flower2,
    label: "Jardinage",
    desc: "Tonte, élagage, entretien extérieur",
    color: "#2d5a43",
    accent: "#6b9b7f",
  },
  {
    icon: Truck,
    label: "Déménagement",
    desc: "Transport, emballage, chargement",
    color: "#1e3d2d",
    accent: "#4a7c64",
  },
  {
    icon: Sparkles,
    label: "Ménage",
    desc: "Nettoyage, repassage, vitres",
    color: "#2d5a43",
    accent: "#6b9b7f",
  },
  {
    icon: Baby,
    label: "Enfants",
    desc: "Garde, sorties d'école, aide",
    color: "#1e3d2d",
    accent: "#4a7c64",
  },
  {
    icon: PawPrint,
    label: "Animaux",
    desc: "Promenade, soins, pension",
    color: "#2d5a43",
    accent: "#6b9b7f",
  },
  {
    icon: Monitor,
    label: "Informatique",
    desc: "Réparation, installation, support",
    color: "#1e3d2d",
    accent: "#4a7c64",
  },
  {
    icon: Heart,
    label: "Aide à domicile",
    desc: "Accompagnement, courses, repas",
    color: "#2d5a43",
    accent: "#6b9b7f",
  },
  {
    icon: GraduationCap,
    label: "Cours particuliers",
    desc: "Maths, langues, sciences",
    color: "#1e3d2d",
    accent: "#4a7c64",
  },
];

export default function Categories() {
  const [visible, setVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Reveal on scroll into view
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 px-6 bg-[#f5f0e6] relative overflow-hidden"
    >
      {/* Decorative background orbs */}
      <div
        className="absolute top-10 -left-20 w-72 h-72 rounded-full opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(45,90,67,0.15) 0%, transparent 70%)",
          animation: visible ? "orbFloat 8s ease-in-out infinite" : "none",
        }}
      />
      <div
        className="absolute bottom-10 -right-20 w-80 h-80 rounded-full opacity-25 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(30,61,45,0.12) 0%, transparent 70%)",
          animation: visible
            ? "orbFloat 10s ease-in-out infinite reverse"
            : "none",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="text-xs font-semibold uppercase tracking-widest text-forest-700 mb-3"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(15px)",
              transition: "all 0.5s ease",
            }}
          >
            Nos catégories
          </p>
          <h2
            className="font-serif text-4xl lg:text-5xl font-bold text-[#1a1208] mb-3"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s cubic-bezier(0.34,1.1,0.64,1) 0.1s",
            }}
          >
            Trouvez de l'aide pour chaque tâche
          </h2>
          <p
            className="text-[15px] text-gray-600 max-w-xl mx-auto"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(15px)",
              transition: "all 0.6s ease 0.2s",
            }}
          >
            Explorez nos services à domicile et bien plus. Chaque catégorie
            regroupe des prestataires vérifiés, prêts à intervenir.
          </p>
        </div>

        {/* Grid — bento layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, idx) => {
            const isHovered = hoveredIdx === idx;
            const isDimmed = hoveredIdx !== null && !isHovered;

            return (
              <button
                key={cat.label}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group relative bg-white border border-[#e5ddd0] rounded-3xl p-6 text-left overflow-hidden transition-all duration-500"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible
                    ? "translateY(0) scale(1)"
                    : "translateY(40px) scale(0.95)",
                  transition: `all 0.6s cubic-bezier(0.34,1.1,0.64,1) ${idx * 80}ms`,
                  boxShadow: isHovered
                    ? "0 20px 50px -10px rgba(30,61,45,0.25)"
                    : "0 1px 3px rgba(0,0,0,0.04)",
                  borderColor: isHovered ? cat.color : "#e5ddd0",
                  filter: isDimmed ? "brightness(0.97) saturate(0.8)" : "none",
                }}
              >
                {/* Animated gradient background on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 30% 20%, ${cat.color}10 0%, transparent 60%)`,
                  }}
                />

                {/* Floating decorative circle */}
                <div
                  className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-700 group-hover:scale-110"
                  style={{
                    background: `radial-gradient(circle, ${cat.accent}25 0%, transparent 70%)`,
                    transform: isHovered ? "scale(1.2)" : "scale(0.8)",
                  }}
                />

                <div className="relative flex items-start gap-4">
                  {/* Icon orb with rotating ring */}
                  <div className="relative shrink-0">
                    {/* Rotating dashed ring */}
                    <div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        border: `1.5px dashed ${cat.color}40`,
                        animation: isHovered
                          ? "spinRing 4s linear infinite"
                          : "none",
                        opacity: isHovered ? 1 : 0,
                        transition: "opacity 0.3s ease",
                      }}
                    />
                    {/* Icon container */}
                    <div
                      className="relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500"
                      style={{
                        backgroundColor: isHovered
                          ? cat.color
                          : `${cat.color}12`,
                        transform: isHovered
                          ? "scale(1.1) rotate(-5deg)"
                          : "scale(1) rotate(0)",
                      }}
                    >
                      <cat.icon
                        size={24}
                        className="transition-all duration-500"
                        style={{
                          color: isHovered ? "#fff" : cat.color,
                          transform: isHovered ? "scale(1.1)" : "scale(1)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0 pt-1">
                    <h3
                      className="font-serif text-lg font-bold mb-1 transition-colors duration-300"
                      style={{ color: isHovered ? cat.color : "#1a1208" }}
                    >
                      {cat.label}
                    </h3>
                    <p
                      className="text-[12.5px] leading-relaxed transition-all duration-300"
                      style={{
                        color: isHovered ? "#4b5563" : "#9ca3af",
                        opacity: isHovered ? 1 : 0.7,
                      }}
                    >
                      {cat.desc}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div
                    className="shrink-0 mt-1 transition-all duration-400"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered
                        ? "translateX(0)"
                        : "translateX(-8px)",
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: cat.color }}
                    >
                      <ArrowRight size={13} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Bottom progress bar — fills on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
                  <div
                    className="h-full transition-all duration-700 ease-out"
                    style={{
                      width: isHovered ? "100%" : "0%",
                      background: `linear-gradient(90deg, ${cat.color}, ${cat.accent})`,
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className="text-center mt-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease 0.6s",
          }}
        >
          <button className="inline-flex items-center gap-2 bg-forest-800 hover:bg-forest-900 text-white font-semibold text-[14px] px-7 py-3.5 rounded-full transition-all duration-200 active:scale-[0.97] group">
            Voir tous les services
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
