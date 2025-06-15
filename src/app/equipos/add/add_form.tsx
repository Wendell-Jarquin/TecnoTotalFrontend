"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { crearEquipo } from '../equipo.api';
import { fetchClientes } from '../../clients/clients.api';
import Image from "next/image";
import Link from "next/link";
import { FaUsers, FaTools, FaClipboardList, FaUserCog, FaSignOutAlt, FaLaptop } from "react-icons/fa";

export default function AddEquipoForm() {
  const [form, setForm] = useState({
    marca: '',
    modelo: '',
    descripcion: '',
    estado: '',
  });
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [equipoId, setEquipoId] = useState<number | null>(null);
  const [clientes, setClientes] = useState<any[]>([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<any>(null);
  const [userName, setUserName] = useState("Usuario");
  const router = useRouter();

  useEffect(() => {
    fetchClientes().then(res => setClientes(res.data || res || []));
    const fullName = localStorage.getItem("user_fullName");
    setUserName(fullName || "Usuario");
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje(null);
    if (!clienteSeleccionado || !clienteSeleccionado.clientes_id) {
      setMensaje("Debes seleccionar un cliente.");
      setLoading(false);
      return;
    }

    const equipoData = {
      marca: form.marca,
      modelo: form.modelo,
      descripcion: form.descripcion,
      estado: form.estado,
      clienteId: Number(clienteSeleccionado.clientes_id),
    };
    try {
      const equipoCreado = await crearEquipo(equipoData);
      setEquipoId(equipoCreado.id);
      setMensaje('Equipo agregado correctamente');
      setForm({ marca: '', modelo: '', descripcion: '', estado: '' });
      setTimeout(() => {
        router.push("/reception/add");
      }, 1000);
    } catch (error: any) {
      setMensaje(error.message || 'Error al agregar equipo');
    } finally {
      setLoading(false);
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
          <Link href="/equipos/add" className="flex items-center gap-3 px-4 py-2 font-semibold bg-orange-200">
            <FaLaptop /> Registro Equipos
          </Link>
          <Link href="/reparaciones" className="flex items-center gap-3 px-4 py-2 font-semibold hover:bg-orange-100 transition mb-3">
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
        <header className="w-full bg-white shadow flex items-center justify-between px-6 py-4 border-b border-orange-500">
          <div className="flex-1 flex justify-center">
            <span className="text-xl font-bold text-orange-700 tracking-wide">
              REGISTRAR EQUIPO
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
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-white shadow rounded p-8"
          >
            <h2 className="text-2xl font-bold text-dark-700 text-center mb-2">Nuevo Equipo</h2>
            {/* Select de Cliente */}
            <div className="flex flex-col gap-1">
              <label htmlFor="cliente" className="font-medium">Cliente*</label>
              <select
                id="cliente"
                name="cliente"
                required
                className="p-3 rounded border border-gray-300 focus:border-blue-400 focus:outline-none text-lg transition"
                value={clienteSeleccionado ? String(clienteSeleccionado.clientes_id) : ""}
                onChange={e => {
                  const selected = clientes.find(c => String(c.clientes_id) === e.target.value);
                  setClienteSeleccionado(selected || null);
                }}
              >
                <option value="" disabled>Seleccione un cliente</option>
                {clientes.map(cliente => (
                  <option key={cliente.clientes_id} value={String(cliente.clientes_id)}>
                    {cliente.nombre || cliente.Nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="marca" className="font-medium">Marca*</label>
              <input
                type="text"
                name="marca"
                id="marca"
                value={form.marca}
                onChange={handleChange}
                required
                maxLength={100}
                className="p-3 rounded border border-gray-300 focus:border-blue-400 focus:outline-none text-lg transition"
                placeholder="Marca"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="modelo" className="font-medium">Modelo*</label>
              <input
                type="text"
                name="modelo"
                id="modelo"
                value={form.modelo}
                onChange={handleChange}
                required
                maxLength={100}
                className="p-3 rounded border border-gray-300 focus:border-blue-400 focus:outline-none text-lg transition"
                placeholder="Modelo"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="descripcion" className="font-medium">Descripción</label>
              <textarea
                name="descripcion"
                id="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                maxLength={1000}
                className="p-3 rounded border border-gray-300 focus:border-blue-400 focus:outline-none text-lg transition min-h-[60px] resize-vertical"
                placeholder="Descripción del equipo"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="estado" className="font-medium">Estado</label>
              <input
                type="text"
                name="estado"
                id="estado"
                value={form.estado}
                onChange={handleChange}
                maxLength={50}
                className="p-3 rounded border border-gray-300 focus:border-blue-400 focus:outline-none text-lg transition"
                placeholder="Estado"
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading ? 'Agregando...' : 'Agregar Equipo'}
              </button>
                 <button
                type="button"
                onClick={() => router.back()}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded font-semibold"
              >
                Cancelar
              </button>
            </div>
            {mensaje && (
              <p
                className={`text-center font-semibold mt-2 ${
                  mensaje.includes('correctamente') ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {mensaje}
              </p>
            )}
          </form>
        </main>
      </div>
    </div>
  );
}