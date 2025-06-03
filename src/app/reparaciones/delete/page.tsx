"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { eliminarReparacion } from '../reparaciones.api';

export default function DeleteReparacionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reparacionId = searchParams.get('id');

  const handleDelete = async () => {
    if (!reparacionId) return;
    await eliminarReparacion(Number(reparacionId));
    router.push('/reparaciones');
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Eliminar Reparación</CardTitle>
        </CardHeader>
        <CardContent>
          <p>¿Estás seguro de que deseas eliminar esta reparación?</p>
          <div className="flex gap-4 mt-4">
            <Button variant="destructive" onClick={handleDelete}>
              Sí, eliminar
            </Button>
            <Button variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}