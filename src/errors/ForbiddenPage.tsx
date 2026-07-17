import React from "react";
import { useNavigate } from "react-router-dom";
import forbiddenImg from "../assets/forbiddenImg.svg";

const ForbiddenPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-[#FDFBF7] text-[#1B3B2B] flex items-center justify-center px-6 py-12 font-sans">
      <div className="max-w-xl w-full text-center space-y-8">
        {/* 🍏 Pure English Comments: LinkedIn-style clear flat illustration container */}
        <div className="flex justify-center">
          <img
            src={forbiddenImg}
            alt="Access Denied Security Restriction"
            className="w-full max-w-[360px] h-auto object-contain animate-fade-in"
          />
        </div>

        {/* 🍏 Pure English Comments: Clean Typography with LinkedIn style phrasing translated to French */}
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1B3B2B]">
            Cette page est restreinte
          </h1>
          <p className="text-sm md:text-base text-[#4A5D4E] max-w-sm mx-auto leading-relaxed">
            Votre profil ne possède pas les autorisations ou les rôles
            nécessaires pour accéder à cette zone sécurisée.
          </p>
        </div>

        {/* 🍏 Pure English Comments: Minimalist rounded action buttons matching the layout */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-[#1B3B2B] bg-transparent hover:bg-[#F4F0E6] border border-[#1B3B2B] border-opacity-30 rounded-full transition-all duration-200"
          >
            Retourner en arrière
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-[#FDFBF7] bg-[#1B3B2B] hover:bg-[#153022] rounded-full shadow-sm transition-all duration-200"
          >
            Aller au tableau de bord
          </button>
        </div>
      </div>
    </section>
  );
};

export default ForbiddenPage;
