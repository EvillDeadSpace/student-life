"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { User } from "@/lib/api";
import { PencilIcon } from "@heroicons/react/24/outline";
import CoffeePicture from "../../public/CoffeePicture.png";

type Props = {
  user: User | null;
  onLogout: () => void;
};

export default function ProfileCard({ user, onLogout }: Props) {
  return (
    <>
      <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg animate-fadeInUp'>
        <div className='flex items-center space-x-4'>
          <div className='w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white text-2xl font-bold'>
            {user ? (user.ime?.[0] ?? "U") + (user.prezime?.[0] ?? "") : "U"}
          </div>
          <div className='flex-1'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
              {user
                ? `${user.ime ?? ""} ${user.prezime ?? ""}`
                : "Nepoznat korisnik"}
            </h2>
            <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>
              {user?.email ?? "-"}
            </p>
            <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
              {user?.lokacija ?? "Nije navedena lokacija"}
            </p>
          </div>
        </div>

        <div className='mt-6 grid grid-cols-2 gap-3'>
          <Link
            href='/profile/edit'
            className='inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 text-white font-medium shadow hover:scale-[1.02] transition-transform'
          >
            <PencilIcon className='w-4 h-4 mr-2' /> Uredi profil
          </Link>
          <button
            onClick={onLogout}
            className='inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'
          >
            Logout
          </button>
        </div>

        <div className='mt-6 border-t border-gray-100 dark:border-gray-700 pt-4'>
          <div className='text-sm text-gray-600 dark:text-gray-300'>
            Korisničke informacije
          </div>
          <dl className='mt-3 grid grid-cols-1 gap-2 text-sm text-gray-700 dark:text-gray-300'>
            <div className='flex justify-between'>
              <dt className='text-gray-500'>Ime</dt>
              <dd>{user?.ime ?? "-"}</dd>
            </div>
            <div className='flex justify-between'>
              <dt className='text-gray-500'>Prezime</dt>
              <dd>{user?.prezime ?? "-"}</dd>
            </div>
            <div className='flex justify-between'>
              <dt className='text-gray-500'>Email</dt>
              <dd>{user?.email ?? "-"}</dd>
            </div>
            <div className='flex justify-between'>
              <dt className='text-gray-500'>Lokacija</dt>
              <dd>{user?.lokacija ?? "-"}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div
        className='my-4 overflow-hidden rounded-xl dark:bg-gray-800 shadow-md max-w-4xl animate-fadeInUp'
        style={{ animationDelay: "0.2s" }}
      >
        <div className='md:block lg:block md:text-center lg:text-center'>
          <div className='flex-none p-2 w-28 h-28 md:w-36 md:h-36 lg:w-48 lg:h-48 mx-auto'>
            <Image
              className='rounded-lg object-cover w-full h-full mix-blend-screen filter brightness-105 contrast-115'
              src={CoffeePicture}
              alt='Picture'
              width={190}
              height={190}
            />
          </div>

          <div className='flex-1 min-w-0 p-4 text-white md:flex md:flex-col md:items-center md:justify-center '>
            <div className='text-sm font-semibold tracking-wide text-indigo-400 uppercase'>
              Amar Tubic
            </div>
            <a className='mt-1 block text-lg leading-tight font-medium text-white hover:underline'>
              Pozrav svimaa !!
            </a>
            <p className='mt-2 text-gray-200 max-w-prose lg:max-w-xl'>
              Moje je ideja bila nekako da napravim neku stranicu koja bih
              pomogla studentima novim/starima da pitaju neke stvari koje ih
              izanimaju. Ako imas kakvu marku ostavi ❤️
            </p>
            <Link
              href='https://buymeacoffee.com/tvojeime'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-500 mt-2 transition'
            >
              ☕ Buy me a coffee
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
