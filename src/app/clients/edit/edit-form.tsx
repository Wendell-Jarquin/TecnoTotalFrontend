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
  const [userName, setUserName] = useState("Usuario");
  const router = useRouter();
  const searchParams = useSearchParams();
  const clienteId = searchParams.get("id");

  useEffect(() => {
    const fullName = localStorage.getItem("user_fullName");
    setUserName(fullName || "Usuario");
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_fullName");
    window.location.href = "/";
  };

  if (loading) {
    return <div className="text-center py-10">Cargando...</div>;
  }

  return (
    <div className="min-h-full">
      {/* Header */}
      <header className="w-full bg-white shadow flex items-center justify-between px-6 py-4 border-b border-orange-500">
        <div className="flex-1 flex justify-center">
          <span className="text-xl font-bold text-orange-700 tracking-wide">
            EDITAR CLIENTE
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
        <div className="w-full max-w-lg bg-white shadow rounded p-8 my-10">
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg hover:scale-105 active:scale-95"
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