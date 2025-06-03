"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { crearEquipo } from '../equipo.api';

interface EquipoFormData {
  nombre: string;
  marca: string;
  modelo: string;
  descripcion?: string;
  estado?: string;
}

const initialForm: EquipoFormData = {
  nombre: '',
  marca: '',
  modelo: '',
  descripcion: '',
  estado: '',
};

const AddEquipoForm: React.FC = () => {
  const [form, setForm] = useState<EquipoFormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje(null);
    try {
      await crearEquipo(form);
      setMensaje('Equipo agregado correctamente');
      setForm(initialForm);
      setTimeout(() => {
        router.push("/reception/add");
      }, 1000);
    } catch (error: any) {
      setMensaje(error.message || 'Error al agregar equipo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 400,
        margin: '2rem auto',
        padding: '2rem',
        borderRadius: '10px',
        background: '#f9f9f9',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
      }}
    >
      <h2 style={{ textAlign: 'center', margin: 0 }}>Nuevo Equipo</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label htmlFor="nombre" style={{ fontWeight: 500 }}>Nombre*</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          maxLength={100}
          style={{
            padding: '0.5rem',
            borderRadius: 4,
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label htmlFor="marca" style={{ fontWeight: 500 }}>Marca*</label>
        <input
          type="text"
          name="marca"
          id="marca"
          value={form.marca}
          onChange={handleChange}
          required
          maxLength={100}
          style={{
            padding: '0.5rem',
            borderRadius: 4,
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label htmlFor="modelo" style={{ fontWeight: 500 }}>Modelo*</label>
        <input
          type="text"
          name="modelo"
          id="modelo"
          value={form.modelo}
          onChange={handleChange}
          required
          maxLength={100}
          style={{
            padding: '0.5rem',
            borderRadius: 4,
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label htmlFor="descripcion" style={{ fontWeight: 500 }}>Descripción</label>
        <textarea
          name="descripcion"
          id="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          maxLength={1000}
          style={{
            padding: '0.5rem',
            borderRadius: 4,
            border: '1px solid #ccc',
            fontSize: '1rem',
            minHeight: 60,
            resize: 'vertical',
          }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label htmlFor="estado" style={{ fontWeight: 500 }}>Estado</label>
        <input
          type="text"
          name="estado"
          id="estado"
          value={form.estado}
          onChange={handleChange}
          maxLength={50}
          style={{
            padding: '0.5rem',
            borderRadius: 4,
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: '0.7rem',
          borderRadius: 4,
          border: 'none',
          background: loading ? '#aaa' : '#0070f3',
          color: '#fff',
          fontWeight: 600,
          fontSize: '1rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s',
        }}
      >
        {loading ? 'Agregando...' : 'Agregar Equipo'}
      </button>
      {mensaje && (
        <p
          style={{
            textAlign: 'center',
            color: mensaje.includes('correctamente') ? 'green' : 'red',
            margin: 0,
            fontWeight: 500,
          }}
        >
          {mensaje}
        </p>
      )}
    </form>
  );
};

export default AddEquipoForm;