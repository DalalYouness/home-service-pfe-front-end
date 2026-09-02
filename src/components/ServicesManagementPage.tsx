import React, { useState } from "react";
import {
  Wrench,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
  FolderOpen,
  CheckCircle2,
} from "lucide-react";
import type { ServiceResponseDto } from "../types/categorie";

// Mock Data
const INITIAL_MOCK_SERVICES: ServiceResponseDto[] = [
  {
    id: 1,
    name: "Plomberie",
    description:
      "Réparation de fuites, installation de robinetterie et tuyauterie.",
  },
  {
    id: 2,
    name: "Électricité",
    description: "Installation électrique, dépannage de tableaux et prises.",
  },
  {
    id: 3,
    name: "Peinture",
    description: "Travaux de peinture intérieure et extérieure pour logements.",
  },
  {
    id: 4,
    name: "Jardinage",
    description:
      "Entretien d'espaces verts, taille de haies et tonte de gazon.",
  },
];

export const ServicesManagementPage: React.FC = () => {
  // States
  const [services, setServices] = useState<ServiceResponseDto[]>(
    INITIAL_MOCK_SERVICES,
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Selected Service State
  const [selectedService, setSelectedService] =
    useState<ServiceResponseDto | null>(null);

  // Form State
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Notification Banner Handler
  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // ----------------------------------------------------
  // Handlers for CRUD Operations (Mocking Backend Actions)
  // ----------------------------------------------------

  // 1. Ajouter un nouveau service
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newService: ServiceResponseDto = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
    };
    setServices([newService, ...services]);
    setIsAddOpen(false);
    setFormData({ name: "", description: "" });
    showNotification("Service ajouté avec succès !");
  };

  // Open Edit Modal
  const openEditModal = (service: ServiceResponseDto) => {
    setSelectedService(service);
    setFormData({ name: service.name, description: service.description || "" });
    setIsEditOpen(true);
  };

  // 2. Modifier un service existant
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    setServices(
      services.map((s) =>
        s.id === selectedService.id
          ? { ...s, name: formData.name, description: formData.description }
          : s,
      ),
    );
    setIsEditOpen(false);
    setSelectedService(null);
    setFormData({ name: "", description: "" });
    showNotification("Service modifié avec succès !");
  };

  // Open Delete Modal
  const openDeleteModal = (service: ServiceResponseDto) => {
    setSelectedService(service);
    setIsDeleteOpen(true);
  };

  // 3. Supprimer un service
  const handleDeleteConfirm = () => {
    if (!selectedService) return;

    setServices(services.filter((s) => s.id !== selectedService.id));
    setIsDeleteOpen(false);
    setSelectedService(null);
    showNotification("Service supprimé avec succès !");
  };

  // Filter Services by Search Input
  const filteredServices = services.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.description &&
        s.description.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <div className="w-full space-y-4 py-6 px-4 md:px-8 pb-16 font-sans">
      {/* Header Section (Style Mowa7ad) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-bold text-forest-800 tracking-tight flex items-center gap-2.5">
            Gestion des Services
          </h1>
          <p className="text-xs md:text-sm text-forest-700/70">
            Gérez la liste des services disponibles sur la plateforme.
          </p>
        </div>

        {/* Button: Ajouter un nouveau service */}
        <button
          onClick={() => {
            setFormData({ name: "", description: "" });
            setIsAddOpen(true);
          }}
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

      {/* Control Bar: Search Input */}
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
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-cream-200 rounded-2xl focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500 text-gray-700 placeholder-gray-400 transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Table Container (Lister les services) */}
      <div className="bg-white rounded-3xl border border-cream-200 shadow-card overflow-hidden">
        {filteredServices.length === 0 ? (
          <div className="p-12 text-center text-gray-400 space-y-3">
            <FolderOpen size={40} className="mx-auto text-gray-300" />
            <p className="text-base font-semibold text-gray-600">
              Aucun service trouvé
            </p>
            <p className="text-xs text-gray-400">
              {searchQuery
                ? "Aucun résultat ne correspond à votre recherche."
                : "La liste des services est actuellement vide."}
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
                        {/* Modifier */}
                        <button
                          onClick={() => openEditModal(service)}
                          className="p-2 rounded-xl text-gray-600 hover:text-forest-900 hover:bg-cream-100 transition-colors cursor-pointer"
                          title="Modifier"
                        >
                          <Pencil size={16} />
                        </button>
                        {/* Supprimer */}
                        <button
                          onClick={() => openDeleteModal(service)}
                          className="p-2 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Supprimer"
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

      {/* ========================================================
          MODAL 1: Ajouter un nouveau service
         ======================================================== */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-card p-6 border border-cream-200 animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsAddOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:bg-cream-50 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-forest-900 mb-4 flex items-center gap-2">
              <Plus className="text-forest-800" size={22} />
              Ajouter un nouveau service
            </h2>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  Nom du service
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Ex: Plomberie"
                  className="w-full px-4 py-2.5 text-sm bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl focus:outline-none focus:border-forest-500 text-gray-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Description détaillée du service..."
                  className="w-full px-4 py-2.5 text-sm bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl focus:outline-none focus:border-forest-500 text-gray-700 resize-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-5 py-2.5 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl text-xs font-semibold text-white bg-forest-900 hover:bg-forest-800 shadow-xs cursor-pointer"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: Modifier un service existant
         ======================================================== */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-card p-6 border border-cream-200 animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsEditOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:bg-cream-50 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-forest-900 mb-4 flex items-center gap-2">
              <Pencil className="text-forest-800" size={20} />
              Modifier le service
            </h2>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  Nom du service
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 text-sm bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl focus:outline-none focus:border-forest-500 text-gray-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2.5 text-sm bg-[#faf8f3] border border-[#e8dfc8] rounded-2xl focus:outline-none focus:border-forest-500 text-gray-700 resize-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-5 py-2.5 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl text-xs font-semibold text-white bg-forest-900 hover:bg-forest-800 shadow-xs cursor-pointer"
                >
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 3: Supprimer un service
         ======================================================== */}
      {isDeleteOpen && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-card p-6 border border-cream-200 animate-in fade-in zoom-in-95 duration-150 text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={24} />
            </div>

            <h2 className="text-lg font-bold text-gray-900">
              Confirmation de suppression
            </h2>
            <p className="text-xs text-gray-500 mt-2">
              Êtes-vous sûr de vouloir supprimer le service{" "}
              <span className="font-semibold text-forest-900">
                "{selectedService.name}"
              </span>{" "}
              ? Cette action est irréversible.
            </p>

            <div className="pt-6 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="px-5 py-2.5 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-6 py-2.5 rounded-2xl text-xs font-semibold text-white bg-red-600 hover:bg-red-700 shadow-xs cursor-pointer"
              >
                Confirmer la suppression
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesManagementPage;
