// components/ProfilSkeleton.tsx
// drt role f propes bach ila kan prestataire nzid box akhor
export default function ProfilSkeleton({ role }: { role?: string }) {
  return (
    <div className="w-full bg-white rounded-3xl overflow-hidden border border-[#e8dfc8] shadow-sm animate-pulse">
      {/* Header Banner & Avatar Skeleton */}
      <div className="relative bg-gray-200 h-32 w-full flex justify-center">
        <div className="absolute -bottom-14 flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-gray-300 border-4 border-white shadow-md"></div>
        </div>
      </div>

      {/* Profile Header Title Skeleton */}
      <div className="pt-16 pb-6 text-center px-4 border-b border-[#f2ece1] flex flex-col items-center gap-2">
        <div className="h-3 w-48 bg-gray-200 rounded-md"></div>
        <div className="h-6 w-36 bg-gray-300 rounded-md mt-1"></div>
        <div className="h-4 w-40 bg-gray-200 rounded-md mt-1"></div>
      </div>

      {/* Form Skeleton */}
      <div className="p-6 md:p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="h-6 w-48 bg-gray-300 rounded-md"></div>
          <div className="h-9 w-24 bg-gray-200 rounded-xl"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-16 bg-gray-100 border border-gray-200 rounded-2xl"></div>
          <div className="h-16 bg-gray-100 border border-gray-200 rounded-2xl"></div>
          <div className="md:col-span-2 h-16 bg-gray-100 border border-gray-200 rounded-2xl"></div>
          <div className="md:col-span-2 h-16 bg-gray-100 border border-gray-200 rounded-2xl"></div>
          <div className="h-16 bg-gray-100 border border-gray-200 rounded-2xl"></div>
          {role === "ROLE_PRESTATAIRE" && (
            <div className="h-16 bg-gray-100 border border-gray-200 rounded-2xl"></div>
          )}
          <div className="h-16 bg-gray-100 border border-gray-200 rounded-2xl"></div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="h-4 w-12 bg-gray-200 rounded-md"></div>
          <div className="h-24 bg-gray-100 border border-gray-200 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
}
