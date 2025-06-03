"use client";

import { useEffect, useState } from "react";
import { fetchClientes, deleteCliente } from "./clients.api";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ClientsPage() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Usuario");
  const router = useRouter();

  useEffect(() => {
    cargarClientes();
    const fullName = localStorage.getItem("user_fullName");
    setUserName(fullName || "Usuario");
  }, []);

  const cargarClientes = async () => {
    setLoading(true);
    try {
      const result = await fetchClientes();
      setClientes(result.data || []);
    } catch {
      setClientes([]);
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Seguro que deseas eliminar este cliente?")) {
      await deleteCliente(id);
      cargarClientes();
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/clients/edit?id=${id}`);
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
          <Image src="/images/logo.svg" alt="Logo" width={40} height={40} className="rounded-full" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-xl font-bold text-gray-700 tracking-wide">CLIENTES DISPONIBLES</span>
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
          href="/clients/add"
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 font-medium transition"
        >
          Agregar Cliente
        </Link>
      </nav>

      {/* Tabla de clientes */}
      <div className="max-w-5xl mx-auto py-10">
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
                  <th className="py-2 px-4 border">Dirección</th>
                  <th className="py-2 px-4 border">Fecha de Nacimiento</th>
                  <th className="py-2 px-4 border">Activo</th>
                  <th className="py-2 px-4 border">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente) => (
                  <tr key={cliente.id} className="border-t">
                    <td className="py-2 px-4 border">{cliente.nombre}</td>
                    <td className="py-2 px-4 border">{cliente.email}</td>
                    <td className="py-2 px-4 border">{cliente.phoneNumber}</td>
                    <td className="py-2 px-4 border">{cliente.address}</td>
                    <td className="py-2 px-4 border">{cliente.dateOfBirth}</td>
                    <td className="py-2 px-4 border">{cliente.isActive ? "Sí" : "No"}</td>
                    <td className="py-2 px-4 border flex gap-2">
                      <button
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                        onClick={() => handleEdit(cliente.id)}
                      >
                        Editar
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        onClick={() => handleDelete(cliente.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
                {clientes.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-gray-400">
                      No hay clientes registrados.
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