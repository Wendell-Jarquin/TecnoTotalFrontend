"use client";

import React, { useEffect, useState } from "react";
import { obtenerReparaciones, Reparacion } from "./reparaciones.api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaUsers, FaTools, FaClipboardList, FaUserCog, FaSignOutAlt, FaLaptop } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";

export default function ReparacionesPage() {
  const [reparaciones, setReparaciones] = useState<Reparacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    obtenerReparaciones()
      .then((res) => {
        if (Array.isArray(res)) {
          setReparaciones(res);
        } else if (Array.isArray(res.data)) {
          setReparaciones(res.data);
        } else if (Array.isArray(res.results)) {
          setReparaciones(res.results);
        } else {
          setReparaciones([]);
        }
      })
      .catch((e) => setError(e.message || "Error al cargar reparaciones"))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_fullName");
    window.location.href = "/";
  };

  // Botón Editar
  const EditarButton = ({ id }: { id: number }) => (
    <Link
      href={`/reparaciones/edit/${id}`}
      className="px-2 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded text-xs font-semibold transition"
    >
      Editar
    </Link>
  );

  // Botón Eliminar
  const EliminarButton = ({ id }: { id: number }) => (
    <button
      onClick={() => router.push(`/reparaciones/delete?id=${id}`)}
      className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold transition"
    >
      Eliminar
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-blue-100 shadow-lg py-8 px-4">
        <div className="flex flex-col items-center mb-10">
          <Image src="/images/logo.svg" alt="Logo" width={60} height={60} className="rounded-full mb-2" />
          <span className="text-lg font-bold text-blue-700">TecnoTotal</span>
        </div>
        <Link
          href="/clients/add"
          className="flex items-center gap-3 px-4 py-2 mb-8 rounded-lg text-white font-semibold bg-red-600 hover:bg-red-700 transition justify-center"
        >
          <FaComputer /> REPARAR EQUIPO
        </Link>
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
            <span className="text-xl font-bold text-gray-700 tracking-wide">GESTION DE REPARACIONES</span>
          </div>
        </header>

        {/* Tabla de reparaciones */}
        <main className="flex-1 py-10 px-4 md:px-10 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Lista de Reparaciones</h1>
            {loading && <p className="text-center">Cargando...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!loading && !error && (
              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-2 bg-white rounded-xl shadow-lg">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-100 to-blue-50">
                      <th className="py-3 px-4 rounded-l-xl text-blue-700 font-bold text-left border">ID</th>
                      <th className="py-3 px-4 text-blue-700 font-bold text-left border">Cliente</th>
                      <th className="py-3 px-4 text-blue-700 font-bold text-left border">Equipo</th>
                      <th className="py-3 px-4 text-blue-700 font-bold text-left border">Descripción Falla</th>
                      <th className="py-3 px-4 text-blue-700 font-bold text-left border">Estado</th>
                      <th className="py-3 px-4 text-blue-700 font-bold text-left border">Técnico</th>
                      <th className="py-3 px-4 text-blue-700 font-bold text-left border">Ingreso</th>
                      <th className="py-3 px-4 text-blue-700 font-bold text-left border">Entrega</th>
                      <th className="py-3 px-4 rounded-r-xl text-blue-700 font-bold text-center border">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reparaciones.length === 0 && (
                      <tr>
                        <td colSpan={9} className="text-center py-4">
                          No hay reparaciones registradas.
                        </td>
                      </tr>
                    )}
                    {reparaciones.map((rep) => (
                      <tr
                        key={rep.id}
                        className="hover:bg-blue-50 transition"
                      >
                        <td className="py-2 px-4 bg-white rounded-l-lg border border-blue-100">{rep.id}</td>
                        <td className="py-2 px-4 bg-white border border-blue-100">{rep.nombreCliente}</td>
                        <td className="py-2 px-4 bg-white border border-blue-100">{rep.equipo}</td>
                        <td className="py-2 px-4 bg-white border border-blue-100">{rep.descripcionFalla}</td>
                        <td className="py-2 px-4 bg-white border border-blue-100">{rep.estado}</td>
                        <td className="py-2 px-4 bg-white border border-blue-100">{rep.tecnicoAsignado || "-"}</td>
                        <td className="py-2 px-4 bg-white border border-blue-100">{rep.fechaIngreso}</td>
                        <td className="py-2 px-4 bg-white border border-blue-100">{rep.fechaEntrega || "-"}</td>
                        <td className="py-2 px-4 bg-white rounded-r-lg border border-blue-100 flex gap-2 justify-center">
                          <EditarButton id={rep.id!} />
                          <EliminarButton id={rep.id!} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}