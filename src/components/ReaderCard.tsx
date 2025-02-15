
import { IdCard, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RegistrationResponse } from "@/types/api";
import { useTranslation } from "@/hooks/useTranslation";

interface ReaderCardProps {
  registration: RegistrationResponse;
  open: boolean;
  onClose: () => void;
}

export function ReaderCard({ registration, open, onClose }: ReaderCardProps) {
  const { t } = useTranslation();

  const handlePrint = () => {
    window.print();
  };

  const getStatusText = (status: string) => {
    return status === 'approved' ? t('active') : t('inactive');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IdCard className="w-5 h-5" />
            {t('readerCard')}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-4 border rounded-lg" id="reader-card">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold">{t('library')}</h2>
            <p className="text-sm text-muted-foreground">
              {t('readerCardNumber')} {registration.id}
            </p>
          </div>
          <div className="space-y-2">
            <p><strong>{t('fullName')}:</strong> {registration.fullName}</p>
            <p><strong>{t('email')}:</strong> {registration.email}</p>
            <p><strong>{t('registrationDate')}:</strong> {registration.date}</p>
            <p><strong>{t('status')}:</strong> {getStatusText(registration.status)}</p>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handlePrint} className="gap-2">
            <Printer className="w-4 h-4" />
            {t('print')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
