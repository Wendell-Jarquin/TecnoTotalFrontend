"use client";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

import { useRouter } from "next/navigation";
import { FaUsers, FaTools, FaClipboardList, FaUserCog, FaSignOutAlt, FaLaptop } from "react-icons/fa";
import { FaFileExcel } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { obtenerReparaciones } from "../reparaciones/reparaciones.api";

export default function Dashboard() {
  const [userName, setUserName] = useState("Usuario");
  const [chartData, setChartData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fullName = localStorage.getItem("user_fullName");
    setUserName(fullName || "Usuario");
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await obtenerReparaciones();
        const reparaciones = response.data;

        const meses = [
          "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
          "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        const counts = Array(12).fill(0);

        reparaciones.forEach(r => {
          const fecha = new Date(r.fechaIngreso);
          const mes = fecha.getMonth();
          counts[mes]++;
        });

        setChartData({
          labels: meses,
          datasets: [
            {
              label: "Reparaciones por mes",
              data: counts,
              backgroundColor: "#60a5fa",
            },
          ],
        });
      } catch (e) {
        console.error("Error al obtener reparaciones:", e);
        setChartData(null);
      }
    }
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_fullName");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex">
      {/* Sidebar pegado a la izquierda */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-blue-100 shadow-lg px-8 py-6">
        <div className="flex flex-col items-center mb-10">
          <Image src="/images/logo.svg" alt="Logo" width={60} height={60} className="rounded-full mb-2" />
          <span className="text-lg font-bold text-blue-700">TecnoTotal</span>
        </div>
        {/* Elimina el botón principal: Agregar Cliente */}
        <nav className="flex flex-col gap-2 mt-6">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 rounded-lg text-blue-700 font-semibold bg-blue-100 hover:bg-blue-200 transition">
            <FaClipboardList /> Dashboard
          </Link>
          <Link href="/clients" className="flex items-center gap-3 px-4 py-2 rounded-lg text-green-700 font-semibold hover:bg-green-100 transition">
            <FaUsers /> Gestión Clientes
          </Link>
          <Link href="/equipos/add" className="flex items-center gap-3 px-4 py-2 rounded-lg text-purple-700 font-semibold hover:bg-purple-100 transition">
            <FaLaptop /> Registro Equipos
          </Link>
          <Link href="/reparaciones" className="flex items-center gap-3 px-4 py-2 rounded-lg text-purple-700 font-semibold hover:bg-purple-100 transition">
            <FaTools /> Gestión Reparaciones
          </Link>
          <Link href="/usuarios/gestionar" className="flex items-center gap-3 px-4 py-2 rounded-lg text-yellow-700 font-semibold hover:bg-yellow-100 transition">
            <FaUserCog /> Gestión Técnicos
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition"
        >
          <FaSignOutAlt /> Cerrar Sesión
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="w-full bg-white shadow flex items-center justify-between px-6 py-4 border-b border-blue-100">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.svg" alt="Logo" width={40} height={40} className="rounded-full" />
            <span className="text-xl font-bold text-gray-700 tracking-wide">PANEL DE ADMINISTRACION</span>
          </div>
        </header>

        {/* Cards */}
        <main className="flex-1 py-10 px-4 md:px-10 bg-gradient-to-br from-blue-50 to-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Gráfico de barras */}
            <div className="col-span-1 md:col-span-2 bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-t-4 border-blue-400">
              <h2 className="text-lg font-bold text-blue-700 mb-4">Reparaciones por Mes</h2>
              {chartData ? (
                <Bar data={chartData} className="w-full" />
              ) : (
                <div className="text-gray-400">Cargando gráfico...</div>
              )}
            </div>
            {/* Recuadro para reporte */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center border-t-4 border-green-400">
              <FaFileExcel className="text-green-600 mb-3" size={48} />
              <span className="text-lg font-bold text-gray-700 mb-4">Crear reporte en Excel</span>
              <a
                href="http://localhost:4000/excel/reparaciones"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition text-center w-full block"
              >
                Descargar Excel
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

