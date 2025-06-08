"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerUser, RegisterPayload } from "../register.api";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function AddUserForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterPayload>();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-200">
      <div className="shadow-2xl rounded-3xl px-10 py-10 w-full max-w-lg flex flex-col items-center border-2 border-orange-300 bg-white/90 backdrop-blur relative">
        {/* Logo mitad fuera, mitad dentro */}
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 z-10">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={200}
            height={200}
            className="w-52 h-52 rounded-full border-4 border-orange-300 object-cover shadow-lg bg-white"
          />
        </div>
        <div className="mt-28 w-full flex flex-col items-center">
          <h1 className="text-4xl font-extrabold mb-6 text-orange-600 tracking-tight drop-shadow">Crear Cuenta</h1>
          {success && (
            <div className="w-full mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-center border border-green-300 shadow">
              {success}
            </div>
          )}
          {error && (
            <div className="w-full mb-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-center border border-red-300 shadow">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
            <div>
              <div className="relative flex items-center">
                <FaUser className="absolute left-4 text-orange-400 text-lg pointer-events-none" style={{ top: "50%", transform: "translateY(-50%)" }} />
                <input
                  {...register("fullName", { required: "El nombre es obligatorio", minLength: 2 })}
                  className="w-full border pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder-gray-400 text-lg"
                  placeholder="Nombre completo"
                />
              </div>
              {errors.fullName && (
                <span className="text-red-500 text-sm">{errors.fullName.message as string}</span>
              )}
            </div>
            <div>
              <div className="relative flex items-center">
                <FaEnvelope className="absolute left-4 text-orange-400 text-lg pointer-events-none" style={{ top: "50%", transform: "translateY(-50%)" }} />
                <input
                  {...register("email", {
                    required: "El email es obligatorio",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email no válido",
                    },
                  })}
                  type="email"
                  className="w-full border pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder-gray-400 text-lg"
                  placeholder="Email"
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message as string}</span>
              )}
            </div>
            <div>
              <div className="relative flex items-center">
                <FaLock className="absolute left-4 text-orange-400 text-lg pointer-events-none" style={{ top: "50%", transform: "translateY(-50%)" }} />
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
                  type={showPassword ? "text" : "password"}
                  className="w-full border pl-12 pr-10 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder-gray-400 text-lg"
                  placeholder="Contraseña"
                />
                <button
                  type="button"
                  className="absolute right-3 text-orange-400 text-lg focus:outline-none"
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message as string}</span>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold text-lg shadow transition"
            >
              Registrar Usuario
            </button>
          </form>
          <button
            onClick={() => router.push("/")}
            className="mt-6 w-full bg-white border border-orange-200 hover:bg-orange-50 text-orange-500 py-3 rounded-xl font-semibold transition shadow"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}