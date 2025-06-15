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
  const [userName, setUserName] = useState("Usuario");
  const router = useRouter();
  const searchParams = useSearchParams();
  const tecnicoId = searchParams.get("id");

  useEffect(() => {
    const fullName = localStorage.getItem("user_fullName");
    setUserName(fullName || "Usuario");
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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white shadow flex items-center justify-between px-6 py-4 border-b border-orange-500">
        <div className="flex-1 flex justify-center">
          <span className="text-xl font-bold text-orange-700 tracking-wide">
            EDITAR TÉCNICO
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

      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white shadow rounded-3xl p-12 mx-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Editar Técnico</h2>
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
              <label className="block mb-1 font-medium">Nombre completo</label>
              <input
                {...register("nombre", { required: "El nombre es obligatorio" })}
                className="w-full border px-4 py-3 rounded text-lg"
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
                className="w-full border px-4 py-3 rounded text-lg"
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
                className="w-full border px-4 py-3 rounded text-lg"
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
                className="w-full border px-4 py-3 rounded text-lg"
                placeholder="Especialidad"
              />
              {errors.especialidad && (
                <span className="text-red-500 text-sm">{errors.especialidad.message as string}</span>
              )}
            </div>
            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold text-lg hover:scale-105 active:scale-95 rounded-lg"
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded font-semibold text-lg hover:scale-105 active:scale-95 rounded-lg"
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