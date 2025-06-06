"use client";

import { useEffect, useState } from "react";
import { fetchClientes, deleteCliente } from "./clients.api";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaUsers, FaTools, FaClipboardList, FaUserCog, FaSignOutAlt, FaLaptop } from "react-icons/fa";

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
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-blue-100 shadow-lg py-8 px-4">
        <div className="flex flex-col items-center mb-10">
          <Image src="/images/logo.svg" alt="Logo" width={60} height={60} className="rounded-full mb-2" />
          <span className="text-lg font-bold text-blue-700">TecnoTotal</span>
        </div>
        {/* Botón principal: Agregar Cliente */}
        <Link
          href="/clients/add"
          className="flex items-center gap-3 px-4 py-2 mb-8 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition justify-center"
        >
          <FaUsers /> Agregar Cliente
        </Link>
        {/* Otros botones, separados */}
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
        {/* Header superior */}
        <header className="w-full bg-white shadow flex items-center justify-between px-6 py-4 border-b border-blue-100">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.svg" alt="Logo" width={40} height={40} className="rounded-full" />
            <span className="text-xl font-bold text-gray-700 tracking-wide">GESTION DE CLIENTES</span>
          </div>
        </header>

        {/* Tabla de clientes */}
        <div className="max-w-6xl mx-auto py-10 px-2 w-full">
          <div className="bg-white shadow-xl rounded-2xl p-6 border border-blue-100">
            {loading ? (
              <div className="text-center text-gray-500">Cargando...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-2">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-100 to-blue-50">
                      <th className="py-3 px-4 rounded-l-xl text-blue-700 font-bold text-left">Nombre</th>
                      <th className="py-3 px-4 text-blue-700 font-bold text-left">Email</th>
                      <th className="py-3 px-4 text-blue-700 font-bold text-left">Teléfono</th>
                      <th className="py-3 px-4 text-blue-700 font-bold text-left">Dirección</th>
                      <th className="py-3 px-4 rounded-r-xl text-blue-700 font-bold text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientes.map((cliente) => (
                      <tr
                        key={cliente.clientes_id}
                        className="hover:bg-blue-50 transition"
                      >
                        <td className="py-2 px-4 bg-white rounded-l-lg border border-blue-100">{cliente.Nombre}</td>
                        <td className="py-2 px-4 bg-white border border-blue-100">{cliente.Email}</td>
                        <td className="py-2 px-4 bg-white border border-blue-100">{cliente.Telefono}</td>
                        <td className="py-2 px-4 bg-white border border-blue-100">{cliente.Direccion}</td>
                        <td className="py-2 px-4 bg-white rounded-r-lg border border-blue-100 flex gap-2 justify-center">
                          <button
                            className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow transition"
                            onClick={() => handleEdit(cliente.clientes_id)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-2.828 1.172H7v-2a4 4 0 011.172-2.828z"/></svg>
                            Editar
                          </button>
                          <button
                            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow transition"
                            onClick={() => handleDelete(cliente.clientes_id)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                    {clientes.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center py-6 text-gray-400 bg-white rounded-lg">
                          No hay clientes registrados.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}