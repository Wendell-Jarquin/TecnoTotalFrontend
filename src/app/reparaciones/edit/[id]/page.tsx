import React from 'react';
import EditReparacionForm from '../edit_form';

export default function ReparacionEditPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen justufy-center items-center">
      <div className="w-full">
        <EditReparacionForm reparacionId={params.id} />
      </div>
    </div>
  );
}
