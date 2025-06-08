import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import EditTechnicalForm from './edit-form';

function TechnicalAddPage() {
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-orange-100 via-white to-orange-200">
      <Card className="w-full max-w-3xl p-6">
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent>
          <EditTechnicalForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default TechnicalAddPage;
