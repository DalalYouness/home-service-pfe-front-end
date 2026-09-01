import React, { useState, useMemo } from "react";
import {
  Search,
  Ban,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  UserX,
  ShieldAlert,
  UserPlus,
  X,
  ShieldCheck,
} from "lucide-react";

// 1. Types & Mock Data
interface User {
  id: number;
  fullName: string;
  email: string;
  role: "CLIENT" | "PRESTATAIRE" | "ADMIN";
  status: "ACTIVE" | "BLOCKED";
  reclamationsCount: number;
}

const MOCK_USERS: User[] = [
  {
    id: 1,
    fullName: "Youness Dalal",
    email: "youness@example.com",
    role: "ADMIN",
    status: "ACTIVE",
    reclamationsCount: 0,
  },
  {
    id: 2,
    fullName: "Amine Bennani",
    email: "amine@example.com",
    role: "CLIENT",
    status: "ACTIVE",
    reclamationsCount: 3,
  },
  {
    id: 3,
    fullName: "Sarah Mansouri",
    email: "sarah@example.com",
    role: "PRESTATAIRE",
    status: "BLOCKED",
    reclamationsCount: 5,
  },
  {
    id: 4,
    fullName: "Karim Idrissi",
    email: "karim@example.com",
    role: "CLIENT",
    status: "ACTIVE",
    reclamationsCount: 1,
  },
  {
    id: 5,
    fullName: "Fatima Zahra Tazi",
    email: "fz.tazi@example.com",
    role: "PRESTATAIRE",
    status: "ACTIVE",
    reclamationsCount: 0,
  },
  {
    id: 6,
    fullName: "Omar El Amrani",
    email: "omar@example.com",
    role: "CLIENT",
    status: "ACTIVE",
    reclamationsCount: 0,
  },
  {
    id: 7,
    fullName: "Siham Toumi",
    email: "siham@example.com",
    role: "PRESTATAIRE",
    status: "ACTIVE",
    reclamationsCount: 2,
  },
  {
    id: 8,
    fullName: "Mehdi Chraibi",
    email: "mehdi@example.com",
    role: "CLIENT",
    status: "BLOCKED",
    reclamationsCount: 4,
  },
  {
    id: 9,
    fullName: "Houda Alami",
    email: "houda@example.com",
    role: "PRESTATAIRE",
    status: "ACTIVE",
    reclamationsCount: 0,
  },
  {
    id: 10,
    fullName: "Youssef Filali",
    email: "youssef@example.com",
    role: "CLIENT",
    status: "ACTIVE",
    reclamationsCount: 0,
  },
  {
    id: 11,
    fullName: "Nadia Berrada",
    email: "nadia@example.com",
    role: "CLIENT",
    status: "ACTIVE",
    reclamationsCount: 1,
  },
  {
    id: 12,
    fullName: "Reda Saadi",
    email: "reda@example.com",
    role: "PRESTATAIRE",
    status: "ACTIVE",
    reclamationsCount: 0,
  },
  {
    id: 13,
    fullName: "Laila Zeroual",
    email: "laila@example.com",
    role: "CLIENT",
    status: "BLOCKED",
    reclamationsCount: 6,
  },
  {
    id: 14,
    fullName: "Hamza Naciri",
    email: "hamza@example.com",
    role: "PRESTATAIRE",
    status: "ACTIVE",
    reclamationsCount: 0,
  },
  {
    id: 15,
    fullName: "Khadija Benjelloun",
    email: "khadija@example.com",
    role: "CLIENT",
    status: "ACTIVE",
    reclamationsCount: 0,
  },
  {
    id: 16,
    fullName: "Othmane Bouzid",
    email: "othmane@example.com",
    role: "PRESTATAIRE",
    status: "ACTIVE",
    reclamationsCount: 2,
  },
  {
    id: 17,
    fullName: "Meryem Kabbaj",
    email: "meryem@example.com",
    role: "CLIENT",
    status: "ACTIVE",
    reclamationsCount: 0,
  },
  {
    id: 18,
    fullName: "Anass Jabri",
    email: "anass@example.com",
    role: "PRESTATAIRE",
    status: "BLOCKED",
    reclamationsCount: 4,
  },
  {
    id: 19,
    fullName: "Sanae Sefrioui",
    email: "sanae@example.com",
    role: "CLIENT",
    status: "ACTIVE",
    reclamationsCount: 0,
  },
  {
    id: 20,
    fullName: "Bilal Rhazi",
    email: "bilal@example.com",
    role: "PRESTATAIRE",
    status: "ACTIVE",
    reclamationsCount: 1,
  },
  {
    id: 21,
    fullName: "Zineb Bennis",
    email: "zineb@example.com",
    role: "CLIENT",
    status: "ACTIVE",
    reclamationsCount: 0,
  },
  {
    id: 22,
    fullName: "Walid Zaki",
    email: "walid@example.com",
    role: "PRESTATAIRE",
    status: "ACTIVE",
    reclamationsCount: 0,
  },
];

export const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // State pour Modal Ajouter Admin
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // Toggle user block status
  const handleToggleBlock = (id: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "ACTIVE" ? "BLOCKED" : "ACTIVE" }
          : u,
      ),
    );
  };

  // Handle Add Admin Form Submit
  const handleAddAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdmin.fullName || !newAdmin.email) return;

    const createdAdmin: User = {
      id: Date.now(),
      fullName: newAdmin.fullName,
      email: newAdmin.email,
      role: "ADMIN",
      status: "ACTIVE",
      reclamationsCount: 0,
    };

    setUsers((prev) => [createdAdmin, ...prev]);
    setNewAdmin({ fullName: "", email: "", password: "" });
    setIsModalOpen(false);
  };

  // Filtered users by search name
  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      u.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [users, searchTerm]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const currentUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-forest-900 tracking-tight">
            Gestion des Utilisateurs
          </h1>
          <p className="text-sm md:text-base text-gray-500 font-normal mt-1">
            Gérez les comptes d'utilisateurs, examinez les réclamations et
            contrôlez les accès.
          </p>
        </div>

        {/* BUTTON ADD ADMIN */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-forest-800 hover:bg-forest-900 text-white font-medium text-sm rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          Ajouter un administrateur
        </button>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-card">
        <div className="relative w-full sm:w-80">
          <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Rechercher par nom..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-100 text-sm transition-all"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 self-end sm:self-center">
          <span>
            Total:{" "}
            <strong className="text-forest-900 font-semibold">
              {filteredUsers.length}
            </strong>{" "}
            utilisateurs
          </span>
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-forest-50/50 border-b border-gray-100 text-xs font-semibold text-forest-800 uppercase tracking-wider">
                <th className="py-4 px-6">Utilisateur</th>
                <th className="py-4 px-6">Rôle</th>
                <th className="py-4 px-6">Réclamations</th>
                <th className="py-4 px-6">Statut</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {currentUsers.length > 0 ? (
                currentUsers.map((u) => (
                  <tr
                    key={u.id}
                    className="hover:bg-cream-50/50 transition-colors"
                  >
                    {/* User Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-forest-800 text-white font-bold flex items-center justify-center text-sm shrink-0">
                          {u.fullName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-forest-900 leading-snug">
                            {u.fullName}
                          </p>
                          <p className="text-xs text-gray-400">{u.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${
                          u.role === "ADMIN"
                            ? "bg-amber-500/10 text-amber-600 font-semibold"
                            : u.role === "PRESTATAIRE"
                              ? "bg-forest-100 text-forest-800"
                              : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {u.role === "ADMIN" && (
                          <ShieldCheck className="w-3.5 h-3.5" />
                        )}
                        {u.role}
                      </span>
                    </td>

                    {/* Reclamations */}
                    <td className="py-4 px-6">
                      {u.reclamationsCount > 0 ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-600">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          {u.reclamationsCount} signalement(s)
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">Aucune</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      {u.status === "ACTIVE" ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                          <CheckCircle className="w-3.5 h-3.5" /> Actif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 bg-red-50 px-2.5 py-1 rounded-lg">
                          <UserX className="w-3.5 h-3.5" /> Bloqué
                        </span>
                      )}
                    </td>

                    {/* Action Button */}
                    <td className="py-4 px-6 text-right">
                      {u.role !== "ADMIN" ? (
                        <button
                          onClick={() => handleToggleBlock(u.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer ${
                            u.status === "ACTIVE"
                              ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200/60"
                              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60"
                          }`}
                        >
                          <Ban className="w-3.5 h-3.5" />
                          {u.status === "ACTIVE" ? "Bloquer" : "Débloquer"}
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400 italic">
                          Protection Admin
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400">
                    Aucun utilisateur trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Page{" "}
            <span className="font-semibold text-forest-900">{currentPage}</span>{" "}
            sur{" "}
            <span className="font-semibold text-forest-900">{totalPages}</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL ADD ADMIN */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-forest-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-forest-800" />
                Nouveau Administrateur
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAdminSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Nom Complet
                </label>
                <input
                  type="text"
                  required
                  value={newAdmin.fullName}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, fullName: e.target.value })
                  }
                  placeholder="Ex: Amine Bennani"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-100 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Adresse Email
                </label>
                <input
                  type="email"
                  required
                  value={newAdmin.email}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, email: e.target.value })
                  }
                  placeholder="Ex: admin@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-100 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
                  required
                  value={newAdmin.password}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-100 text-sm"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-forest-800 text-white hover:bg-forest-900 transition-all shadow-xs cursor-pointer"
                >
                  Créer le compte
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
