"use client";
import React from "react";
import Link from "next/link";
import { User } from "@/lib/api";
import { PencilIcon } from "@heroicons/react/24/outline";

type Props = {
  user: User | null;
  onLogout: () => void;
};

export default function ProfileCard({ user, onLogout }: Props) {
  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg animate-fadeInUp'>
      <div className='flex items-center space-x-4'>
        <div className='w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white text-2xl font-bold'>
          {user ? (user.ime?.[0] ?? "U") + (user.prezime?.[0] ?? "") : "U"}
        </div>
        <div className='flex-1'>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
            {user
              ? `${user.ime ?? ""} ${user.prezime ?? ""}`
              : "Nepoznat korisnik"}
          </h2>
          <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>
            {user?.email ?? "-"}
          </p>
          <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
            {user?.lokacija ?? "Nije navedena lokacija"}
          </p>
        </div>
      </div>

      <div className='mt-6 grid grid-cols-2 gap-3'>
        <Link
          href='/profile/edit'
          className='inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 text-white font-medium shadow hover:scale-[1.02] transition-transform'
        >
          <PencilIcon className='w-4 h-4 mr-2' /> Uredi profil
        </Link>
        <button
          onClick={onLogout}
          className='inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'
        >
          Logout
        </button>
      </div>

      <div className='mt-6 border-t border-gray-100 dark:border-gray-700 pt-4'>
        <div className='text-sm text-gray-600 dark:text-gray-300'>
          Korisničke informacije
        </div>
        <dl className='mt-3 grid grid-cols-1 gap-2 text-sm text-gray-700 dark:text-gray-300'>
          <div className='flex justify-between'>
            <dt className='text-gray-500'>Ime</dt>
            <dd>{user?.ime ?? "-"}</dd>
          </div>
          <div className='flex justify-between'>
            <dt className='text-gray-500'>Prezime</dt>
            <dd>{user?.prezime ?? "-"}</dd>
          </div>
          <div className='flex justify-between'>
            <dt className='text-gray-500'>Email</dt>
            <dd>{user?.email ?? "-"}</dd>
          </div>
          <div className='flex justify-between'>
            <dt className='text-gray-500'>Lokacija</dt>
            <dd>{user?.lokacija ?? "-"}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
