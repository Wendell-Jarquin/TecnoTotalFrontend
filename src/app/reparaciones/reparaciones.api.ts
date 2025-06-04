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

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
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

// Crear una reparación (solo admin)
export async function crearReparacion(reparacion: Omit<Reparacion, "id">) {
  console.log("Token en localStorage:", localStorage.getItem("token"));
  console.log("Headers que se enviarán:", getAuthHeaders());
  const res = await fetch(`${API_URL}/reparaciones`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(reparacion),
  });
  if (res.status === 403) throw new Error("Esta función solo puede ser hecha por un administrador");
  if (!res.ok) throw new Error("Error al crear reparación");
  return res.json();
}

// Actualizar una reparación (solo admin)
export async function actualizarReparacion(id: number, reparacion: Partial<Reparacion>) {
  const res = await fetch(`${API_URL}/reparaciones/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(reparacion),
  });
  if (res.status === 403) throw new Error("Esta función solo puede ser hecha por un administrador");
  if (!res.ok) throw new Error("Error al actualizar reparación");
  return res.json();
}

// Reemplazar una reparación (solo admin)
export async function reemplazarReparacion(id: number, reparacion: Reparacion) {
  const res = await fetch(`${API_URL}/reparaciones/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(reparacion),
  });
  if (res.status === 403) throw new Error("Esta función solo puede ser hecha por un administrador");
  if (!res.ok) throw new Error("Error al reemplazar reparación");
  return res.json();
}

// Eliminar una reparación (solo admin)
export async function eliminarReparacion(id: number) {
  const res = await fetch(`${API_URL}/reparaciones/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (res.status === 403) throw new Error("Esta función solo puede ser hecha por un administrador");
  if (!res.ok) throw new Error("Error al eliminar reparación");
  return res.json();
}