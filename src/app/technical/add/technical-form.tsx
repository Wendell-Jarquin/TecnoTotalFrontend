"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTecnico } from "../technical_api";

export default function TechnicalForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setError("");
    setSuccess("");
    try {
      await createTecnico(data);
      setSuccess("Técnico agregado correctamente.");
      reset();
      setTimeout(() => {
        router.push("/technical");
      }, 1000);
    } catch (e: any) {
      setError(e.message || "Error al agregar técnico.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow rounded p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Agregar Técnico</h2>
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
            <span className="text-red-500 text-sm">{errors.nombre.message}</span>
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
            <span className="text-red-500 text-sm">{errors.email.message}</span>
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
            <span className="text-red-500 text-sm">{errors.telefono.message}</span>
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
            <span className="text-red-500 text-sm">{errors.especialidad.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
        >
          Guardar Técnico
        </button>
      </form>
    </div>
  );
}