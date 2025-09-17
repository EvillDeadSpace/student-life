// components/header/UserAuth.tsx
"use client";
import { useState, useEffect } from "react";
import { getUserFromStorage, type User } from "../../lib/api";
import LinkComponents from "./Link";
import { removeUserFromStorage } from "@/lib/Auth";

export default function UserAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = getUserFromStorage();
    setUser(userData);
  }, []);

  const logout = () => {
    removeUserFromStorage();
    setUser(null);
  };

  return (
    <>
      {user ? (
        <span className='text-gray-900 dark:text-white'>
          Dobrodošao, {user.ime} {user.prezime}
          <button className='ml-2' onClick={logout}>
            Logout
          </button>
        </span>
      ) : (
        <LinkComponents href='/login' text='Login/Registracija' />
      )}
    </>
  );
}
