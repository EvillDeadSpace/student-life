"use client";

// Login form component for authentication
import { AcademicCapIcon } from "@heroicons/react/24/outline";

interface LoginFormProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

export default function LoginForm({ isLogin, setIsLogin }: LoginFormProps) {
  return (
    <>
      <div className='text-center mb-8 opacity-0 animate-fadeInUp'>
        <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl shadow-lg mb-4 transform hover:scale-105 transition-transform duration-300'>
          <AcademicCapIcon className='w-10 h-10 text-white' />
        </div>
        <h1 className='text-3xl font-bold bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent'>
          Student Life
        </h1>
        <p className='text-gray-600 dark:text-gray-400 mt-2'>
          Dobrodošli u našu zajednicu!
        </p>
      </div>

      {/* Auth Card */}
      <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90 border border-gray-200 dark:border-gray-700 overflow-hidden opacity-0 animate-fadeInUp delay-200'>
        {/* Tab Navigation */}
        <div className='flex'>
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-300 relative ${
              isLogin
                ? "text-teal-600 dark:text-teal-400 bg-gray-50 dark:bg-gray-700"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Prijavite se
            {isLogin && (
              <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-blue-600 transform scale-x-100 transition-transform duration-300'></div>
            )}
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-300 relative ${
              !isLogin
                ? "text-teal-600 dark:text-teal-400 bg-gray-50 dark:bg-gray-700"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Registrujte se
            {!isLogin && (
              <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-blue-600 transform scale-x-100 transition-transform duration-300'></div>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
