import { useEffect } from "react";
import { CheckCircle, PartyPopper } from "lucide-react";

interface LoginSuccessToastProps {
  message: string;
  fullname: string;
  onDurationEnd: () => void;
}

export default function LoginSuccessToast({
  message,
  fullname,
  onDurationEnd,
}: LoginSuccessToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDurationEnd();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onDurationEnd]);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-4 bg-emerald-50 border border-emerald-200 p-5 rounded-2xl shadow-lg animate-in slide-in-from-bottom-5 fade-in duration-300 max-w-sm">
      <div className="bg-emerald-500 text-white p-2.5 rounded-xl shrink-0 shadow-sm">
        <CheckCircle size={24} />
      </div>
      <div className="flex-1">
        <h4 className="font-sans font-bold text-emerald-950 flex items-center gap-1.5 text-base">
          Bienvenue, {fullname} !{" "}
          <PartyPopper size={18} className="text-emerald-600" />
        </h4>
        <p className="text-sm text-emerald-800 font-medium mt-0.5">{message}</p>
      </div>
    </div>
  );
}
