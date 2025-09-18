import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6'>
      <div className='relative w-full max-w-4xl'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob' />
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000' />

        <div className='relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 flex flex-col md:flex-row items-center gap-8'>
          <div className='flex-1 text-center md:text-left'>
            <h1 className='text-8xl font-extrabold text-gray-900 dark:text-white leading-none'>
              404
            </h1>
            <h2 className='mt-2 text-2xl font-semibold text-gray-700 dark:text-gray-200'>
              Stranica nije pronađena
            </h2>
            <p className='mt-4 text-gray-500 dark:text-gray-300 max-w-xl'>
              Izgleda da stranica koju tražiš ne postoji ili je premještena.
              Možeš se vratiti na početnu stranicu ili potražiti sadržaj putem
              navigacije.
            </p>

            <div className='mt-6 flex items-center justify-center md:justify-start gap-4'>
              <Link
                href='/'
                className='inline-block px-6 py-3 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-medium shadow-md hover:opacity-95 transition-opacity'
              >
                Vrati se na početnu
              </Link>
              <Link
                href='/'
                className='inline-block px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200'
              >
                Pretraži
              </Link>
            </div>
          </div>

          <div className='flex-1 flex items-center justify-center'>
            {/* Decorative illustration */}
            <div className='w-64 h-64 rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center shadow-lg'>
              <svg
                width='140'
                height='140'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='#CBD5E1'
                  strokeWidth='1.5'
                />
                <path
                  d='M8 9h8M8 13h5'
                  stroke='#94A3B8'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <rect
                  x='7'
                  y='7'
                  width='10'
                  height='10'
                  rx='2'
                  stroke='#94A3B8'
                  strokeWidth='1.2'
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
