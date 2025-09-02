
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { useTranslation } from "@/hooks/useTranslation.ts";
import {Reader} from "@/types/reader.ts";
import {Ean13} from "@/components/dashboard/Ean13.tsx";
import {printDiv} from "@/utils/print.ts";

interface ReaderCardProps {
  registration: Reader;
  open: boolean;
  onClose: () => void;
}

export function ReaderCard({ registration, open, onClose }: ReaderCardProps) {
  const { t } = useTranslation();

  const handlePrint = () => {
    printDiv('reader-card');
  };

  const getStatusText = (status: string) => {
    return status === 'approved' ? t('active') : t('inactive');
  };
    const formatter = new Intl.DateTimeFormat("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[400px]">
        <DialogHeader>
        </DialogHeader>
          <div className="space-y-4 p-4 border rounded-lg " id="reader-card">
          <div id={"readerCard"} style={{
              backgroundImage: `url(data:image/png;base64,${registration.typeCard.photo})`,
              display:"grid",
              gridTemplateColumns: "90px auto",
              width: "7.6cm",
              height: "4.5cm",
              border: "black solid 0px",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right",
              lineHeight: 1.2,
              fontFamily: "Tahoma, sans-serif",
          }}>
              <div>
                  <img src={`data:image/png;base64,${registration.photo}`} alt="Card" style={{
                      width: "90px",
                      height: "130px",
                      objectFit: "contain",
                      maxWidth: "90px",
                      maxHeight: "130px",
                  }} />
                  <Ean13 data12={registration.barcode}/>   {/* библиотека сама дорисует 13-ю цифру */}

              </div>
              <div style={{
                  marginLeft: "2px",
                  marginTop: "20px",
              }}>
                  <div style={{
                      fontSize: "13px"
                  }}>
                      <b>OQYRMAN BILETI</b> № {registration.ticketNumber}
                  </div>
                  <div style={{
                      marginTop: "2px",
                      fontSize: "14px",
                      fontWeight: "bold",
                  }}>
                      {registration.lastname}<br/>
                      {registration.firstname}<br/>
                      {registration.middlename}
                  </div>
                  <div style={{
                      marginTop: "2px",
                      marginLeft: "25px",
                      fontSize: "10px",
                  }}>
                      Tirkelgen kuni {formatter.format(new Date(registration.registrationDate))}<br/>
                      {registration.expirationDate && (<span>Merzimi {formatter.format(new Date(registration.expirationDate))} deiin</span>)}
                  </div>
                  <div style={{
                      fontSize: "10px",
                      marginTop: "2px",
                      marginLeft: "25px",
                  }}
                  >
                      Сайт: {registration.typeCard.web}<br/>
                      email: {registration.typeCard.email}<br/>
                      instagram: {registration.typeCard.instagram}
                  </div>

              </div>

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


