import { useEffect, useRef, useState } from "react";
import logoImg from "../assets/logo.png";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  height?: number;
  variant?: "dark-bg" | "light-bg";
  animate?: boolean;
  className?: string;
}

export default function Logo({
  size = "md",
  height,
  variant = "dark-bg",
  animate = false,
  className = "",
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

  const presetHeights = {
    sm: 38,
    md: 52,
    lg: 72,
  };

  const finalHeight = height ?? presetHeights[size];

  return (
    <div
      className={`dalyou-logo flex items-center justify-center cursor-pointer select-none ${className}`}
    >
      <img
        src={logoImg}
        alt="Dalyou Logo"
        style={{
          height: finalHeight,
          width: "auto",
          objectFit: "contain",
          mixBlendMode: variant === "dark-bg" ? "lighten" : "normal",
          filter:
            variant === "light-bg" ? "invert(1) hue-rotate(180deg)" : "none",
          animation: ready
            ? "logoIconPop 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards"
            : "none",
          opacity: ready ? 1 : 0,
        }}
      />
    </div>
  );
}
