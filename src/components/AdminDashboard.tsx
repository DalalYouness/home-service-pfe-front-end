import React, { useState } from "react";
import {
  Search,
  Ban,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  UserX,
  UserPlus,
  ShieldCheck,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useUsers } from "../hooks/useUsers";
import { type RoleName } from "../types/admin";
import { AddAdminModal } from "./AddAdminModal"; // Import Modal

export const AdminDashboard: React.FC = () => {
  // 1. Hook Integration
  const {
    users,
    totalPages,
    totalElements,
    currentPage,
    loading,
    error,
    setPage,
    refetch,
  } = useUsers(0, 10);

  // State control pour le Modal Add Admin
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);

  // Search input state
  const [searchTerm, setSearchTerm] = useState("");

  // Client-side search sur la page actuelle
  const filteredUsers = users.filter((u) => {
    const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  // Helper pour vérifier le rôle ADMIN
  const isAdmin = (roles: RoleName[]) => {
    return roles.some((role) => role === "ROLE_ADMIN" || role === "ADMIN");
  };

  // Helper pour afficher les rôles
  const formatRoles = (roles: RoleName[]) => {
    return roles.map((r) => r.replace("ROLE_", "")).join(", ");
  };

  // Callback en cas de succès de la création d'un admin
  const handleAdminCreated = () => {
    refetch(); // Rafraîchir la liste après ajout
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
            Gérez les comptes d'utilisateurs et contrôlez les accès.
          </p>
        </div>

        {/* BUTTON ADD ADMIN */}
        <button
          onClick={() => setIsAddAdminOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-forest-800 hover:bg-forest-900 text-white font-medium text-sm rounded-xl shadow-xs transition-all cursor-pointer shrink-0 active:scale-[0.98]"
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
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par nom..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-100 text-sm transition-all"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 self-end sm:self-center">
          <span>
            Total:{" "}
            <strong className="text-forest-900 font-semibold">
              {totalElements}
            </strong>{" "}
            utilisateurs
          </span>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={refetch}
            className="underline font-semibold hover:text-red-800 cursor-pointer text-xs"
          >
            Réessayer
          </button>
        </div>
      )}

      {/* USERS TABLE */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-forest-50/50 border-b border-gray-100 text-xs font-semibold text-forest-800 uppercase tracking-wider">
                <th className="py-4 px-6">Utilisateur</th>
                <th className="py-4 px-6">Genre</th>
                <th className="py-4 px-6">Rôles</th>
                <th className="py-4 px-6">Statut</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Loader2 className="w-6 h-6 animate-spin text-forest-800" />
                      <span className="text-xs font-medium">
                        Chargement des données...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((u, index) => {
                  const hasAdminRole = isAdmin(u.roles);
                  const fullName = `${u.firstName} ${u.lastName}`;

                  return (
                    <tr
                      key={index}
                      className="hover:bg-cream-50/50 transition-colors"
                    >
                      {/* User Info */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-forest-800 text-white font-bold flex items-center justify-center text-sm shrink-0 uppercase">
                            {u.firstName ? u.firstName.charAt(0) : "U"}
                          </div>
                          <div>
                            <p className="font-semibold text-forest-900 leading-snug">
                              {fullName}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Gender */}
                      <td className="py-4 px-6 text-xs text-gray-600 font-medium">
                        {u.gender || "-"}
                      </td>

                      {/* Roles */}
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${
                            hasAdminRole
                              ? "bg-amber-500/10 text-amber-600 font-semibold"
                              : u.roles.includes("ROLE_PRESTATAIRE")
                                ? "bg-forest-100 text-forest-800"
                                : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {hasAdminRole && (
                            <ShieldCheck className="w-3.5 h-3.5" />
                          )}
                          {formatRoles(u.roles)}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        {u.accountStatus === "ACTIVE" ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                            <CheckCircle className="w-3.5 h-3.5" /> Actif
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 bg-red-50 px-2.5 py-1 rounded-lg">
                            <UserX className="w-3.5 h-3.5" /> Suspendu
                          </span>
                        )}
                      </td>

                      {/* Action Button */}
                      <td className="py-4 px-6 text-right">
                        {!hasAdminRole ? (
                          <button
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer ${
                              u.accountStatus === "ACTIVE"
                                ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200/60"
                                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60"
                            }`}
                          >
                            <Ban className="w-3.5 h-3.5" />
                            {u.accountStatus === "ACTIVE"
                              ? "Suspendre"
                              : "Activer"}
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400 italic">
                            Protection Admin
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
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
            <span className="font-semibold text-forest-900">
              {currentPage + 1}
            </span>{" "}
            sur{" "}
            <span className="font-semibold text-forest-900">
              {totalPages === 0 ? 1 : totalPages}
            </span>
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(Math.max(currentPage - 1, 0))}
              disabled={currentPage === 0 || loading}
              className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage + 1 >= totalPages || loading}
              className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* ADD ADMIN MODAL COMPONENT */}
      <AddAdminModal
        isOpen={isAddAdminOpen}
        onClose={() => setIsAddAdminOpen(false)}
        onSubmitSuccess={handleAdminCreated}
      />
    </div>
  );
};

export default AdminDashboard;
