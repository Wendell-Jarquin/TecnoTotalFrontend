import AddReparacionForm from "./form_add";
import { Card } from "@/components/ui/card";
export default function AddReparacionPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-full max-w-4xl">
      <AddReparacionForm />
      </Card>
    </div>
  );
}