"use client";

import { useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import type { FC } from "react";

const Auth: FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 bg-grid-pattern flex items-center justify-center p-4'>
      {/* Background decorations */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000'></div>
      </div>

      {/* Main Auth Card */}
      <div className='relative w-full max-w-md'>
        {/* Logo/Brand Section */}
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

          {/* Form Content */}
          <div className='p-8'>
            <form className='space-y-6'>
              {/* Name fields (only for registration) */}
              {!isLogin && (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='relative'>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                      Ime
                    </label>
                    <div className='relative'>
                      <UserIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                      <input
                        type='text'
                        className='w-full pl-10 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300'
                        placeholder='Vaše ime'
                      />
                    </div>
                  </div>
                  <div className='relative'>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                      Prezime
                    </label>
                    <div className='relative'>
                      <UserIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                      <input
                        type='text'
                        className='w-full pl-10 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300'
                        placeholder='Vaše prezime'
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Email field */}
              <div className='relative'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Email adresa
                </label>
                <div className='relative'>
                  <EnvelopeIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                  <input
                    type='email'
                    className='w-full pl-10 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300'
                    placeholder='vas@email.com'
                  />
                </div>
              </div>

              {/* Password field */}
              <div className='relative opacity-0 animate-fadeInLeft delay-500'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Lozinka
                </label>
                <div className='relative'>
                  <LockClosedIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                  <input
                    type={showPassword ? "text" : "password"}
                    className='w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500'
                    placeholder='••••••••'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors'
                  >
                    {showPassword ? (
                      <EyeSlashIcon className='w-5 h-5' />
                    ) : (
                      <EyeIcon className='w-5 h-5' />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password (only for registration) */}
              {!isLogin && (
                <div className='relative opacity-0 animate-fadeInLeft delay-600'>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                    Potvrdite lozinku
                  </label>
                  <div className='relative'>
                    <LockClosedIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className='w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500'
                      placeholder='••••••••'
                    />
                    <button
                      type='button'
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors'
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className='w-5 h-5' />
                      ) : (
                        <EyeIcon className='w-5 h-5' />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Remember me / Forgot password */}
              {isLogin && (
                <div className='flex items-center justify-between opacity-0 animate-fadeInUp delay-700'>
                  <label className='flex items-center'>
                    <input
                      type='checkbox'
                      className='w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <span className='ml-2 text-sm text-gray-600 dark:text-gray-400'>
                      Zapamti me
                    </span>
                  </label>
                  <a
                    href='#'
                    className='text-sm text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 transition-colors'
                  >
                    Zaboravili ste lozinku?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <button
                type='submit'
                className='w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg opacity-0 animate-fadeInUp delay-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
              >
                {isLogin ? "Prijavite se" : "Registrujte se"}
              </button>

              {/* Divider */}
              <div className='relative opacity-0 animate-fadeInUp delay-900'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-300 dark:border-gray-600'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400'>
                    ili
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className='grid grid-cols-2 gap-3 opacity-0 animate-fadeInUp delay-1000'>
                <button
                  type='button'
                  className='flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 hover:shadow-md'
                >
                  <svg className='w-5 h-5 mr-2' viewBox='0 0 24 24'>
                    <path
                      fill='currentColor'
                      d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                    />
                    <path
                      fill='currentColor'
                      d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                    />
                    <path
                      fill='currentColor'
                      d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                    />
                    <path
                      fill='currentColor'
                      d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                    />
                  </svg>
                  Google
                </button>
                <button
                  type='button'
                  className='flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 hover:shadow-md'
                >
                  <svg
                    className='w-5 h-5 mr-2'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' />
                  </svg>
                  Twitter
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Additional Info */}
        <div className='text-center mt-8 opacity-0 animate-fadeInUp delay-1200'>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Registracijom se slažete sa našim{" "}
            <a
              href='#'
              className='text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 transition-colors'
            >
              uslovima korištenja
            </a>{" "}
            i{" "}
            <a
              href='#'
              className='text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 transition-colors'
            >
              politikom privatnosti
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
