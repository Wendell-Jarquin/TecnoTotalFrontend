"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerUser, RegisterPayload } from "../register.api";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function AddUserForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterPayload>();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: RegisterPayload) => {
    setError("");
    setSuccess("");
    try {
      await registerUser(data);
      setSuccess("Usuario registrado correctamente.");
      reset();
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (e: any) {
      setError(e.message || "Error al registrar usuario.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
     <div className="shadow-lg rounded-xl px-8 py-10 w-[450px] flex flex-col items-center border-2 border-orange-400">
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={120}
          height={112}
          className="w-28 h-28 rounded-full mb-6 border-4 border-orange-200 object-cover shadow"
        />
        <h1 className="text-3xl font-bold mb-6 text-orange-600">Crear Cuenta</h1>
        {success && (
          <div className="w-full mb-4 px-4 py-2 bg-green-100 text-green-700 rounded text-center border border-green-300">
            {success}
          </div>
        )}
        {error && (
          <div className="w-full mb-4 px-4 py-2 bg-red-100 text-red-700 rounded text-center border border-red-300">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
          <div>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-orange-400" />
              <input
                {...register("fullName", { required: "El nombre es obligatorio", minLength: 2 })}
                className="w-full border px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder-gray-400"
                placeholder="Nombre completo"
              />
            </div>
            {errors.fullName && (
              <span className="text-red-500 text-sm">{errors.fullName.message as string}</span>
            )}
          </div>
          <div>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-orange-400" />
              <input
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email no válido",
                  },
                })}
                type="email"
                className="w-full border px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder-gray-400"
                placeholder="Email"
              />
            </div>
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message as string}</span>
            )}
          </div>
          <div>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-orange-400" />
              <input
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                  maxLength: { value: 50, message: "Máximo 50 caracteres" },
                  pattern: {
                    value: /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                    message: "Debe tener mayúscula, minúscula y número",
                  },
                })}
                type="password"
                className="w-full border px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder-gray-400"
                placeholder="Contraseña"
              />
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message as string}</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Registrar Usuario
          </button>
        </form>
        <button
          onClick={() => router.push("/")}
          className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-grey py-3 rounded-lg font-semibold transition"
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
}