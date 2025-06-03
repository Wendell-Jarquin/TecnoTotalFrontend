"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [userName, setUserName] = useState("Usuario");
  const router = useRouter();

  useEffect(() => {
    // Recupera el nombre completo del usuario guardado en localStorage
    const fullName = localStorage.getItem("user_fullName");
    setUserName(fullName || "Usuario");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_fullName");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header superior */}
      <header className="w-full bg-white shadow flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Image src="/images/logo.svg" alt="Logo" width={40} height={40} className="rounded-full" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-xl font-bold text-gray-700 tracking-wide">PANEL DE ADMINISTRACION</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold cursor-default">
            {userName}
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded font-semibold ml-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Header de navegación */}
      <nav className="w-full bg-blue-50 shadow-inner flex justify-center gap-4 py-3 border-b border-blue-200">
        <Link href="/technical" className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 font-medium transition">
            Gestión Tecnicos
        </Link>
        <Link href="/clients/add" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-medium transition">
            Registro Clientes
        </Link>
        <Link href="/equipos/add" className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 font-medium transition">
            Registro Equipos
        </Link>
        <Link href="/reparaciones" className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 font-medium transition">
           Gestión Reparaciones
        </Link>
        <Link href="/clientes/gestionar" className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 font-medium transition">
          Gestión Clientes
        </Link>
        <Link href="/usuarios/gestionar" className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600 font-medium transition">
          Gestión Tecnicos
        </Link>


      </nav>

      {/* Body principal */}
      <main className="container mx-auto py-10 px-4 flex flex-col items-center">
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
          <div className="flex-1 bg-white rounded-xl shadow-lg p-8 min-h-[200px] flex items-center justify-center">
            {/* Contenido libre 1 */}
            <span className="text-gray-400">Contenido 1</span>
          </div>
          <div className="flex-1 bg-white rounded-xl shadow-lg p-8 min-h-[200px] flex items-center justify-center">
            {/* Contenido libre 2 */}
            <span className="text-gray-400">Contenido 2</span>
          </div>
        </div>
      </main>
    </div>
  );
}

