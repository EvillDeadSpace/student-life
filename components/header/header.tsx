import Image from "next/image";
import LinkComponents from "./Link";
import MobileMenuToggle from "./MobileMenu";
import UserAuth from "./UserAuth";
export default function Header() {
  return (
    <>
      {/* Navigation */}
      <nav className='sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo */}
            <div className='flex-shrink-0 flex items-center'>
              <Image
                src='/studentLogo.png'
                width={40}
                height={40}
                alt='Student Life Logo'
                className='mr-2'
              />
              <h1 className='text-xl font-bold text-gray-900 dark:text-white'>
                Student Life
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden md:block'>
              <div className='ml-10 flex items-baseline space-x-4'>
                <LinkComponents href='/' text='Pocetna' isActive={true} />
                <LinkComponents href='/kategorije' text='Kategorije' />
                <LinkComponents href='/dodaj-iskustvo' text='Dodaj iskustvo' />
                <UserAuth />
              </div>
            </div>

            {/* Mobile menu component */}
            <MobileMenuToggle />
          </div>
        </div>
      </nav>
    </>
  );
}
