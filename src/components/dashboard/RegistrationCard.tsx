
import { PencilIcon, IdCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RegistrationResponse } from "@/types/api";
import { useTranslation } from "@/contexts/LanguageContext";

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
  const { t } = useTranslation();

  const handleApprove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onApprove(registration.id);
  };

  const handleReject = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onReject(registration.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(registration.id);
  };

  const handleViewCard = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onViewCard(registration);
  };

  return (
    <div className="p-4 border rounded-lg flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors">
      <div className="space-y-1">
        <p className="font-medium">{registration.fullName}</p>
        <p className="text-sm text-muted-foreground">{registration.email}</p>
        <p className="text-sm text-muted-foreground">{t('date')}: {registration.date}</p>
        {registration.iin && (
          <p className="text-sm text-muted-foreground">{t('iin')}: {registration.iin}</p>
        )}
        {registration.mobilePhone && (
          <p className="text-sm text-muted-foreground">
            {t('mobilePhone')}: {registration.mobilePhone}
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
            onClick={handleViewCard}
          >
            <IdCard className="w-4 h-4 mr-1" />
            {t('ticket')}
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          className="text-blue-600 hover:text-blue-700"
          onClick={handleEdit}
        >
          <PencilIcon className="w-4 h-4 mr-1" />
          {t('edit')}
        </Button>
        {registration.status === "pending" && (
          <>
            <Button
              variant="outline"
              size="sm"
              className="text-green-600 hover:text-green-700"
              onClick={handleApprove}
            >
              {t('approve')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700"
              onClick={handleReject}
            >
              {t('reject')}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
