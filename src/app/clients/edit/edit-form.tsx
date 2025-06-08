"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchClienteById, updateCliente } from "../clients.api";

export default function EditClientForm() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const clienteId = searchParams.get("id");

  useEffect(() => {
    if (clienteId) {
      fetchClienteById(Number(clienteId))
        .then((data) => {
          setValue("Nombre", data.Nombre);
          setValue("Email", data.Email);
          setValue("Telefono", data.Telefono);
          setValue("Direccion", data.Direccion);
          setLoading(false);
        })
        .catch(() => {
          setError("No se pudo cargar el cliente.");
          setLoading(false);
        });
    }
  }, [clienteId, setValue]);

  const onSubmit = async (data: any) => {
    setError("");
    setSuccess("");
    try {
      await updateCliente(Number(clienteId), data);
      setSuccess("Cliente actualizado correctamente.");
      setTimeout(() => {
        router.push("/clients");
      }, 1000);
    } catch (e: any) {
      setError(e.message || "Error al actualizar cliente.");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Cargando...</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow rounded p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Editar Cliente</h2>
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
            {...register("Nombre", { required: "El nombre es obligatorio" })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Nombre del cliente"
          />
          {errors.Nombre && (
            <span className="text-red-500 text-sm">{errors.Nombre.message as string}</span>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            {...register("Email", { required: "El email es obligatorio" })}
            type="email"
            className="w-full border px-3 py-2 rounded"
            placeholder="Email"
          />
          {errors.Email && (
            <span className="text-red-500 text-sm">{errors.Email.message as string}</span>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Teléfono</label>
          <input
            {...register("Telefono", { required: "El teléfono es obligatorio" })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Teléfono"
          />
          {errors.Telefono && (
            <span className="text-red-500 text-sm">{errors.Telefono.message as string}</span>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Dirección</label>
          <input
            {...register("Direccion", { required: "La dirección es obligatoria" })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Dirección"
          />
          {errors.Direccion && (
            <span className="text-red-500 text-sm">{errors.Direccion.message as string}</span>
          )}
        </div>
        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold text-lg"
          >
            Guardar Cambios
          </button>
          <button
            type="button"
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded font-semibold text-lg"
            onClick={() => router.back()}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}