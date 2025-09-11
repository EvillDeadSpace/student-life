"use client";

import { useState } from "react";
import LinkComponents from "./Link";

export default function MobileMenuToggle() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='md:hidden'>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:text-gray-900 dark:focus:text-white'
      >
        <svg
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          {isMenuOpen ? (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          ) : (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          )}
        </svg>
      </button>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className='absolute top-16 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            <LinkComponents
              href='/'
              text='Pocetna'
              isMobile={true}
              isActive={true}
            />
            <LinkComponents
              href='/kategorije'
              text='Kategorije'
              isMobile={true}
            />
            <LinkComponents
              href='/dodaj-iskustvo'
              text='Dodaj iskustvo'
              isMobile={true}
            />
            <LinkComponents
              href='/login'
              text='Login/Registracija'
              isMobile={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}
