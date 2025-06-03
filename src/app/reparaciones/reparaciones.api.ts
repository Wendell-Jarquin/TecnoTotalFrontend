const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface Reparacion {
  id?: number;
  nombreCliente: string;
  equipo: string;
  descripcionFalla: string;
  estado: string;
  tecnicoAsignado?: string;
  fechaIngreso: string;
  fechaEntrega?: string;
}

// Obtener todas las reparaciones
export async function obtenerReparaciones(): Promise<Reparacion[]> {
  const res = await fetch(`${API_URL}/reparaciones`);
  if (!res.ok) throw new Error("Error al obtener reparaciones");
  return res.json();
}

// Obtener una reparación por ID
export async function obtenerReparacion(id: number): Promise<Reparacion> {
  const res = await fetch(`${API_URL}/reparaciones/${id}`);
  if (!res.ok) throw new Error("Reparación no encontrada");
  return res.json();
}

// Crear una reparación
export async function crearReparacion(reparacion: Omit<Reparacion, "id">) {
  const res = await fetch(`${API_URL}/reparaciones`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reparacion),
  });
  if (!res.ok) throw new Error("Error al crear reparación");
  return res.json();
}

// Actualizar una reparación
export async function actualizarReparacion(id: number, reparacion: Partial<Reparacion>) {
  const res = await fetch(`${API_URL}/reparaciones/${id}`, {
    method: "PATCH", // <--- CAMBIA PUT POR PATCH
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reparacion),
  });
  if (!res.ok) throw new Error("Error al actualizar reparación");
  return res.json();
}

// Reemplazar una reparación
export async function reemplazarReparacion(id: number, reparacion: Reparacion) {
  const res = await fetch(`${API_URL}/reparaciones/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reparacion),
  });
  if (!res.ok) throw new Error("Error al reemplazar reparación");
  return res.json();
}

// Eliminar una reparación
export async function eliminarReparacion(id: number) {
  const res = await fetch(`${API_URL}/reparaciones/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar reparación");
  return res.json();
}