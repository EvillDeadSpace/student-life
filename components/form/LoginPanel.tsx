"use client";

import { useState } from "react";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { saveUserToStorage } from "@/lib/Auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

export default function LoginPanel() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  type RegisterFormData = {
    email: string;
    password: string;
  };

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  type FormData = {
    email: string;
    password: string;
  };

  const onSubmit = async (values: FormData) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      saveUserToStorage(data);
      toast.success("Uspješno ste prijavljeni");
      router.push("/");
    } catch (err) {
      toast.error(
        "Greška pri prijavi: " +
          (err instanceof Error ? err.message : "Nepoznata greška")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
      <div className='relative'>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
          Email adresa
        </label>
        <div className='relative'>
          <EnvelopeIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
          <input
            type='email'
            {...formRegister("email", { required: "Email je obavezno" })}
            className='w-full pl-10 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300'
            placeholder='vas@email.com'
            required
          />
        </div>
        {errors.email && (
          <p className='mt-2 text-sm text-red-500'>{errors.email.message}</p>
        )}
      </div>

      <div className='relative'>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
          Lozinka
        </label>
        <div className='relative'>
          <LockClosedIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
          <input
            type={showPassword ? "text" : "password"}
            {...formRegister("password", { required: "Password je obavezno" })}
            className='w-full pl-10 pr-12 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300'
            placeholder='••••••••'
            required
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors'
          >
            {showPassword ? (
              <EyeSlashIcon className='w-5 h-5' />
            ) : (
              <EyeIcon className='w-5 h-5' />
            )}
          </button>
        </div>
        {errors.password && (
          <p className='mt-2 text-sm text-red-500'>{errors.password.message}</p>
        )}
      </div>

      <button
        type='submit'
        disabled={loading}
        className='w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg'
      >
        {loading ? "Prijavljujem..." : "Prijavite se"}
      </button>
    </form>
  );
}
