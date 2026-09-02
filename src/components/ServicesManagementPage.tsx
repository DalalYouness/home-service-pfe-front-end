import React, { useState } from "react";
import {
  Wrench,
  Plus,
  Search,
  Pencil,
  Trash2,
  FolderOpen,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { useServicesManager } from "../hooks/useServicesManager";
import { AddServiceModal } from "../components/AddServiceModal";
import { EditServiceModal } from "../components/EditServiceModal";
import type { ServiceResponseDto } from "../types/categorie";

export const ServicesManagementPage: React.FC = () => {
  const { services: initialServices, isLoadingServices } = useServicesManager();

  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedService, setSelectedService] =
    useState<ServiceResponseDto | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // Filter Services by Search Input
  const filteredServices = (initialServices || []).filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.description &&
        s.description.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <div className="w-full space-y-4 py-6 px-4 md:px-8 pb-16 font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-bold text-forest-800 tracking-tight flex items-center gap-2.5">
            <Wrench className="w-6 h-6 text-forest-800" />
            Gestion des Services
          </h1>
          <p className="text-xs md:text-sm text-forest-700/70">
            Gérez la liste des services disponibles sur la plateforme.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-forest-900 hover:bg-forest-800 text-white font-medium text-xs md:text-sm transition-all shadow-xs active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <Plus size={18} />
          <span>Nouveau Service</span>
        </button>
      </div>

      {/* Success Notification Banner */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 animate-in fade-in duration-200">
          <CheckCircle2 size={20} className="shrink-0 text-emerald-600" />
          <span className="text-xs md:text-sm font-medium">{successMsg}</span>
        </div>
      )}

      {/* Search Input */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <div className="relative w-full sm:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un service..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-cream-200 rounded-2xl focus:outline-none focus:border-forest-500 text-gray-700 transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl border border-cream-200 shadow-card overflow-hidden">
        {isLoadingServices ? (
          <div className="p-12 text-center text-gray-400 space-y-3">
            <RefreshCw
              size={32}
              className="animate-spin mx-auto text-forest-800"
            />
            <p className="text-sm font-medium text-gray-600">
              Chargement des services...
            </p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="p-12 text-center text-gray-400 space-y-3">
            <FolderOpen size={40} className="mx-auto text-gray-300" />
            <p className="text-base font-semibold text-gray-600">
              Aucun service trouvé
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#faf8f3] border-b border-cream-200 text-xs font-bold text-forest-900 uppercase tracking-wider">
                  <th className="py-4 px-6">ID</th>
                  <th className="py-4 px-6">Nom du service</th>
                  <th className="py-4 px-6">Description</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100 text-sm">
                {filteredServices.map((service) => (
                  <tr
                    key={service.id}
                    className="hover:bg-[#faf8f3]/60 transition-colors"
                  >
                    <td className="py-4 px-6 font-mono text-xs text-gray-500 font-bold">
                      #{service.id}
                    </td>
                    <td className="py-4 px-6 font-semibold text-forest-900">
                      {service.name}
                    </td>
                    <td className="py-4 px-6 text-gray-600 max-w-md truncate">
                      {service.description || "—"}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedService(service);
                            setIsEditOpen(true);
                          }}
                          className="p-2 rounded-xl text-gray-600 hover:text-forest-900 hover:bg-cream-100 transition-colors cursor-pointer"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedService(service);
                            setIsDeleteOpen(true);
                          }}
                          className="p-2 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* ---------------------------------------------------------------------- */}

      {/* ======================================================== */}
      {/* MODAL 1 : AJOUTER UN SERVICE                            */}
      {/* ======================================================== */}
      <AddServiceModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSuccess={(msg) => showNotification(msg)}
      />

      {/* ======================================================== */}
      {/* MODAL 2 : MODIFIER UN SERVICE                            */}
      {/* ======================================================== */}
      <EditServiceModal
        isOpen={isEditOpen}
        service={selectedService}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedService(null);
        }}
        onSuccess={(msg) => showNotification(msg)}
      />
    </div>
  );
  {
    /* ---------------------------------------------------------------------- */
  }
};

export default ServicesManagementPage;
