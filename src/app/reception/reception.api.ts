const API_URL = "http://localhost:4000/reparaciones";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

export async function fetchReparaciones(page: number = 1, limit: number = 10) {
  const res = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Error al obtener reparaciones");
  // Devuelve { data: Reparacion[], pagination: {...} }
  return await res.json();
}

export async function fetchReparacionById(id: number) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Error al obtener reparación");
  return await res.json();
}

export async function createReparacion(data: any) {
  console.log('DTO recibido:', data);
  
  const res = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear reparación");
  return await res.json();
}

export async function updateReparacion(id: number, data: any) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar reparación");
  return await res.json();
}

export async function deleteReparacion(id: number) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar reparación");
  return await res.json();
}