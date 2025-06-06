"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCliente } from "../clients.api";
import Image from "next/image";
import Link from "next/link";
import { FaUsers, FaTools, FaClipboardList, FaUserCog, FaSignOutAlt, FaLaptop } from "react-icons/fa";

export default function AddClientForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setError("");
    setSuccess("");
    const allowed = ["Nombre", "Telefono", "Direccion", "Email"];
    Object.keys(data).forEach(key => {
      if (!allowed.includes(key)) delete data[key];
    });

    try {
      await createCliente(data);
      setSuccess("Cliente registrado correctamente.");
      reset();
      setTimeout(() => {
        router.push("/equipos/add");
      }, 1000);
    } catch (e: any) {
      setError(e.message || "Error al registrar cliente.");
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
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-blue-100 shadow-lg px-8 py-6">
        <div className="flex flex-col items-center mb-10">
          <Image src="/images/logo.svg" alt="Logo" width={60} height={60} className="rounded-full mb-2" />
          <span className="text-lg font-bold text-blue-700">TecnoTotal</span>
        </div>
        <nav className="flex flex-col gap-2 mt-6">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 rounded-lg text-blue-700 font-semibold bg-blue-100 hover:bg-blue-200 transition">
            <FaClipboardList /> Dashboard
          </Link>
          <Link href="/clients" className="flex items-center gap-3 px-4 py-2 rounded-lg text-green-700 font-semibold hover:bg-green-100 transition">
            <FaUsers /> Gestión Clientes
          </Link>
          <Link href="/equipos/add" className="flex items-center gap-3 px-4 py-2 rounded-lg text-purple-700 font-semibold hover:bg-purple-100 transition">
            <FaLaptop /> Registro Equipos
          </Link>
          <Link href="/reparaciones" className="flex items-center gap-3 px-4 py-2 rounded-lg text-purple-700 font-semibold hover:bg-purple-100 transition">
            <FaTools /> Gestión Reparaciones
          </Link>
          <Link href="/usuarios/gestionar" className="flex items-center gap-3 px-4 py-2 rounded-lg text-yellow-700 font-semibold hover:bg-yellow-100 transition">
            <FaUserCog /> Gestión Técnicos
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition"
        >
          <FaSignOutAlt /> Cerrar Sesión
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="w-full bg-white shadow flex items-center justify-between px-6 py-4 border-b border-blue-100">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.svg" alt="Logo" width={40} height={40} className="rounded-full" />
            <span className="text-xl font-bold text-gray-700 tracking-wide">PANEL DE ADMINISTRACION</span>
          </div>
        </header>

        {/* Main Form Content */}
        <main className="flex-1 py-10 px-4 md:px-10 bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
          <div className="max-w-lg w-full bg-white shadow rounded p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Registrar Cliente</h2>
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
                <label className="block mb-1 font-medium">Nombre</label>
                <input
                  {...register("Nombre", { required: "El nombre es obligatorio", minLength: 3, maxLength: 100 })}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Nombre del cliente"
                />
                {errors.Nombre && (
                  <span className="text-red-500 text-sm">{errors.Nombre.message as string}</span>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">Teléfono</label>
                <input
                  {...register("Telefono", { required: "El teléfono es obligatorio", minLength: 5, maxLength: 15 })}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Teléfono"
                />
                {errors.Telefono && (
                  <span className="text-red-500 text-sm">{errors.Telefono.message as string}</span>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">Dirección</label>
                <input
                  {...register("Direccion", { required: "La dirección es obligatoria", minLength: 3, maxLength: 255 })}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Dirección"
                />
                {errors.Direccion && (
                  <span className="text-red-500 text-sm">{errors.Direccion.message as string}</span>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  {...register("Email", {
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
                {errors.Email && (
                  <span className="text-red-500 text-sm">{errors.Email.message as string}</span>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
              >
                Registrar Cliente
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}