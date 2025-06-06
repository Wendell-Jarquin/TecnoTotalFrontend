const API_URL = "http://localhost:4000/clientes";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
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

export async function fetchClientes() {
  const res = await fetch(API_URL, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Error al obtener clientes");
  return res.json();
}

export async function fetchClienteById(id: number) {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Error al obtener cliente");
  return await res.json();
}

export async function createCliente(data: any) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleAdminResponse(res);
}

export async function updateCliente(id: number, data: any) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleAdminResponse(res);
}

export async function deleteCliente(id: number) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleAdminResponse(res);
}