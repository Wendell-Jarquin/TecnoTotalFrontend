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
  const [userName, setUserName] = useState("Usuario");
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

  useEffect(() => {
    const fullName = localStorage.getItem("user_fullName");
    setUserName(fullName || "Usuario");
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
      className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded shadow transition text-base font-semibold"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-2.828 1.172H7v-2a4 4 0 011.172-2.828z"/>
      </svg>
      Editar
    </Link>
  );

  // Botón Eliminar
  const EliminarButton = ({ id }: { id: number }) => (
    <button
      onClick={() => router.push(`/reparaciones/delete?id=${id}`)}
      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition text-base font-semibold"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M6 18L18 6M6 6l12 12"/>
      </svg>
      Eliminar
    </button>
  );

  const AvisarButton = ({ id }: { id: number }) => {
    const router = useRouter();
    return (
      <button
        onClick={() => router.push(`/reparaciones/avisos?id=${id}`)}
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow transition text-base font-semibold"
        title="Ir a notificaciones"
      >
        📧 Avisar Cliente
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-blue-100 shadow-lg px-13 py-6">
        <Link href="/dashboard" className="flex flex-col items-center">
            <Image src="/images/logo.svg" alt="Logo" width={120} height={120} className="rounded-full mb-2" />
            <span className="text-lg font-bold text-orange-700">TecnoTotal</span>
        </Link>
        <Link
          href="/clients/add"
          className="flex items-center mt-6 gap-3 px-4 py-2 mb-8  text-white font-semibold bg-green-600 hover:bg-green-700 transition justify-center"
        >
          <FaComputer /> Reparar Equipo
        </Link>
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
          <Link href="/reparaciones" className="flex items-center gap-3 px-4 py-2 font-semibold bg-orange-200">
            <FaTools /> Gestión Reparaciones
          </Link>
          <Link href="/technical" className="flex items-center gap-3 px-4 py-2 font-semibold hover:bg-orange-100 transition mb-3">
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
        <header className="w-full bg-white shadow flex items-center justify-between px-6 py-4 border-b border-orange-400">
                <div className="flex-1 flex justify-center">
                  <span className="text-xl font-bold text-orange-700 tracking-wide">
                    GESTION DE REPARACIONES
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

        {/* Tabla de reparaciones */}
        <main className="flex-1 py-10 px-4 md:px-10 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-8xl mx-auto">
            {loading && <p className="text-center">Cargando...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!loading && !error && (
              <div className="bg-white shadow-xl rounded-2xl p-6 border border-blue-100">
              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-2 bg-white  shadow-lg">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-100 to-blue-50">
                      <th className="py-3 px-4 rounded-l-xl text-blue-700 font-bold text-left ">ID</th>
                      <th className="py-3 px-4 text-blue-700 font-bold text-left ">Cliente</th>
                      <th className="py-3 px-4 text-blue-700 font-bold text-left ">Equipo</th>
                      <th className="py-3 px-4 text-blue-700 font-bold text-left ">Descripción Falla</th>
                      <th className="py-3 px-4 text-blue-700 font-bold text-left ">Estado</th>
                      <th className="py-3 px-4 text-blue-700 font-bold text-left ">Técnico</th>
                      <th className="py-3 px-4 text-blue-700 font-bold text-left ">Ingreso</th>
                      <th className="py-3 px-4 text-blue-700 font-bold text-left ">Entrega</th>
                      <th className="py-3 px-4 rounded-r-xl text-blue-700 font-bold text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reparaciones.length === 0 && (
                      <tr>
                        <td colSpan={9} className="text-center py-6 text-gray-400 bg-white rounded-lg">
                          No hay reparaciones registradas.
                        </td>
                      </tr>
                    )}
                    {reparaciones.map((rep) => (
                      <tr
                        key={rep.id}
                      >
                        <td className="py-2 px-4 bg-white rounded-l-lg  border-blue-100">{rep.id}</td>
                        <td className="py-2 px-4 bg-white  border-blue-100">{rep.nombreCliente}</td>
                        <td className="py-2 px-4 bg-white  border-blue-100">{rep.equipo}</td>
                        <td className="py-2 px-4 bg-white border-blue-100">{rep.descripcionFalla}</td>
                        <td className="py-2 px-4 bg-white  border-blue-100">{rep.estado}</td>
                        <td className="py-2 px-4 bg-white border-blue-100">{rep.tecnicoAsignado || "-"}</td>
                        <td className="py-2 px-4 bg-white  border-blue-100">{rep.fechaIngreso}</td>
                        <td className="py-2 px-4 bg-white border-blue-100">{rep.fechaEntrega || "-"}</td>
                        <td className="py-2 px-4 flex gap-2 mt-3 justify-center">
                          <EditarButton id={rep.id!} />
                          <EliminarButton id={rep.id!} />
                          <AvisarButton id={rep.id!} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}