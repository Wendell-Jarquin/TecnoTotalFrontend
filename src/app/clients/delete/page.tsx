"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

import { deleteCliente } from "../clients.api";

export default function DeleteClientePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clienteId = searchParams.get("id");

  const handleDelete = async () => {
    if (!clienteId) return;
    await deleteCliente(Number(clienteId));
    router.push("/clients");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Eliminar Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <p>¿Estás seguro de que deseas eliminar este cliente?</p>
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