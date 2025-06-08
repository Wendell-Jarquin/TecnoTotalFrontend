import React from 'react';
import AddEquipoForm from './add_form';
import { Card } from '@/components/ui/card';
const AddEquipoPage: React.FC = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-orange-100 via-white to-orange-200">
      <Card className="w-full ">
      <AddEquipoForm />
      </Card>
    </div>
  );
};

export default AddEquipoPage;