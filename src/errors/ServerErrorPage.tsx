import React from "react";
import { useNavigate } from "react-router-dom";

import serverErrorImg from "../assets/serverErrorImg.svg";

const ServerErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <section className="min-h-screen bg-[#FDFBF7] text-[#1B3B2B] flex items-center justify-center px-6 py-12 font-sans">
      <div className="max-w-xl w-full text-center space-y-8">
        <div className="flex justify-center">
          <img
            src={serverErrorImg}
            alt="Internal Server Error 500"
            className="w-full max-w-[360px] h-auto object-contain animate-fade-in"
          />
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1B3B2B]">
            Erreur interne du serveur
          </h1>
          <p className="text-sm md:text-base text-[#4A5D4E] max-w-sm mx-auto leading-relaxed">
            Un problème inattendu est survenu de notre côté. Nos équipes
            techniques travaillent activement à sa résolution.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
          <button
            onClick={handleRetry}
            className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-[#1B3B2B] bg-[#F4F0E6] hover:bg-[#E6DCD0] rounded-full transition-all duration-200"
          >
            Réessayer l'opération
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

export default ServerErrorPage;
