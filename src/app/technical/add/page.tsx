import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import TechnicalForm from './technical-form';

function TechnicalAddPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Agregar Técnico</CardTitle>
        </CardHeader>
        <CardContent>
          <TechnicalForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default TechnicalAddPage;
