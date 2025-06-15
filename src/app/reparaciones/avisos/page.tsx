"use client";
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Avisar() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();

  const [form, setForm] = useState({
    correoCliente: '',
    nombreCliente: '',
    equipo: '',
    componentes: [''],
    detalles: '',
  });
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:4000/reparaciones/${id}`)
        .then(res => res.json())
        .then(data => {
          setForm(form => ({
            ...form,
            correoCliente: data.cliente?.Email || '',
            nombreCliente: data.nombreCliente || '',
            equipo: data.equipo || '',
          }));
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleComponenteChange = (idx, value) => {
    const nuevos = [...form.componentes];
    nuevos[idx] = value;
    setForm({ ...form, componentes: nuevos });
  };

  const agregarComponente = () => setForm({ ...form, componentes: [...form.componentes, ''] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:4000/notificaciones/avisar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setMensaje('¡Aviso enviado correctamente!');
    setForm({
      correoCliente: '',
      nombreCliente: '',
      equipo: '',
      componentes: [''],
      detalles: '',
    });
    setTimeout(() => {
      router.push("/reparaciones");
    }, 1200); // 1.2 segundos para mostrar el mensaje
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-xl p-8 border border-blue-100">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">Avisar al Cliente</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-black font-semibold mb-1">Correo del cliente</label>
            <input
              name="correoCliente"
              value={form.correoCliente}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-black"
            />
          </div>
          <div>
            <label className="block text-black font-semibold mb-1">Nombre del cliente</label>
            <input
              name="nombreCliente"
              value={form.nombreCliente}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-black"
            />
          </div>
          <div>
            <label className="block text-black font-semibold mb-1">Equipo</label>
            <input
              name="equipo"
              value={form.equipo}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-black"
            />
          </div>
          <div>
            <label className="block text-black font-semibold mb-1">Componentes usados</label>
            <div className="space-y-2">
              {form.componentes.map((comp, idx) => (
                <input
                  key={idx}
                  value={comp}
                  onChange={e => handleComponenteChange(idx, e.target.value)}
                  placeholder={`Componente ${idx + 1}`}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 text-black"
                />
              ))}
              <button
                type="button"
                onClick={agregarComponente}
                className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
              >
                + Agregar componente
              </button>
            </div>
          </div>
          <div>
            <label className="block text-black font-semibold mb-1">Detalles de la reparación</label>
            <textarea
              name="detalles"
              placeholder="Detalles de la reparación"
              value={form.detalles}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
              rows={4}
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition hover:scale-105 active:scale-95"
            >
              Enviar aviso
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition hover:scale-105 active:scale-95"
            >
              Regresar
            </button>
          </div>
        </form>
        {mensaje && <p className="mt-4 text-center text-green-600">{mensaje}</p>}
      </div>
    </div>
  );
}