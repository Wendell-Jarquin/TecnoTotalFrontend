const API_URL = "http://localhost:4000/tecnicos";

export async function fetchTecnicos() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener técnicos");
  return await res.json();
}

export async function fetchTecnicoById(id: number) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Error al obtener técnico");
  return await res.json();
}

export async function createTecnico(data: any) {
  const res = await fetch("http://localhost:4000/tecnicos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al agregar técnico");
  return await res.json();
}

export async function updateTecnico(id: number, data: any) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar técnico");
  return await res.json();
}

export async function deleteTecnico(id: number) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar técnico");
  return true;
}