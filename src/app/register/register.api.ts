const API_URL = "http://localhost:4000/auth/register";

export interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
}

export async function registerUser(data: RegisterPayload) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Error al registrar usuario");
  }
  return res.json();
}