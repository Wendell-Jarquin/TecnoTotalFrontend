"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createReparacion } from "../../reception/reception.api";
import { fetchClientes } from "../../clients/clients.api";
import { fetchTecnicos } from "../../technical/technical_api";
import { obtenerEquipos } from "../../equipos/equipo.api";

export default function AddReparacionForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [clientes, setClientes] = useState<any[]>([]);
  const [tecnicos, setTecnicos] = useState<any[]>([]);
  const [equipos, setEquipos] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Cargar clientes
    fetchClientes().then(res => setClientes(res.data || res || []));
    // Cargar tecnicos
    fetchTecnicos().then(res => setTecnicos(res || []));
    // Cargar equipos
    obtenerEquipos().then(res => setEquipos(res || []));
  }, []);

  const onSubmit = async (data: any) => {
    setError("");
    setSuccess("");
    // Solo enviar los campos requeridos y seleccionados
    const payload = {
      nombreCliente: data.nombreCliente,
      equipo: data.equipo,
      descripcionFalla: data.descripcionFalla,
      estado: data.estado,
      tecnicoAsignado: data.tecnicoAsignado || undefined,
      fechaIngreso: data.fechaIngreso,
      fechaEntrega: data.fechaEntrega || undefined,
    };
    try {
      await createReparacion(payload);
      setSuccess("Reparación registrada correctamente.");
      reset();
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (e: any) {
      setError(e.message || "Error al registrar reparación.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow rounded p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Registrar Reparación</h2>
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
          <label className="block mb-1 font-medium">Cliente</label>
          <select
            {...register("nombreCliente", { required: "El cliente es obligatorio" })}
            className="w-full border px-3 py-2 rounded"
            defaultValue=""
          >
            <option value="" disabled>Seleccione un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.nombre || cliente.Nombre}>
                {cliente.nombre || cliente.Nombre}
              </option>
            ))}
          </select>
          {errors.nombreCliente && (
            <span className="text-red-500 text-sm">{errors.nombreCliente.message as string}</span>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Equipo</label>
          <select
            {...register("equipo", { required: "El equipo es obligatorio" })}
            className="w-full border px-3 py-2 rounded"
            defaultValue=""
          >
            <option value="" disabled>Seleccione un equipo</option>
            {equipos.map((equipo) => (
              <option key={equipo.id} value={equipo.nombre}>
                {equipo.nombre} ({equipo.marca} {equipo.modelo})
              </option>
            ))}
          </select>
          {errors.equipo && (
            <span className="text-red-500 text-sm">{errors.equipo.message as string}</span>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Descripción de la Falla</label>
          <textarea
            {...register("descripcionFalla", { required: "La descripción de la falla es obligatoria" })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Descripción de la falla"
          />
          {errors.descripcionFalla && (
            <span className="text-red-500 text-sm">{errors.descripcionFalla.message as string}</span>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Estado</label>
          <select
            {...register("estado", { required: "El estado es obligatorio" })}
            className="w-full border px-3 py-2 rounded"
            defaultValue=""
          >
            <option value="" disabled>Seleccione estado</option>
            <option value="Recibido">Recibido</option>
            <option value="En reparación">En reparación</option>
            <option value="Dado de alta">Dado de alta</option>
          </select>
          {errors.estado && (
            <span className="text-red-500 text-sm">{errors.estado.message as string}</span>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Técnico Asignado</label>
          <select
            {...register("tecnicoAsignado")}
            className="w-full border px-3 py-2 rounded"
            defaultValue=""
          >
            <option value="">Sin técnico asignado</option>
            {tecnicos.map((tecnico) => (
              <option key={tecnico.id} value={tecnico.nombre}>
                {tecnico.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Fecha de Ingreso</label>
          <input
            {...register("fechaIngreso", { required: "La fecha de ingreso es obligatoria" })}
            type="date"
            className="w-full border px-3 py-2 rounded"
          />
          {errors.fechaIngreso && (
            <span className="text-red-500 text-sm">{errors.fechaIngreso.message as string}</span>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Fecha de Entrega (opcional)</label>
          <input
            {...register("fechaEntrega")}
            type="date"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
        >
          Registrar Reparación
        </button>
      </form>
    </div>
  );
}