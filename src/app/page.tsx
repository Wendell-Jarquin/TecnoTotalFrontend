"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("Usuario");

  useEffect(() => {
    const fullName = localStorage.getItem("user_fullName");
    setUserName(fullName || "Usuario");
  }, []);

  const onSubmit = async (data: any) => {
    setError("");
    try {
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log(result);

      const token = result.access_token || result.token;
      const user = {
        id: result.id,
        email: result.email,
        fullName: result.fullName,
      };

      if (res.ok && token && user?.id) {
        localStorage.setItem("token", token);
        localStorage.setItem("user_id", user.id);
        localStorage.setItem("user_fullName", user.fullName);
        router.push("/dashboard");
      } else {
        setError(result.message || "Error al iniciar sesión");
      }
    } catch (e) {
      setError("No se pudo conectar al servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center from-red-100">
      <div className="bg-red shadow-lg rounded-xl px-8 py-10 w-full max-w-md flex flex-col items-center border-2 border-red-400">
        <Image
          src="/images/logo.svg"
          alt="Login"
          width={112}
          height={112}
          className="w-28 h-28 rounded-full mb-6 border-4 border-red-200 object-cover shadow"
        />
        <h1 className="text-3xl font-bold mb-6">Iniciar Sesión</h1>
        {error && (
          <div className="w-full mb-4 px-4 py-2 bg-red-100 text-red-700 rounded text-center border border-red-300">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
          <div>
            <input
              {...register("email", { required: "El correo es obligatorio" })}
              type="email"
              placeholder="Correo electrónico"
              className={`w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${errors.email ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message as string}</span>
            )}
          </div>
          <div>
            <input
              {...register("password", { required: "La contraseña es obligatoria" })}
              type="password"
              placeholder="Contraseña"
              className={`w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${errors.password ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message as string}</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Entrar
          </button>
        </form>
        <button
          onClick={() => router.push("/clients/register")}
          className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-blue-700 py-2 rounded-lg font-semibold transition"
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}