"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { deleteTecnico } from '../technical_api';

export default function DeleteTecnicoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tecnicoId = searchParams.get('id');

  const handleDelete = async () => {
    if (!tecnicoId) return;
    await deleteTecnico(Number(tecnicoId));
    router.push('/technical');
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Eliminar Técnico</CardTitle>
        </CardHeader>
        <CardContent>
          <p>¿Estás seguro de que deseas eliminar este técnico?</p>
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