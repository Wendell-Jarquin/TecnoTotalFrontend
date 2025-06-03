const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface Equipo {
  id?: number;
  nombre: string;
  marca: string;
  modelo: string;
  descripcion?: string;
  estado?: string;
}

// Crear equipo
export async function crearEquipo(equipo: Omit<Equipo, 'id'>) {
  const res = await fetch(`${API_URL}/equipos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(equipo),
  });
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

// Actualizar equipo
export async function actualizarEquipo(id: number, equipo: Partial<Equipo>) {
  const res = await fetch(`${API_URL}/equipos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(equipo),
  });
  if (!res.ok) throw new Error('Error al actualizar equipo');
  return res.json();
}

// Eliminar equipo
export async function eliminarEquipo(id: number) {
  const res = await fetch(`${API_URL}/equipos/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar equipo');
  return res.json();
}