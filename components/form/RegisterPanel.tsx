"use client";

import { useState } from "react";
import {
  UserIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { register } from "@/lib/api";
import { saveUserToStorage } from "@/lib/Auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

export default function RegisterPanel() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const locations = [
    "Sarajevo",
    "Banja Luka",
    "Tuzla",
    "Zenica",
    "Mostar",
    "Bihać",
    "Brčko",
    "Trebinje",
    "Doboj",
    "Cazin",
  ];

  type RegisterFormData = {
    ime: string;
    prezime: string;
    email: string;
    password: string;
    confirmPassword: string;
    lokacija: string;
  };

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Lozinke se ne poklapaju!");
      return;
    }

    setLoading(true);
    try {
      const result = await register({
        ime: data.ime,
        prezime: data.prezime,
        email: data.email,
        password: data.password,
        lokacija: data.lokacija,
        comments: [],
      });
      saveUserToStorage(result);
      toast.success("Registracija uspešna!");
      router.push("/");
    } catch (err) {
      toast.error(
        "Greška pri registraciji: " +
          (err instanceof Error ? err.message : "Nepoznata greška")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Ime */}
        <div className='relative'>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
            Ime
          </label>
          <div className='relative'>
            <UserIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
            <input
              {...formRegister("ime", { required: "Ime je obavezno" })}
              className='w-full pl-10 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300'
              placeholder='Vaše ime'
            />
            {errors.ime && (
              <span className='text-red-500 text-sm'>
                {typeof errors.ime.message === "string"
                  ? errors.ime.message
                  : ""}
              </span>
            )}
          </div>
        </div>

        {/* Prezime */}
        <div className='relative'>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
            Prezime
          </label>
          <div className='relative'>
            <UserIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
            <input
              {...formRegister("prezime", { required: "Prezime je obavezno" })}
              className='w-full pl-10 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300'
              placeholder='Vaše prezime'
            />
            {errors.prezime && (
              <span className='text-red-500 text-sm'>
                {typeof errors.prezime.message === "string"
                  ? errors.prezime.message
                  : ""}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Email */}
      <div className='relative'>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
          Email adresa
        </label>
        <input
          {...formRegister("email", {
            required: "Email je obavezan",
            pattern: { value: /\S+@\S+\.\S+/, message: "Email nije validan" },
          })}
          className='w-full pl-4 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300'
          placeholder='vas@email.com'
        />
        {errors.email && typeof errors.email.message === "string" && (
          <span className='text-red-500 text-sm'>{errors.email.message}</span>
        )}
      </div>

      {/* Lokacija */}
      <div className='relative'>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
          Lokacija
        </label>
        <select
          {...formRegister("lokacija", { required: "Lokacija je obavezna" })}
          className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all duration-300'
        >
          <option value=''>Izaberi lokaciju...</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        {errors.lokacija && (
          <span className='text-red-500 text-sm'>
            {typeof errors.lokacija.message === "string"
              ? errors.lokacija.message
              : ""}
          </span>
        )}
      </div>

      {/* Lozinka */}
      <div className='relative'>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
          Lozinka
        </label>
        <div className='relative'>
          <LockClosedIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
          <input
            type={showPassword ? "text" : "password"}
            {...formRegister("password", {
              required: "Lozinka je obavezna",
              minLength: {
                value: 6,
                message: "Lozinka mora imati min 6 karaktera",
              },
            })}
            className='w-full pl-10 pr-12 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300'
            placeholder='••••••••'
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
        {typeof errors.password?.message === "string" && (
          <span className='text-red-500 text-sm'>
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Confirm Password */}
      <div className='relative'>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
          Potvrdite lozinku
        </label>
        <div className='relative'>
          <LockClosedIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
          <input
            type={showConfirmPassword ? "text" : "password"}
            {...formRegister("confirmPassword", {
              required: "Potvrda lozinke je obavezna",
            })}
            className='w-full pl-10 pr-12 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300'
            placeholder='••••••••'
          />
          <button
            type='button'
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors'
          >
            {showConfirmPassword ? (
              <EyeSlashIcon className='w-5 h-5' />
            ) : (
              <EyeIcon className='w-5 h-5' />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <span className='text-red-500 text-sm'>
            {typeof errors.confirmPassword?.message === "string"
              ? errors.confirmPassword.message
              : ""}
          </span>
        )}
      </div>

      <button
        type='submit'
        disabled={loading}
        className='w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg'
      >
        {loading ? "Registrujem..." : "Registrujte se"}
      </button>
    </form>
  );
}
