import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import EditTechnicalForm from './edit-form';

function TechnicalAddPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Editar Técnico</CardTitle>
        </CardHeader>
        <CardContent>
          <EditTechnicalForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default TechnicalAddPage;
