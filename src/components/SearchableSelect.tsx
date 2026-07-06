import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Loader2 } from "lucide-react";

interface SearchableSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder: string;
  loading?: boolean;
  disabled?: boolean;
  error?: boolean;
  emptyText?: string;
}

export default function SearchableSelect({
  options,
  value,
  onChange,
  onBlur,
  placeholder,
  loading = false,
  disabled = false,
  error = false,
  emptyText = "Aucun résultat",
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = query.trim()
    ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))
    : options;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setQuery("");
        onBlur?.();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onBlur]);

  const handleSelect = (opt: string) => {
    onChange(opt);
    setOpen(false);
    setQuery("");
    onBlur?.();
  };

  const handleToggle = () => {
    if (disabled || loading) return;
    setOpen((p) => {
      if (!p) {
        setTimeout(() => inputRef.current?.focus(), 0);
      }
      return !p;
    });
    setQuery("");
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={handleToggle}
        className="w-full flex items-center justify-between pl-10 pr-3 py-3 text-[14px] text-left bg-[#faf8f4] border rounded-xl outline-none transition-all duration-200 hover:border-[#c8bfad]"
        style={{
          borderColor: error ? "#f87171" : open ? "#2d5a43" : "#e0d8c4",
          boxShadow: open ? "0 0 0 3px rgba(45,90,67,0.10)" : "none",
          color: value ? "#1f2937" : "#9ca3af",
          cursor: disabled || loading ? "not-allowed" : "pointer",
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <span className="truncate">{value || placeholder}</span>
        {loading ? (
          <Loader2 size={15} className="text-gray-400 animate-spin shrink-0" />
        ) : (
          <ChevronDown
            size={15}
            className="text-gray-400 shrink-0 transition-transform duration-200"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        )}
      </button>

      {/* Dropdown */}
      {open && !loading && (
        <div
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 bg-white border border-[#e5ddd0] rounded-xl shadow-card-hover overflow-hidden"
          style={{ animation: "dropdownIn 0.18s ease-out" }}
        >
          {/* Search input inside dropdown */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[#f0e9d8]">
            <Search size={14} className="text-gray-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher..."
              className="flex-1 text-[13px] text-gray-800 placeholder-gray-400 bg-transparent outline-none"
            />
          </div>

          {/* List */}
          <ul
            ref={listRef}
            className="max-h-48 overflow-y-auto py-1"
            style={{ scrollbarWidth: "thin" }}
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-3 text-[13px] text-gray-400 text-center">
                {emptyText}
              </li>
            ) : (
              filtered.slice(0, 150).map((opt) => (
                <li key={opt}>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelect(opt);
                    }}
                    className="w-full text-left px-3.5 py-2.5 text-[13px] transition-colors duration-100 hover:bg-[#f5f0e6]"
                    style={{
                      color: opt === value ? "#1e3d2d" : "#374151",
                      fontWeight: opt === value ? 600 : 400,
                      backgroundColor: opt === value ? "#eef3f0" : undefined,
                    }}
                  >
                    {opt}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
