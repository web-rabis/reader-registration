
import { PencilIcon, IdCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RegistrationResponse } from "@/types/api";

interface RegistrationCardProps {
  registration: RegistrationResponse;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  onEdit: (id: number) => void;
  onViewCard: (registration: RegistrationResponse) => void;
  getStatusLabel: (status: string) => string;
}

export function RegistrationCard({
  registration,
  onApprove,
  onReject,
  onEdit,
  onViewCard,
  getStatusLabel,
}: RegistrationCardProps) {
  return (
    <div className="p-4 border rounded-lg flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors">
      <div className="space-y-1">
        <p className="font-medium">{registration.fullName}</p>
        <p className="text-sm text-muted-foreground">{registration.email}</p>
        <p className="text-sm text-muted-foreground">Дата: {registration.date}</p>
        {registration.iin && (
          <p className="text-sm text-muted-foreground">ИИН: {registration.iin}</p>
        )}
        {registration.mobilePhone && (
          <p className="text-sm text-muted-foreground">
            Телефон: {registration.mobilePhone}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="secondary">{getStatusLabel(registration.status)}</Badge>
        {registration.status === "approved" && (
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600 hover:text-gray-700"
            onClick={() => onViewCard(registration)}
          >
            <IdCard className="w-4 h-4 mr-1" />
            Билет
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          className="text-blue-600 hover:text-blue-700"
          onClick={() => onEdit(registration.id)}
        >
          <PencilIcon className="w-4 h-4 mr-1" />
          Редактировать
        </Button>
        {registration.status === "pending" && (
          <>
            <Button
              variant="outline"
              size="sm"
              className="text-green-600 hover:text-green-700"
              onClick={() => onApprove(registration.id)}
            >
              Одобрить
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700"
              onClick={() => onReject(registration.id)}
            >
              Отклонить
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
