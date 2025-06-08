"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { crearEquipo } from '../equipo.api';
import { fetchClientes } from '../../clients/clients.api'; // Ajusta la ruta si es necesario

interface EquipoFormData {
  marca: string;
  modelo: string;
  descripcion?: string;
  estado?: string;
}

const initialForm: EquipoFormData = {
  marca: '',
  modelo: '',
  descripcion: '',
  estado: '',
};

const AddEquipoForm: React.FC = () => {
  const [form, setForm] = useState<EquipoFormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [equipoId, setEquipoId] = useState<number | null>(null);
  const [clientes, setClientes] = useState<any[]>([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetchClientes().then(res => setClientes(res.data || res || []));
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
    console.log("clienteSeleccionado:", clienteSeleccionado);
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
      clienteId: Number(clienteSeleccionado.clientes_id), // ¡Esto está bien!
    };
    console.log('Enviando equipoData:', equipoData);
    try {
      const equipoCreado = await crearEquipo(equipoData);
      setEquipoId(equipoCreado.id);
      setMensaje('Equipo agregado correctamente');
      setForm(initialForm);
      setTimeout(() => {
        router.push("/reception/add");
      }, 1000);
    } catch (error: any) {
      setMensaje(error.message || 'Error al agregar equipo');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br to-blue-100 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 border border-blue-100"
      >
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-2">Nuevo Equipo</h2>
        {/* Select de Cliente */}
        <div className="flex flex-col gap-1">
          <label htmlFor="cliente" className="font-semibold text-gray-700">Cliente*</label>
          <select
            id="cliente"
            name="cliente"
            required
            className="p-3 rounded-lg border border-gray-300 focus:border-blue-400 focus:outline-none text-lg transition"
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
        {/* Campo ID solo lectura */}
        <div className="flex flex-col gap-1">
          <label htmlFor="id" className="font-semibold text-gray-700">ID</label>
          <input
            type="text"
            name="id"
            id="id"
            value={equipoId ?? ''}
            readOnly
            className="p-3 rounded-lg border border-gray-300 bg-gray-100 text-lg"
            placeholder="ID (autogenerado)"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="marca" className="font-semibold text-gray-700">Marca*</label>
          <input
            type="text"
            name="marca"
            id="marca"
            value={form.marca}
            onChange={handleChange}
            required
            maxLength={100}
            className="p-3 rounded-lg border border-gray-300 focus:border-blue-400 focus:outline-none text-lg transition"
            placeholder="Marca"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="modelo" className="font-semibold text-gray-700">Modelo*</label>
          <input
            type="text"
            name="modelo"
            id="modelo"
            value={form.modelo}
            onChange={handleChange}
            required
            maxLength={100}
            className="p-3 rounded-lg border border-gray-300 focus:border-blue-400 focus:outline-none text-lg transition"
            placeholder="Modelo"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="descripcion" className="font-semibold text-gray-700">Descripción</label>
          <textarea
            name="descripcion"
            id="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            maxLength={1000}
            className="p-3 rounded-lg border border-gray-300 focus:border-blue-400 focus:outline-none text-lg transition min-h-[60px] resize-vertical"
            placeholder="Descripción del equipo"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="estado" className="font-semibold text-gray-700">Estado</label>
          <input
            type="text"
            name="estado"
            id="estado"
            value={form.estado}
            onChange={handleChange}
            maxLength={50}
            className="p-3 rounded-lg border border-gray-300 focus:border-blue-400 focus:outline-none text-lg transition"
            placeholder="Estado"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-3 mt-2">
          <button
            type="button"
            onClick={handleBack}
            className="w-full md:w-auto px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
          >
            ← Regresar
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`w-full md:w-auto px-4 py-2 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? 'Agregando...' : 'Agregar Equipo'}
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
    </div>
  );
};

export default AddEquipoForm;