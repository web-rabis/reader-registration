
import { IdCard, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RegistrationResponse } from "@/types/api";

interface ReaderCardProps {
  registration: RegistrationResponse;
  open: boolean;
  onClose: () => void;
}

export function ReaderCard({ registration, open, onClose }: ReaderCardProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IdCard className="w-5 h-5" />
            Читательский билет
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-4 border rounded-lg" id="reader-card">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold">Библиотека</h2>
            <p className="text-sm text-muted-foreground">Читательский билет № {registration.id}</p>
          </div>
          <div className="space-y-2">
            <p><strong>ФИО:</strong> {registration.fullName}</p>
            <p><strong>Email:</strong> {registration.email}</p>
            <p><strong>Дата регистрации:</strong> {registration.date}</p>
            <p><strong>Статус:</strong> {registration.status === 'approved' ? 'Активный' : 'Не активный'}</p>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handlePrint} className="gap-2">
            <Printer className="w-4 h-4" />
            Печать
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
