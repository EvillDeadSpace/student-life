import Link from "next/link";
import { categories } from "@/components/constants/ConstCategory";

export default async function Categories() {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 bg-grid-pattern'>
      {/* Hero Section */}
      <div className='relative overflow-hidden pt-16 pb-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white opacity-0 animate-fadeInUp'>
              <span className='bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent'>
                Kategorije
              </span>
            </h1>
            <p className='mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto opacity-0 animate-fadeInUp delay-200'>
              Pronađite sve što vam je potrebno za studentski život na jednom
              mjestu
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'>
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`kategorije/${category.slug}`}
              className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 opacity-0 animate-fadeInUp cursor-pointer`}
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} ${category.hoverColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
              ></div>

              {/* Card Content */}
              <div className='relative p-8'>
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <category.icon className='w-8 h-8 text-white' />
                </div>

                {/* Title */}
                <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300'>
                  {category.title}
                </h3>

                {/* Description */}
                <p className='text-gray-600 dark:text-gray-300 leading-relaxed mb-6'>
                  {category.description}
                </p>

                {/* CTA Button */}
                <div className='flex items-center text-teal-600 dark:text-teal-400 font-medium group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors duration-300'>
                  <span>Saznaj više</span>
                  <svg
                    className='w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className='absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl'></div>
              <div className='absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-lg'></div>
            </Link>
          ))}
        </div>

        {/* Additional Info Section - faculty styled card */}
        <Link
          href='/kategorije/marketplace'
          className='group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-all duration-500 transform cursor-pointer'
        >
          <div
            className='mt-8 opacity-0 animate-fadeInUp'
            style={{ animationDelay: `${(categories.length + 1) * 0.1}s` }}
          >
            <div className='relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-transparent shadow-lg p-6 md:p-8 transition-all duration-400 transform hover:scale-[1.01] hover:-translate-y-1 cursor-pointer'>
              {/* Hover: subtle blurred blue overlay (soft, low-opacity) */}
              <div className='absolute inset-0 rounded-2xl pointer-events-none z-0'>
                <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/12 to-blue-600/08 opacity-0 transition-all duration-500 group-hover:opacity-60 backdrop-blur-md mix-blend-overlay'></div>
                <div className='absolute inset-0 rounded-2xl dark:bg-gradient-to-br dark:from-blue-700/10 dark:to-blue-800/08 opacity-0 transition-all duration-500 group-hover:opacity-60 backdrop-blur-md mix-blend-overlay'></div>
              </div>

              {/* Sheen overlay (moves on hover) */}
              <div className='pointer-events-none absolute inset-0 overflow-hidden rounded-2xl z-10'>
                <div className='absolute -left-16 top-0 w-20 h-full bg-gradient-to-r from-white/0 via-white/12 to-white/0 opacity-0 transform rotate-6 transition-all duration-450 ease-in-out group-hover:opacity-28 group-hover:translate-x-[70%]'></div>
              </div>

              {/* Ensure content sits above sheen */}
              <div className='relative z-20'>
                <div className='flex flex-col sm:items-left md:items-center  gap-6  sm:text-left md:text-center'>
                  {/* Academic Icon */}
                  <div className='flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-lg bg-gradient-to-br from-indigo-600 to-teal-500 text-white shadow-md transition-transform duration-300 group-hover:scale-101'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-10 h-10 drop-shadow-lg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
                      />
                    </svg>
                  </div>

                  {/* Text content */}
                  <div className='flex-1 text-white'>
                    <h2 className=' text-2xl md:text-3xl font-semibold mb-2 tracking-tight'>
                      Marketplace funkcionalnosti
                    </h2>
                    <p className='text-gray-600 dark:text-gray-300 leading-relaxed mb-6'>
                      Ova sekcija studentima omogućava da prodaju ili kupe
                      udžbenike i opremu, pronađu smještaj i prevoz, te ponude
                      ili potraže kurseve i privatne časove – sve na jednom
                      mjestu za lakši studentski život.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
