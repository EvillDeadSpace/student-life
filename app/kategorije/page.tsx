import {
  AcademicCapIcon,
  HomeIcon,
  CurrencyDollarIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const categories = [
  {
    id: 1,
    title: "Fakultet",
    slug: "fakultet",
    description:
      "Informacije o fakultetima, upisima, studijskim programima i akademskim mogućnostima",
    icon: AcademicCapIcon,
    color: "from-blue-500 to-blue-600",
    hoverColor: "hover:from-blue-600 hover:to-blue-700",
  },
  {
    id: 2,
    title: "Studentski dom",
    slug: "studentski-dom",
    description:
      "Smještaj, uslovi života, prijave za dom i sve o studentskom stanovanju",
    icon: HomeIcon,
    color: "from-green-500 to-green-600",
    hoverColor: "hover:from-green-600 hover:to-green-700",
  },
  {
    id: 3,
    title: "Stipendije",
    slug: "stipendije",
    description:
      "Dostupne stipendije, uslovi za prijavu, rokovi i finansijska podrška",
    icon: CurrencyDollarIcon,
    color: "from-purple-500 to-purple-600",
    hoverColor: "hover:from-purple-600 hover:to-purple-700",
  },
  {
    id: 4,
    title: "Praksa i posao",
    slug: "praksa-i-posao",
    description:
      "Studentske prakse, part-time poslovi i mogućnosti za karijerni razvoj",
    icon: BriefcaseIcon,
    color: "from-orange-500 to-orange-600",
    hoverColor: "hover:from-orange-600 hover:to-orange-700",
  },
];

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

        {/* Additional Info Section */}
        <div className='mt-16 text-center'>
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 opacity-0 animate-fadeInUp delay-500'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
              Trebate pomoć?
            </h2>
            <p className='text-gray-600 dark:text-gray-300 mb-6'>
              Naš tim je tu da vam pomogne u pronalaženju svih potrebnih
              informacija
            </p>
            <button className='bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'>
              Kontaktirajte nas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
