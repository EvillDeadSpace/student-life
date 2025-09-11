"use client";

import Link from "next/link";
import { useState } from "react";

interface LinkComponentsProps {
  href: string;
  text: string;
  isMobile?: boolean;
  isActive?: boolean;
  className?: string;
}

export default function LinkComponents({
  href,
  text,
  isMobile = false,
  isActive = false,
  className,
}: LinkComponentsProps) {
  if (className) {
    return (
      <Link href={href} className={className}>
        {text}
      </Link>
    );
  }

  const baseClasses =
    "hover:text-teal-600 dark:hover:text-teal-400 rounded-md font-medium transition-colors";

  const activeClasses = "text-gray-900 dark:text-white";
  const inactiveClasses = "text-gray-600 dark:text-gray-300";

  const desktopClasses = "px-3 py-2 text-sm";
  const mobileClasses = "block px-3 py-2 text-base";

  const colorClasses = isActive ? activeClasses : inactiveClasses;
  const sizeClasses = isMobile ? mobileClasses : desktopClasses;

  const classes = `${baseClasses} ${colorClasses} ${sizeClasses}`;

  return (
    <Link href={href} className={classes}>
      {text}
    </Link>
  );
}

export function useMenuOpen() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return { isMenuOpen, toggleMenu };
}

// Mobile Menu Button komponenta
interface MobileMenuButtonProps {
  isMenuOpen: boolean;
  onClick: () => void;
}

export function MobileMenuButton({
  isMenuOpen,
  onClick,
}: MobileMenuButtonProps) {
  return (
    <div className='md:hidden'>
      <button
        onClick={onClick}
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
    </div>
  );
}
