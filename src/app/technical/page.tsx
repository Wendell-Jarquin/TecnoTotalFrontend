"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchTecnicos, deleteTecnico } from "./technical_api";

export default function TechnicalListPage() {
  const [tecnicos, setTecnicos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Usuario");
  const router = useRouter();

  useEffect(() => {
    cargarTecnicos();
    const fullName = localStorage.getItem("user_fullName");
    setUserName(fullName || "Usuario");
  }, []);

  const cargarTecnicos = async () => {
    setLoading(true);
    try {
      const data = await fetchTecnicos();
      setTecnicos(data);
    } catch {
      setTecnicos([]);
    }
    setLoading(false);
  };

  const handleDelete = (id: number) => {
    router.push(`/technical/delete?id=${id}`);
  };

  const handleEdit = (id: number) => {
    router.push(`/technical/edit?id=${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_fullName");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header superior */}
      <header className="w-full bg-white shadow flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-xl font-bold text-gray-700 tracking-wide">
            TÉCNICOS DISPONIBLES
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

      {/* Header de navegación */}
      <nav className="w-full bg-blue-50 shadow-inner flex justify-center gap-4 py-3 border-b border-blue-200">
        <Link
          href="/dashboard"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-medium transition"
        >
          Home
        </Link>
        <Link
          href="/technical/add"
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 font-medium transition"
        >
          Agregar Técnico
        </Link>
      </nav>

      {/* Tabla de técnicos */}
      <div className="max-w-4xl mx-auto py-10">
        <div className="bg-white shadow rounded-lg p-6">
          {loading ? (
            <div className="text-center text-gray-500">Cargando...</div>
          ) : (
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border">Nombre</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Teléfono</th>
                  <th className="py-2 px-4 border">Especialidad</th>
                  <th className="py-2 px-4 border">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tecnicos.map((tecnico) => (
                  <tr key={tecnico.id} className="border-t">
                    <td className="py-2 px-4 border">{tecnico.nombre}</td>
                    <td className="py-2 px-4 border">{tecnico.email}</td>
                    <td className="py-2 px-4 border">{tecnico.telefono}</td>
                    <td className="py-2 px-4 border">{tecnico.especialidad}</td>
                    <td className="py-2 px-4 border flex gap-2">
                      <button
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                        onClick={() => handleEdit(tecnico.id)}
                      >
                        Editar
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        onClick={() => handleDelete(tecnico.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
                {tecnicos.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-400">
                      No hay técnicos registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}