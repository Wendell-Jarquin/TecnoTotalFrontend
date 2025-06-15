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
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-blue-100 shadow-lg px-13 py-6">
        <div className="flex flex-col items-center mb-10">
          <Link href="/dashboard" className="flex flex-col items-center">
            <Image src="/images/logo.svg" alt="Logo" width={120} height={120} className="rounded-full mb-2" />
            <span className="text-lg font-bold text-orange-700">TecnoTotal</span>
          </Link>
        </div>
        <nav className="flex flex-col gap-2 mt-6">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 font-semibold bg-orange-200 hover:scale-105 active:scale-95">  
            <FaClipboardList /> Dashboard
          </Link>
          <Link href="/clients" className="flex items-center gap-3 px-4 py-2 font-semibold hover:bg-orange-100 transition mb-3 hover:scale-105 active:scale-95">
            <FaUsers /> Gestión Clientes
          </Link>
          <Link href="/equipos/add" className="flex items-center gap-3 px-4 py-2 font-semibold hover:bg-orange-100 transition mb-3 hover:scale-105 active:scale-95">
            <FaLaptop /> Registro Equipos
          </Link>
          <Link href="/reparaciones" className="flex items-center gap-3 px-4 py-2  font-semibold hover:bg-orange-100 transition mb-3 hover:scale-105 active:scale-95">
            <FaTools /> Gestión Reparaciones
          </Link>
          <Link href="/technical" className="flex items-center gap-3 px-4 py-2  font-semibold hover:bg-orange-100 transition mb-3 hover:scale-105 active:scale-95">
            <FaUserCog /> Gestión Técnicos
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 px-4 py-2  text-red-700 font-semibold hover:bg-red-200 transition hover:scale-105 active:scale-95"
        >
          <FaSignOutAlt /> Cerrar Sesión
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="w-full bg-white shadow flex items-center justify-between px-6 py-4 border-b border-orange-500">
                <div className="flex-1 flex justify-center">
                  <span className="text-xl font-bold text-orange-700 tracking-wide">
                    GESTION DE CLIENTES
                  </span>
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

        {/* Cards */}
        <main className="flex-1 py-10 px-4 md:px-10 bg-gradient-to-br from-blue-50 to-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Gráfico de barras */}
            <div className="col-span-1 md:col-span-2 bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-t-4 border-blue-400">
              <h2 className="text-lg font-bold text-blue-700 mb-4">Reparaciones por Mes</h2>
              {chartData ? (
                <Bar
                  data={chartData}
                  className="w-full"
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          stepSize: 1, // <-- Esto hace que el contador vaya de 1 en 1
                          precision: 0, // Opcional: fuerza a que solo muestre enteros
                        },
                      },
                    },
                  }}
                />
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

