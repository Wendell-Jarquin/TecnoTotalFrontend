"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createTecnico } from "../technical_api";
import Image from "next/image";
import Link from "next/link";
import { FaUsers, FaTools, FaClipboardList, FaUserCog, FaSignOutAlt, FaLaptop } from "react-icons/fa";

export default function AddTechnicalForm() {
  const [userName, setUserName] = useState("Usuario");
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fullName = localStorage.getItem("user_fullName");
    setUserName(fullName || "Usuario");
  }, []);

  const onSubmit = async (data: any) => {
    setError("");
    setSuccess("");
    const allowed = ["nombre", "email", "telefono", "especialidad"];
    Object.keys(data).forEach(key => {
      if (!allowed.includes(key)) delete data[key];
    });

    try {
      await createTecnico(data);
      setSuccess("Técnico agregado correctamente.");
      reset();
      setTimeout(() => {
        router.push("/technical");
      }, 1000);
    } catch (e: any) {
      setError(e.message || "Error al agregar técnico.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_fullName");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-blue-100 shadow-lg px-13 py-6">
        <div className="flex flex-col items-center mb-10">
          <Link href="/dashboard" className="flex flex-col items-center">
            <Image src="/images/logo.svg" alt="Logo" width={120} height={120} className="rounded-full mb-2" />
            <span className="text-lg font-bold text-orange-700">TecnoTotal</span>
          </Link>
        </div>
        <nav className="flex flex-col gap-2 mt-6">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 font-semibold hover:bg-orange-100 transition mb-3">
            <FaClipboardList /> Dashboard
          </Link>
          <Link href="/clients" className="flex items-center gap-3 px-4 py-2 font-semibold hover:bg-orange-100 transition mb-3">
            <FaUsers /> Gestión Clientes
          </Link>
          <Link href="/equipos/add" className="flex items-center gap-3 px-4 py-2 font-semibold hover:bg-orange-100 transition mb-3">
            <FaLaptop /> Registro Equipos
          </Link>
          <Link href="/reparaciones" className="flex items-center gap-3 px-4 py-2 font-semibold hover:bg-orange-100 transition mb-3">
            <FaTools /> Gestión Reparaciones
          </Link>
          <Link href="/technical" className="flex items-center gap-3 px-4 py-2 font-semibold bg-orange-200">
            <FaUserCog /> Gestión Técnicos
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 px-4 py-2 text-red-700 font-semibold hover:bg-red-200 transition"
        >
          <FaSignOutAlt /> Cerrar Sesión
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="w-full bg-white shadow flex items-center justify-between px-6 py-4 border-b border-orange-500">
          <div className="flex-1 flex justify-center">
            <span className="text-xl font-bold text-orange-700 tracking-wide">
              REGISTRAR TÉCNICO
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold cursor-default">
              {userName}
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded font-semibold ml-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main Form Content */}
        <main className="flex-1 py-10 px-4 md:px-10 bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
          <div className="max-w-lg w-full bg-white shadow rounded p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Registrar Técnico</h2>
            {success && (
              <div className="mb-4 px-4 py-2 bg-green-100 text-green-700 rounded border border-green-300 text-center">
                {success}
              </div>
            )}
            {error && (
              <div className="mb-4 px-4 py-2 bg-red-100 text-red-700 rounded border border-red-300 text-center">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block mb-1 font-medium">Nombre completo</label>
                <input
                  {...register("nombre", { required: "El nombre es obligatorio", minLength: 3, maxLength: 100 })}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Nombre del técnico"
                />
                {errors.nombre && (
                  <span className="text-red-500 text-sm">{errors.nombre.message as string}</span>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  {...register("email", {
                    required: "El email es obligatorio",
                    minLength: 3,
                    maxLength: 100,
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email no válido",
                    },
                  })}
                  type="email"
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Email"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email.message as string}</span>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">Teléfono</label>
                <input
                  {...register("telefono", { required: "El teléfono es obligatorio", minLength: 5, maxLength: 15 })}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Teléfono"
                />
                {errors.telefono && (
                  <span className="text-red-500 text-sm">{errors.telefono.message as string}</span>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">Especialidad</label>
                <input
                  {...register("especialidad", { required: "La especialidad es obligatoria", minLength: 3, maxLength: 100 })}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Especialidad"
                />
                {errors.especialidad && (
                  <span className="text-red-500 text-sm">{errors.especialidad.message as string}</span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
                >
                  Registrar Técnico
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/technical")}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded font-semibold"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}