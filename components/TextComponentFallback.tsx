export default function HeroCounterFallback() {
  return (
    <div className='mt-16 grid grid-cols-3 gap-8 text-center lg:text-left'>
      {[0, 1, 2].map((i) => (
        <div key={i} className='animate-pulse'>
          <div className='h-10 bg-gray-200 dark:bg-gray-700 rounded-md w-24 mx-auto lg:mx-0 mb-2'></div>
          <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-36 mx-auto lg:mx-0'></div>
        </div>
      ))}
    </div>
  );
}
