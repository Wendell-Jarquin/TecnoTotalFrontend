import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import EditClientForm from './edit-form';

function ClientEditPage() {
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-orange-100 via-white to-orange-200">
      <Card className="w-full max-w-3xl p-6">
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent>
          <EditClientForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default ClientEditPage;