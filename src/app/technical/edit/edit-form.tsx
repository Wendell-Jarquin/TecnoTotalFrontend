"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchTecnicoById, updateTecnico } from "../technical_api";

export default function EditTechnicalForm() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const tecnicoId = searchParams.get("id");

  useEffect(() => {
    if (tecnicoId) {
      fetchTecnicoById(Number(tecnicoId))
        .then((data) => {
          setValue("nombre", data.nombre);
          setValue("email", data.email);
          setValue("telefono", data.telefono);
          setValue("especialidad", data.especialidad);
          setLoading(false);
        })
        .catch(() => {
          setError("No se pudo cargar el técnico.");
          setLoading(false);
        });
    }
  }, [tecnicoId, setValue]);

  const onSubmit = async (data: any) => {
    setError("");
    setSuccess("");
    try {
      await updateTecnico(Number(tecnicoId), data);
      setSuccess("Técnico actualizado correctamente.");
      setTimeout(() => {
        router.push("/technical");
      }, 1000);
    } catch (e: any) {
      setError(e.message || "Error al actualizar técnico.");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Cargando...</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow rounded p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Editar Técnico</h2>
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
          <label className="block mb-1 font-medium">Nombre completo</label>
          <input
            {...register("nombre", { required: "El nombre es obligatorio" })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Nombre del técnico"
          />
          {errors.nombre && (
            <span className="text-red-500 text-sm">{errors.nombre.message as string}</span>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            {...register("email", { required: "El email es obligatorio" })}
            type="email"
            className="w-full border px-3 py-2 rounded"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message as string}</span>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Teléfono</label>
          <input
            {...register("telefono", { required: "El teléfono es obligatorio" })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Teléfono"
          />
          {errors.telefono && (
            <span className="text-red-500 text-sm">{errors.telefono.message as string}</span>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Especialidad</label>
          <input
            {...register("especialidad", { required: "La especialidad es obligatoria" })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Especialidad"
          />
          {errors.especialidad && (
            <span className="text-red-500 text-sm">{errors.especialidad.message as string}</span>
          )}
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