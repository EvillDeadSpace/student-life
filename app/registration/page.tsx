import RegisterPanel from "@/components/form/RegisterPanel";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { Toaster } from "react-hot-toast";

export default function RegistrationPage() {
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

        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90 border border-gray-200 dark:border-gray-700 overflow-hidden opacity-0 animate-fadeInUp delay-200'>
          <div className='p-8'>
            <RegisterPanel />

            <div className='mt-6 flex items-center gap-3'>
              <div className='flex-1 h-px bg-gray-200 dark:bg-gray-700'></div>
              <span className='text-sm text-gray-500 dark:text-gray-400'>
                ili
              </span>
              <div className='flex-1 h-px bg-gray-200 dark:bg-gray-700'></div>
            </div>

            <div className='mt-6 text-center'>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                Imate nalog?
              </p>
              <a
                href='/login'
                className='mt-2 inline-block px-6 py-2 rounded-full font-medium text-sm bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md hover:opacity-95 transition-opacity'
              >
                Prijavi se
              </a>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
