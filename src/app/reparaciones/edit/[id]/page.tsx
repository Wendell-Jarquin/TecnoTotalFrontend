import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import EditReparacionForm from '../edit_form';

export default function ReparacionEditPage({ params }: { params: { id: string } }) {
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-orange-100 via-white to-orange-200">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent>
          <EditReparacionForm reparacionId={params.id} />
        </CardContent>
      </Card>
    </div>
  );
}
