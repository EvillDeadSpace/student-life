import HeroCetionTwo from "@/components/HeroCetionTwo";
import HeroSection from "@/components/HeroSection";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
        {/* Hero */}
        <HeroSection />
        <HeroCetionTwo />
      </div>
    </>
  );
}
