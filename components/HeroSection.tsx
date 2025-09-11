import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className='h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
          {/* Left side - Text content */}
          <div className='text-center lg:text-left animate-fadeInUp relative z-40'>
            <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-fadeInUp delay-100'>
              Student{" "}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 animate-gradient-x'>
                Life
              </span>
            </h1>

            <p className='text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fadeInUp delay-200'>
              Iskustva studenata: fakultet, dom, život u gradu. Podijeli svoja
              iskustva i saznaj više o studentskom životu.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fadeInUp delay-300'>
              {/* Primary CTA Button */}
              <Link
                href='/kategorije'
                className='bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-block text-center cursor-pointer no-underline relative z-50'
              >
                Podijeli iskustvo
              </Link>

              {/* Secondary Link */}
              <Link
                href='/kategorije'
                className='text-teal-600 hover:text-white font-semibold py-4 px-10 rounded-xl border-2 border-teal-600 hover:bg-teal-600 transition-all duration-300 text-center inline-block cursor-pointer no-underline relative z-50'
              >
                Pregledaj kategorije
              </Link>
            </div>

            {/* Stats or features */}
            <div className='mt-16 grid grid-cols-3 gap-8 text-center lg:text-left animate-fadeInUp delay-500'>
              <div className='group cursor-pointer transform hover:scale-105 transition-all duration-300'>
                <div className='text-3xl md:text-4xl font-bold text-teal-600 dark:text-teal-400 group-hover:text-teal-500 transition-colors duration-300'>
                  500+
                </div>
                <div className='text-base text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300'>
                  Iskustava
                </div>
              </div>
              <div className='group cursor-pointer transform hover:scale-105 transition-all duration-300'>
                <div className='text-3xl md:text-4xl font-bold text-teal-600 dark:text-teal-400 group-hover:text-teal-500 transition-colors duration-300'>
                  200+
                </div>
                <div className='text-base text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300'>
                  Studenata
                </div>
              </div>
              <div className='group cursor-pointer transform hover:scale-105 transition-all duration-300'>
                <div className='text-3xl md:text-4xl font-bold text-teal-600 dark:text-teal-400 group-hover:text-teal-500 transition-colors duration-300'>
                  50+
                </div>
                <div className='text-base text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300'>
                  Fakulteta
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className='relative animate-fadeInUp delay-400'>
            <div className='relative z-10 mx-auto max-w-md lg:max-w-lg transform hover:scale-105 transition-transform duration-500'>
              <Image
                src='/student-hero.svg'
                alt='Studenti'
                width={500}
                height={400}
                className='w-full h-auto rounded-3xl shadow-2xl object-cover hover:shadow-3xl transition-shadow duration-500'
                priority
              />
            </div>

            {/* Background decorative elements */}
            <div className='absolute -top-8 -right-8 w-80 h-80 bg-gradient-to-r from-teal-300 to-emerald-300 dark:from-teal-600 dark:to-emerald-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse pointer-events-none'></div>
            <div className='absolute -bottom-12 -left-8 w-80 h-80 bg-gradient-to-r from-purple-300 to-pink-300 dark:from-purple-600 dark:to-pink-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse delay-1000 pointer-events-none'></div>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-200 to-indigo-200 dark:from-blue-800 dark:to-indigo-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500 pointer-events-none'></div>
          </div>
        </div>
      </div>

      {/* Background pattern and floating particles */}
      <div className='absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10 pointer-events-none'></div>

      {/* Floating particles */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-4 h-4 bg-teal-400 rounded-full animate-pulse opacity-60'></div>
        <div className='absolute top-3/4 left-1/3 w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-700 opacity-50'></div>
        <div className='absolute top-1/2 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-1000 opacity-40'></div>
        <div className='absolute top-1/6 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300 opacity-60'></div>
        <div className='absolute bottom-1/4 left-1/6 w-4 h-4 bg-pink-400 rounded-full animate-pulse delay-500 opacity-30'></div>
      </div>
    </section>
  );
}
