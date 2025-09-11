// components/header/UserAuth.tsx
"use client";
import { useState, useEffect } from "react";
import { getUserFromStorage, type User } from "../../lib/api";
import LinkComponents from "./Link";

export default function UserAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = getUserFromStorage();
    setUser(userData);
  }, []);

  return (
    <>
      {user ? (
        <span className='text-gray-900 dark:text-white'>
          Dobrodošao, {user.ime} {user.prezime}
        </span>
      ) : (
        <LinkComponents href='/login' text='Login/Registracija' />
      )}
    </>
  );
}
