"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("Usuario");
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-200">
      <div className="shadow-2xl rounded-3xl px-10 py-8 w-full max-w-lg flex flex-col items-center border-2 border-orange-300 bg-white/90 backdrop-blur relative">
        {/* Logo mitad fuera, mitad dentro */}
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 z-10">
          <Image
            src="/images/logo.svg"
            alt="Login"
            width={200}
            height={200}
            className="w-52 h-52 rounded-full border-4 border-orange-300 object-cover shadow-lg bg-white"
          />
        </div>
        <div className="mt-28 w-full flex flex-col items-center">
          <h1 className="text-4xl font-extrabold mb-6 text-orange-600 tracking-tight drop-shadow">Bienvenido</h1>
          <p className="mb-6 text-gray-500 text-lg text-center">Accede a tu cuenta para gestionar tus servicios</p>
          {error && (
            <div className="w-full mb-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-center border border-red-300 shadow">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
            <div>
              <div className="relative flex items-center">
                <FaEnvelope className="absolute left-4 text-orange-400 text-lg pointer-events-none" style={{ top: "50%", transform: "translateY(-50%)" }} />
                <input
                  {...register("email", { required: "El correo es obligatorio" })}
                  type="email"
                  placeholder="Correo electrónico"
                  className={`w-full border pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder-gray-400 text-lg ${errors.email ? "border-red-400" : "border-gray-300"}`}
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
                  {...register("password", { required: "La contraseña es obligatoria" })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  className={`w-full border pl-12 pr-10 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder-gray-400 text-lg ${errors.password ? "border-red-400" : "border-gray-300"}`}
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
              className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white py-3 rounded-xl font-bold text-lg shadow transition"
            >
              Entrar
            </button>
          </form>
          <button
            onClick={() => router.push("./register")}
            className="mt-6 w-full bg-white border border-orange-200 hover:bg-orange-50 text-orange-500 py-3 rounded-xl font-semibold transition shadow"
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}