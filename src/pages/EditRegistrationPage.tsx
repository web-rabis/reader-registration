
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegistrationForm } from "@/components/RegistrationForm";
import { registrationService } from "@/services/registration-service";

export function EditRegistrationPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif">Редактирование заявки #{id}</h1>
        <Button variant="outline" onClick={handleBack}>
          Вернуться к списку
        </Button>
      </div>
      <RegistrationForm mode="edit" registrationId={Number(id)} />
    </div>
  );
}
