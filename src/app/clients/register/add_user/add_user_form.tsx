"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerUser, RegisterPayload } from "../register.api";
import { useRouter } from "next/navigation";

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
    <div
      className="w-full"
      style={{
        maxWidth: "340px",
        marginLeft: "auto",
        marginRight: "auto",
        background: "white",
        boxShadow: "0 6px 16px rgba(0,0,0,0.10)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        marginTop: "3rem",
        border: "3px solid orange",
      }}
    >
      <h2 className="text-xl font-bold mb-4 text-center text-orange-700">Registrar Usuario</h2>
      {success && (
        <div className="mb-3 px-3 py-2 bg-green-100 text-green-700 rounded border border-green-300 text-center text-sm">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-3 px-3 py-2 bg-red-100 text-red-700 rounded border border-red-300 text-center text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-sm">Nombre completo</label>
          <input
            {...register("fullName", { required: "El nombre es obligatorio", minLength: 2 })}
            className="w-full border px-2 py-2 rounded text-sm"
            placeholder="Nombre completo"
          />
          {errors.fullName && (
            <span className="text-red-500 text-xs">{errors.fullName.message as string}</span>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm">Email</label>
          <input
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email no válido",
              },
            })}
            type="email"
            className="w-full border px-2 py-2 rounded text-sm"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message as string}</span>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm">Contraseña</label>
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
            className="w-full border px-2 py-2 rounded text-sm"
            placeholder="Contraseña"
          />
          {errors.password && (
            <span className="text-red-500 text-xs">{errors.password.message as string}</span>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold text-base"
        >
          Registrar Usuario
        </button>
      </form>
      <div className="mt-5 flex justify-center">
        <button
          onClick={() => router.push("/")}
          className="bg-gray-200 hover:bg-gray-300 text-blue-700 py-1 px-5 rounded font-semibold text-sm transition"
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
}