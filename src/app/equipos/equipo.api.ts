const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface Equipo {
  id?: number;
  marca: string;
  modelo: string;
  descripcion?: string;
  estado?: string;
}

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
}

// Crear equipo (solo admin)
export async function crearEquipo(equipo: Omit<Equipo, 'id'>) {
  const res = await fetch(`${API_URL}/equipos`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(equipo),
  });
  if (res.status === 403) throw new Error("Esta función solo puede ser hecha por un administrador");
  if (!res.ok) throw new Error('Error al crear equipo');
  return res.json();
}

// Obtener todos los equipos
export async function obtenerEquipos(): Promise<Equipo[]> {
  const res = await fetch(`${API_URL}/equipos`);
  if (!res.ok) throw new Error('Error al obtener equipos');
  return res.json();
}

// Obtener un equipo por ID
export async function obtenerEquipo(id: number): Promise<Equipo> {
  const res = await fetch(`${API_URL}/equipos/${id}`);
  if (!res.ok) throw new Error('Equipo no encontrado');
  return res.json();
}

// Actualizar equipo (solo admin)
export async function actualizarEquipo(id: number, equipo: Partial<Equipo>) {
  const res = await fetch(`${API_URL}/equipos/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(equipo),
  });
  if (res.status === 403) throw new Error("Esta función solo puede ser hecha por un administrador");
  if (!res.ok) throw new Error('Error al actualizar equipo');
  return res.json();
}

// Eliminar equipo (solo admin)
export async function eliminarEquipo(id: number) {
  const res = await fetch(`${API_URL}/equipos/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (res.status === 403) throw new Error("Esta función solo puede ser hecha por un administrador");
  if (!res.ok) throw new Error('Error al eliminar equipo');
  return res.json();
}