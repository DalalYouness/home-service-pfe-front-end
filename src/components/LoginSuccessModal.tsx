import { useState, useEffect } from "react";
import { CheckCircle2, Sparkles, PartyPopper } from "lucide-react";

interface Props {
  firstName?: string;
  onDone: () => void;
}

export default function LoginSuccessModal({ firstName, onDone }: Props) {
  const [visible, setVisible] = useState(false);
  const [confetti, setConfetti] = useState<
    { id: number; x: number; delay: number; color: string; rotate: number }[]
  >([]);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));

    // Generate confetti
    const colors = [
      "#1e3d2d",
      "#2d5a43",
      "#4a7c64",
      "#f5f0e6",
      "#d4af37",
      "#22c55e",
    ];
    const pieces = Array.from({ length: 36 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: Math.random() * 360,
    }));
    setConfetti(pieces);
  }, []);

  const handleOk = () => {
    setVisible(false);
    setTimeout(onDone, 300);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-md"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
      />

      {/* Confetti layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confetti.map((c) => (
          <div
            key={c.id}
            className="absolute top-[-20px]"
            style={{
              left: `${c.x}%`,
              width: "8px",
              height: "14px",
              backgroundColor: c.color,
              borderRadius: "2px",
              animation: `confettiFall 1.6s ease-in ${c.delay}s forwards`,
              transform: `rotate(${c.rotate}deg)`,
            }}
          />
        ))}
      </div>

      {/* Card */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl p-10 max-w-sm w-full text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? "scale(1) translateY(0)"
            : "scale(0.85) translateY(30px)",
          transition: "all 0.45s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* Sparkles top */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2"
          style={{ animation: "sparklePulse 1.5s ease-in-out infinite" }}
        >
          <Sparkles size={22} className="text-amber-400 fill-amber-200" />
        </div>

        {/* Icon with rings */}
        <div className="relative w-20 h-20 mx-auto mb-5">
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-forest-200"
            style={{ animation: "ringPulse 1.8s ease-out infinite" }}
          />
          {/* Middle ring */}
          <div
            className="absolute inset-2 rounded-full border-2 border-forest-300"
            style={{ animation: "ringPulse 1.8s ease-out 0.3s infinite" }}
          />
          {/* Core */}
          <div
            className="absolute inset-4 rounded-full bg-forest-800 flex items-center justify-center"
            style={{
              animation:
                "iconBounce 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.1s both",
            }}
          >
            <CheckCircle2 size={28} className="text-white" />
          </div>
        </div>

        {/* Title */}
        <h2
          className="font-serif text-2xl font-bold text-[#1a1208] mb-2"
          style={{ animation: "textFadeUp 0.5s ease 0.3s both" }}
        >
          Connexion réussie !
        </h2>

        {/* Subtitle */}
        <p
          className="text-[14px] text-gray-600 mb-1 leading-relaxed"
          style={{ animation: "textFadeUp 0.5s ease 0.45s both" }}
        >
          {firstName ? (
            <>
              Bienvenue,{" "}
              <strong className="text-forest-800">{firstName}</strong> !
            </>
          ) : (
            <>Bienvenue sur dalyoo !</>
          )}
        </p>
        <p
          className="text-[13px] text-gray-400 mb-7"
          style={{ animation: "textFadeUp 0.5s ease 0.55s both" }}
        >
          Vous êtes maintenant connecté à votre espace.
        </p>

        {/* OK button */}
        <button
          onClick={handleOk}
          className="w-full py-3.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-semibold text-[14px] transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
          style={{ animation: "textFadeUp 0.5s ease 0.7s both" }}
        >
          <PartyPopper size={16} /> Accéder à mon espace
        </button>
      </div>
    </div>
  );
}
