const API_URL = "http://localhost:4000/tecnicos";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
}

export async function fetchTecnicos() {
  const res = await fetch(API_URL, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Error al obtener técnicos");
  return await res.json();
}

export async function fetchTecnicoById(id: number) {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Error al obtener técnico");
  return await res.json();
}

async function handleAdminResponse(res: Response) {
  if (res.status === 403) {
    throw new Error("Esta función solo puede ser hecha por un administrador");
  }
  if (!res.ok) {
    throw new Error("Error en la operación");
  }
  return await res.json();
}

export async function createTecnico(data: any) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleAdminResponse(res);
}

export async function updateTecnico(id: number, data: any) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleAdminResponse(res);
}

export async function deleteTecnico(id: number) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  // Si solo quieres true/false:
  if (res.status === 403) {
    throw new Error("Esta función solo puede ser hecha por un administrador");
  }
  if (!res.ok) throw new Error("Error al eliminar técnico");
  return true;
}