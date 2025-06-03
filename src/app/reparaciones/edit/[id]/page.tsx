import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import EditReparacionForm from '../edit_form';

export default function ReparacionEditPage({ params }: { params: { id: string } }) {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Editar Reparación</CardTitle>
        </CardHeader>
        <CardContent>
          <EditReparacionForm reparacionId={params.id} />
        </CardContent>
      </Card>
    </div>
  );
}
