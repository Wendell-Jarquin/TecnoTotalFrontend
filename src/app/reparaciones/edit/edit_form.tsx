"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { obtenerReparacion, actualizarReparacion, Reparacion } from "../../reparaciones/reparaciones.api";

export default function EditReparacionForm({ reparacionId }: { reparacionId: string }) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Reparacion>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userName, setUserName] = useState("Usuario");
  const [imagen, setImagen] = useState<string | null>(null); // NUEVO
  const router = useRouter();

  useEffect(() => {
    const fullName = localStorage.getItem("user_fullName");
    setUserName(fullName || "Usuario");
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
          setImagen(data.imagen || null); // NUEVO
          setLoading(false);
        })
        .catch(() => {
          setError("No se pudo cargar la reparación.");
          setLoading(false);
        });
    }
  }, [reparacionId, setValue]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_fullName");
    window.location.href = "/";
  };

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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white shadow flex items-center justify-between px-6 py-4 border-b border-orange-500">
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

      {/* Formulario */}
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-3xl bg-white shadow rounded overflow-auto max-h-screen p-8 my-10">
          <h2 className="text-3xl font-bold text-center mb-6">Editar Reparación</h2>
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block mb-1 font-medium">Cliente</label>
              <input
                {...register("nombreCliente", { required: "El cliente es obligatorio" })}
                className="w-full border px-4 py-3 rounded text-lg"
                placeholder="Cliente"
              />
              {errors.nombreCliente && (
                <span className="text-red-500 text-sm">{errors.nombreCliente.message as string}</span>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">Equipo (ID)</label>
              <input
                type="text"
                value={watch ? watch("equipo") : ""}
                readOnly
                className="w-full border px-4 py-3 rounded text-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                placeholder="ID del equipo"
                tabIndex={-1}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Descripción de la Falla</label>
              <textarea
                {...register("descripcionFalla", { required: "La descripción de la falla es obligatoria" })}
                className="w-full border px-4 py-3 rounded text-lg"
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
                className="w-full border px-4 py-3 rounded text-lg"
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
                className="w-full border px-4 py-3 rounded text-lg"
                placeholder="Técnico asignado"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Fecha de Ingreso</label>
              <input
                {...register("fechaIngreso", { required: "La fecha de ingreso es obligatoria" })}
                type="date"
                className="w-full border px-4 py-3 rounded text-lg"
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
                className="w-full border px-4 py-3 rounded text-lg"
              />
            </div>

            {/* MOSTRAR IMAGEN SI EXISTE */}
            {imagen && (
              <div className="mb-8 flex flex-col items-center">
                <span className="text-lg font-semibold text-blue-700 mb-2 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" />
                  </svg>
                  Imagen asociada a la reparación
                </span>
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-sm">
                  <img
                    src={`http://localhost:4000${imagen}`}
                    alt="Imagen de la reparación"
                    className="max-h-48 rounded shadow-md"
                  />
                </div>
              </div>
            )}
            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg  hover:scale-105 active:scale-95"
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold text-lg hover:scale-105 active:scale-95"
                onClick={() => router.back()}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}