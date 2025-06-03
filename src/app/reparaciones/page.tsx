"use client";

import React, { useEffect, useState } from "react";
import { obtenerReparaciones, Reparacion } from "./reparaciones.api";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ReparacionesPage() {
  const [reparaciones, setReparaciones] = useState<Reparacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    obtenerReparaciones()
      .then((res) => {
        // Si la respuesta es un objeto con una propiedad de array, ajústalo aquí:
        if (Array.isArray(res)) {
          setReparaciones(res);
        } else if (Array.isArray(res.data)) {
          setReparaciones(res.data);
        } else if (Array.isArray(res.results)) {
          setReparaciones(res.results);
        } else {
          setReparaciones([]);
        }
      })
      .catch((e) => setError(e.message || "Error al cargar reparaciones"))
      .finally(() => setLoading(false));
  }, []);

  // Botón Editar
  const EditarButton = ({ id }: { id: number }) => (
    <Link
      href={`/reparaciones/edit/${id}`}
      className="px-2 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded text-xs font-semibold transition"
    >
      Editar
    </Link>
  );

  // Botón Eliminar
  const EliminarButton = ({ id }: { id: number }) => (
    <button
      onClick={() => router.push(`/reparaciones/delete?id=${id}`)}
      className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold transition"
    >
      Eliminar
    </button>
  );

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Lista de Reparaciones</h1>
      {loading && <p className="text-center">Cargando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Cliente</th>
                <th className="px-4 py-2 border">Equipo</th>
                <th className="px-4 py-2 border">Descripción Falla</th>
                <th className="px-4 py-2 border">Estado</th>
                <th className="px-4 py-2 border">Técnico</th>
                <th className="px-4 py-2 border">Ingreso</th>
                <th className="px-4 py-2 border">Entrega</th>
                <th className="px-4 py-2 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reparaciones.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-4">
                    No hay reparaciones registradas.
                  </td>
                </tr>
              )}
              {reparaciones.map((rep) => (
                <tr key={rep.id}>
                  <td className="px-4 py-2 border">{rep.id}</td>
                  <td className="px-4 py-2 border">{rep.nombreCliente}</td>
                  <td className="px-4 py-2 border">{rep.equipo}</td>
                  <td className="px-4 py-2 border">{rep.descripcionFalla}</td>
                  <td className="px-4 py-2 border">{rep.estado}</td>
                  <td className="px-4 py-2 border">{rep.tecnicoAsignado || "-"}</td>
                  <td className="px-4 py-2 border">{rep.fechaIngreso}</td>
                  <td className="px-4 py-2 border">{rep.fechaEntrega || "-"}</td>
                  <td className="px-4 py-2 border flex gap-2 justify-center">
                    <EditarButton id={rep.id!} />
                    <EliminarButton id={rep.id!} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}