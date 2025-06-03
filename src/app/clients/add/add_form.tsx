"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCliente } from "../clients.api";

export default function AddClientForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setError("");
    setSuccess("");
    // Solo deja los campos requeridos
    const allowed = ["Nombre", "Telefono", "Direccion", "Email"];
    Object.keys(data).forEach(key => {
      if (!allowed.includes(key)) delete data[key];
    });

    console.log("Payload enviado:", data);
    try {
      await createCliente(data);
      setSuccess("Cliente registrado correctamente.");
      reset();
      setTimeout(() => {
        router.push("/equipos/add");
      }, 1000);
    } catch (e: any) {
      setError(e.message || "Error al registrar cliente.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow rounded p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Registrar Cliente</h2>
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
          <label className="block mb-1 font-medium">Nombre</label>
          <input
            {...register("Nombre", { required: "El nombre es obligatorio", minLength: 3, maxLength: 100 })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Nombre del cliente"
          />
          {errors.Nombre && (
            <span className="text-red-500 text-sm">{errors.Nombre.message as string}</span>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Teléfono</label>
          <input
            {...register("Telefono", { required: "El teléfono es obligatorio", minLength: 5, maxLength: 15 })}
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
            {...register("Direccion", { required: "La dirección es obligatoria", minLength: 3, maxLength: 255 })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Dirección"
          />
          {errors.Direccion && (
            <span className="text-red-500 text-sm">{errors.Direccion.message as string}</span>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            {...register("Email", {
              required: "El email es obligatorio",
              minLength: 3,
              maxLength: 100,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email no válido",
              },
            })}
            type="email"
            className="w-full border px-3 py-2 rounded"
            placeholder="Email"
          />
          {errors.Email && (
            <span className="text-red-500 text-sm">{errors.Email.message as string}</span>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
        >
          Registrar Cliente
        </button>
      </form>
    </div>
  );
}