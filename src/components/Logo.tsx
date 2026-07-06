import { useEffect, useRef, useState } from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  animate?: boolean;
  light?: boolean;
}

export default function Logo({
  size = "md",
  animate = false,
  light = false,
}: LogoProps) {
  const [ready, setReady] = useState(!animate);
  const ran = useRef(false);

  useEffect(() => {
    if (animate && !ran.current) {
      ran.current = true;
      const t = setTimeout(() => setReady(true), 60);
      return () => clearTimeout(t);
    }
  }, [animate]);

  const iconPx = size === "sm" ? 30 : size === "md" ? 38 : 52;
  const fontPx = size === "sm" ? 15 : size === "md" ? 21 : 30;
  const radius = iconPx * 0.26;

  return (
    <div className="dalyoo-logo flex items-center gap-2.5 cursor-pointer select-none">
      {/* Icon badge */}
      <div
        className="logo-icon shrink-0 flex items-center justify-center"
        style={{
          width: iconPx,
          height: iconPx,
          borderRadius: radius,
          background: light
            ? "rgba(255,255,255,0.18)"
            : "linear-gradient(135deg, #1e3d2d 0%, #2d5a43 100%)",
          boxShadow: light
            ? "0 2px 8px rgba(0,0,0,0.12)"
            : "0 3px 12px rgba(30,61,45,0.35)",
          animation: ready
            ? "logoIconPop 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards"
            : "none",
          opacity: ready ? undefined : 0,
          transition: "box-shadow 0.25s, transform 0.25s",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: iconPx * 0.58, height: iconPx * 0.58 }}
        >
          {/* House body */}
          <path
            d="M12 2.5L2.5 10.5V21.5H8.5V15.5H15.5V21.5H21.5V10.5L12 2.5Z"
            fill="white"
            fillOpacity="0.97"
          />
          {/* Door */}
          <rect
            x="9.5"
            y="15.5"
            width="5"
            height="6"
            rx="1"
            fill="#1e3d2d"
            fillOpacity="0.45"
          />
          {/* Sparkle dot */}
          <circle cx="19.5" cy="5.5" r="1.2" fill="white" fillOpacity="0.55" />
          <circle cx="19.5" cy="5.5" r="0.5" fill="white" fillOpacity="0.9" />
          {/* Chimney */}
          <rect
            x="14.5"
            y="3"
            width="2.5"
            height="4"
            rx="0.5"
            fill="white"
            fillOpacity="0.6"
          />
        </svg>
      </div>

      {/* Wordmark */}
      <div
        className="logo-text"
        style={{
          animation: ready ? "logoTextSlide 0.4s ease 0.18s both" : "none",
          opacity: ready ? undefined : 0,
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: fontPx,
            letterSpacing: "-0.025em",
            color: light ? "#ffffff" : "#152b1f",
            lineHeight: 1,
          }}
        >
          daly
          <span
            style={{
              color: light ? "rgba(255,255,255,0.8)" : "#2d5a43",
            }}
          >
            oo
          </span>
        </span>
      </div>
    </div>
  );
}
