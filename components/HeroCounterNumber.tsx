import { fetchAllStudent, heroPost } from "@/lib/api";

export default async function HeroCounterNumber() {
  const post = await heroPost();
  const user = await fetchAllStudent();

  console.log(user);
  const finalPost = Math.floor(post.length / 10) * 10;
  const finalUser = Math.floor(user.length / 10) * 10;

  return (
    <div className='mt-16 grid grid-cols-3 gap-8 text-center lg:text-left animate-fadeInUp delay-500'>
      <div className='group cursor-pointer transform hover:scale-105 transition-all duration-300'>
        <div className='text-4xl md:text-4xl font-bold text-teal-600 dark:text-teal-400 group-hover:text-teal-500 transition-colors duration-300'>
          {finalPost}+
        </div>
        <div className='text-base text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300'>
          Iskustava
        </div>
      </div>
      <div className='group cursor-pointer transform hover:scale-105 transition-all duration-300'>
        <div className='text-4xl md:text-4xl font-bold text-teal-600 dark:text-teal-400 group-hover:text-teal-500 transition-colors duration-300'>
          {finalUser}+
        </div>
        <div className='text-base text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300'>
          Studenata
        </div>
      </div>
      <div className='group cursor-pointer transform hover:scale-105 transition-all duration-300'>
        <div className='text-4xl md:text-4xl font-bold text-teal-600 dark:text-teal-400 group-hover:text-teal-500 transition-colors duration-300'>
          50+
        </div>
        <div className='text-base text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300'>
          Fakulteta
        </div>
      </div>
    </div>
  );
}
