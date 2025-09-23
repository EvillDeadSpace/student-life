// components/header/UserAuth.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { getUserFromStorage, type User } from "../../lib/api";
import LinkComponents from "./Link";
import Link from "next/link";
import { removeUserFromStorage } from "@/lib/Auth";
import { useRouter } from "next/navigation";

export default function UserAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = getUserFromStorage();
    setUser(userData);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const handleLogout = () => {
    removeUserFromStorage();
    setUser(null);
    setOpen(false);
    router.push("/");
  };

  if (!user) return <LinkComponents href='/login' text='Login/Registracija' />;

  const initial = (
    (user.ime && user.ime[0]) ||
    (user.prezime && user.prezime[0]) ||
    "U"
  ).toUpperCase();

  return (
    <div className='relative' ref={menuRef}>
      <button
        onClick={() => setOpen((s) => !s)}
        aria-haspopup='true'
        aria-expanded={open}
        className='inline-flex items-center gap-3 px-2 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-teal-400'
        title={`${user.ime} ${user.prezime}`}
      >
        <span className='flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-blue-600 text-white font-semibold'>
          {initial}
        </span>
        <span className='sr-only'>Otvori meni profila</span>
      </button>

      {open && (
        <div className='absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black/5 dark:ring-white/5 z-50'>
          <Link
            href='/profile'
            className='block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
            onClick={() => setOpen(false)}
          >
            Profil
          </Link>

          <button
            onClick={handleLogout}
            className='w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
