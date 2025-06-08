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

  const handleDelete = (id: number) => {
    router.push(`/clients/delete?id=${id}`);
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
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-blue-100 shadow-lg px-13 py-6">
        <div className="flex flex-col items-center mb-10">
          <Link href="/dashboard" className="flex flex-col items-center">
            <Image src="/images/logo.svg" alt="Logo" width={120} height={120} className="rounded-full mb-2" />
            <span className="text-lg font-bold text-orange-700">TecnoTotal</span>
          </Link>
        </div>
        <nav className="flex flex-col gap-2 mt-6">
          <Link
            href="/clients/add"
            className="flex items-center gap-3 px-4 py-2 mb-8 text-white font-semibold bg-green-600 hover:bg-green-700 transition justify-center"
          >
            <FaUsers /> Agregar Cliente
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 font-semibold hover:bg-orange-100 transition mb-3">  
            <FaClipboardList /> Dashboard
          </Link>
          <Link href="/clients" className="flex items-center gap-3 px-4 py-2 font-semibold bg-orange-200">
            <FaUsers /> Gestión Clientes
          </Link>
          <Link href="/equipos/add" className="flex items-center gap-3 px-4 py-2 font-semibold hover:bg-orange-100 transition mb-3">
            <FaLaptop /> Registro Equipos
          </Link>
          <Link href="/reparaciones" className="flex items-center gap-3 px-4 py-2  font-semibold hover:bg-orange-100 transition mb-3">
            <FaTools /> Gestión Reparaciones
          </Link>
          <Link href="/technical" className="flex items-center gap-3 px-4 py-2  font-semibold hover:bg-orange-100 transition mb-3">
            <FaUserCog /> Gestión Técnicos
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 px-4 py-2  text-red-700 font-semibold hover:bg-red-200 transition"
        >
          <FaSignOutAlt /> Cerrar Sesión
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header superior */}
        <header className="w-full bg-white shadow flex items-center justify-between px-6 py-4 border-b border-orange-400">
                <div className="flex-1 flex justify-center">
                  <span className="text-xl font-bold text-orange-700 tracking-wide">
                    GESTION DE CLIENTES
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
                      <th className="py-3 px-4 rounded-l-xl text-blue-700 font-bold text-center">Nombre</th>
                      <th className="py-3 px-4 text-blue-700 font-bold text-center">Email</th>
                      <th className="py-3 px-4 text-blue-700 font-bold text-center">Teléfono</th>
                      <th className="py-3 px-4 text-blue-700 font-bold text-center">Dirección</th>
                      <th className="py-3 px-4 rounded-r-xl text-blue-700 font-bold text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientes.map((cliente) => (
                      <tr
                        key={cliente.clientes_id}
                        className="hover:bg-blue-50 transition"
                      >
                        <td className="py-2 px-4 bg-white rounded-l-lg border-blue-100 text-center">{cliente.Nombre}</td>
                        <td className="py-2 px-4 bg-white border-blue-100 text-center">{cliente.Email}</td>
                        <td className="py-2 px-4 bg-white border-blue-100 text-center">{cliente.Telefono}</td>
                        <td className="py-2 px-4 bg-white border-blue-100 text-center">{cliente.Direccion}</td>
                        <td className="py-2 px-4 bg-white rounded-r-lg border-blue-100 flex gap-2 justify-center">
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