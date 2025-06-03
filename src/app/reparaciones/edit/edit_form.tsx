"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { obtenerReparacion, actualizarReparacion, Reparacion } from "../../reparaciones/reparaciones.api";

export default function EditReparacionForm({ reparacionId }: { reparacionId: string }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Reparacion>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (reparacionId) {
      obtenerReparacion(Number(reparacionId))
        .then((data) => {
          setValue("nombreCliente", data.nombreCliente);
          setValue("equipo", data.equipo);
          setValue("descripcionFalla", data.descripcionFalla);
          setValue("estado", data.estado);
          setValue("tecnicoAsignado", data.tecnicoAsignado || "");
          setValue("fechaIngreso", data.fechaIngreso);
          setValue("fechaEntrega", data.fechaEntrega || "");
          setLoading(false);
        })
        .catch(() => {
          setError("No se pudo cargar la reparación.");
          setLoading(false);
        });
    }
  }, [reparacionId, setValue]);

  const onSubmit = async (data: Reparacion) => {
    setError("");
    setSuccess("");
    try {
      await actualizarReparacion(Number(reparacionId), data);
      setSuccess("Reparación actualizada correctamente.");
      setTimeout(() => {
        router.push("/reparaciones");
      }, 1000);
    } catch (e: any) {
      setError(e.message || "Error al actualizar reparación.");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Cargando...</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow rounded p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Editar Reparación</h2>
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
          <input
            {...register("nombreCliente", { required: "El cliente es obligatorio" })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Cliente"
          />
          {errors.nombreCliente && (
            <span className="text-red-500 text-sm">{errors.nombreCliente.message as string}</span>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Equipo</label>
          <input
            {...register("equipo", { required: "El equipo es obligatorio" })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Equipo"
          />
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
          <input
            {...register("tecnicoAsignado")}
            className="w-full border px-3 py-2 rounded"
            placeholder="Técnico asignado"
          />
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
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}