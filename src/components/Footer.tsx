import Logo from "./Logo";

const LINKS = {
  Services: [
    "Ménage",
    "Jardinage",
    "Bricolage",
    "Déménagement",
    "Garde d'enfants",
  ],
  Dalyoo: ["À propos", "Comment ça marche", "Blog"],
  Aide: ["Contact", "Confiance & sécurité", "Confidentialité"],
};

export default function Footer() {
  return (
    <footer className="bg-[#f5f0e6] border-t border-[#e0d8c4]">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="mb-4">
            <Logo size="sm" />
          </div>
          <p className="text-[13px] text-gray-600 leading-relaxed">
            La plateforme de services à domicile qui met la confiance au cœur de
            chaque prestation.
          </p>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([col, items]) => (
          <div key={col}>
            <h4 className="text-[13px] font-semibold text-[#1a1208] mb-4">
              {col}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {items.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[13px] text-gray-600 hover:text-forest-800 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-[#e0d8c4]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[12px] text-gray-500">
            © 2026 dalyoo. Tous droits réservés.
          </p>
          <p className="text-[12px] text-gray-400">Fait avec soin au Maroc</p>
        </div>
      </div>
    </footer>
  );
}
