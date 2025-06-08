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

  const handleCancel = () => {
    router.push("/technical");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-12 mt-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Agregar Técnico</h2>
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
          <label className="block mb-1 font-semibold text-gray-700">Nombre completo</label>
          <input
            {...register("nombre", { required: "El nombre es obligatorio" })}
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:border-blue-400 text-lg"
            placeholder="Nombre del técnico"
          />
          {errors.nombre && (
            <span className="text-red-500 text-sm">{errors.nombre.message}</span>
          )}
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Email</label>
          <input
            {...register("email", { required: "El email es obligatorio" })}
            type="email"
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:border-blue-400 text-lg"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Teléfono</label>
          <input
            {...register("telefono", { required: "El teléfono es obligatorio" })}
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:border-blue-400 text-lg"
            placeholder="Teléfono"
          />
          {errors.telefono && (
            <span className="text-red-500 text-sm">{errors.telefono.message}</span>
          )}
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Especialidad</label>
          <input
            {...register("especialidad", { required: "La especialidad es obligatoria" })}
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:border-blue-400 text-lg"
            placeholder="Especialidad"
          />
          {errors.especialidad && (
            <span className="text-red-500 text-sm">{errors.especialidad.message}</span>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="w-full md:w-auto px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            Guardar Técnico
          </button>
        </div>
      </form>
    </div>
  );
}