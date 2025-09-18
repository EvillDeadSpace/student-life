"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";

type CitySelectProps = {
  value?: string | null;
  onChange?: (city: string | null) => void;
  placeholder?: string;
};

const CITIES = [
  "Sarajevo",
  "Banja Luka",
  "Tuzla",
  "Zenica",
  "Mostar",
  "Bihać",
  "Brčko",
  "Trebinje",
  "Doboj",
  "Cazin",
];

export default function CitySelect({
  value = null,
  onChange,
  placeholder = "Izaberite grad",
}: CitySelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(value);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSelected(value ?? null);
  }, [value]);

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("click", onOutside);
    return () => window.removeEventListener("click", onOutside);
  }, []);

  const filtered = CITIES.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (city: string | null) => {
    setSelected(city);
    setOpen(false);
    setQuery("");
    onChange?.(city);
  };

  return (
    <div ref={containerRef} className='relative w-full max-w-xs'>
      <button
        type='button'
        aria-haspopup='listbox'
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className='w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow'
      >
        <div className='flex items-center gap-3'>
          <div className='w-3 h-3 rounded-full bg-teal-500' />
          <div className='text-left'>
            <div className='text-sm font-medium text-gray-900 dark:text-white'>
              {selected ?? (
                <span className='text-gray-500 dark:text-gray-400'>
                  {placeholder}
                </span>
              )}
            </div>
            <div className='text-xs text-gray-500 dark:text-gray-400'>
              Lokacija
            </div>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          {selected && (
            <span
              role='button'
              tabIndex={0}
              aria-label='Clear selection'
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSelect(null);
                }
              }}
              className='p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
            >
              <XMarkIcon className='w-4 h-4 dark:text-red-400' />
            </span>
          )}
          <ChevronDownIcon className='w-5 h-5 text-gray-500 dark:text-gray-300' />
        </div>
      </button>

      {open && (
        <div className='absolute z-20 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden'>
          <div className='p-3'>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Pretraži grad...'
              className='w-full px-3 py-2 rounded-md border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:outline-none'
            />
          </div>
          <ul role='listbox' tabIndex={-1} className='max-h-56 overflow-auto'>
            {filtered.length === 0 && (
              <li className='px-4 py-3 text-sm text-gray-500 dark:text-gray-400'>
                Nema rezultata
              </li>
            )}
            {filtered.map((city) => (
              <li
                key={city}
                onClick={() => handleSelect(city)}
                role='option'
                aria-selected={selected === city}
                className={`px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100 flex justify-between items-center ${
                  selected === city
                    ? "bg-gray-50 dark:bg-gray-700 font-semibold"
                    : ""
                }`}
              >
                <span>{city}</span>
                {selected === city && <span className='text-teal-500'>✓</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
