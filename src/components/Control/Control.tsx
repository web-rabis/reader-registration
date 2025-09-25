import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useTranslation} from "@/contexts/LanguageContext.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useCallback,  useState} from "react";
import {adminControlService} from "@/services/admin-control-service.ts";
import {VisitStatusResponse} from "@/types/control.ts";
import {ReaderInfo} from "@/components/reader-info/ReaderInfo.tsx";
import {OrderInfo} from "@/components/order-info/OrderInfo.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {toast} from "@/components/ui/use-toast.ts";
import {UserCheck, UserMinus} from "lucide-react";

export function Control() {
    const {t} = useTranslation()
    const [queryString, setQueryString] = useState<string>("");
    const [visitStatus, setVisitStatus] = useState<VisitStatusResponse>(undefined);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const fetchVisitsStatus = useCallback(async () => {
        try {
            const response = await adminControlService.visitsStatus(queryString);
            if(response.data.status==="out"){
                await adminControlService.visitsCheckIn(response.data.reader.ticketNumber);
            } else if(response.data.status==="in"){
                await adminControlService.visitsCheckOut(response.data.reader.ticketNumber);
            }
            setVisitStatus(response.data);
            setQueryString("")
            setErrorMessage("");
        } catch (error) {
            setErrorMessage(error.response?.data?.error?.message);
            setVisitStatus(undefined);
            console.error(error.status);

        }
    }, [queryString,t]);

    const handleSearchChange = useCallback((value: string) => {
        setQueryString(value);
    }, []);


    return         <div>
        <Card>
            <CardTitle className={"pl-6 pr-6 pt-4 pb-2 mb-0 text-2xl"}>
                {t('control')}
            </CardTitle>
            <CardHeader>
                <Input
                    placeholder={t('searchControlPlaceholder')}
                    value={queryString}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && queryString.trim()) {
                            void fetchVisitsStatus();
                        }
                    }}
                    className="pl-8"
                />

            </CardHeader>
            <CardContent>
                {(errorMessage || (visitStatus && visitStatus.status!=="in"  && visitStatus.status!=="out")) && <Alert variant={"destructive"} className={"mb-3"}>
                    <AlertTitle>Внимание</AlertTitle>
                    <AlertDescription>
                        {visitStatus && visitStatus.status==="readerNotFound" && <p>Читатель не найден</p>}
                        {visitStatus && visitStatus.status==="ticketNumberOrBarcodeInvalid" && <p>Номер или штрих-код неверный</p>}
                        {visitStatus && visitStatus.status==="ticketNumberOrBarcodeRequired" && <p>Номер или штрих-код пустой</p>}
                        {visitStatus && visitStatus.status==="expired" && <p>Читательский билет просрочен, нужна перерегистрация</p>}
                        {visitStatus && visitStatus.status==="checkIin" && <p>Необходимо проверить ИИН читателя</p>}
                        {visitStatus && visitStatus.status==="activeOrders" && <p>У читателя есть активные заказы</p>}
                        {errorMessage!=="" && <p>{errorMessage}</p>}
                    </AlertDescription>
                </Alert>
                }
                <div>
                    {visitStatus && (visitStatus.status==="out" || visitStatus.status==="in") && (
                        <Alert variant={"default"} className={"mb-3"}>
                            <AlertDescription>
                                {visitStatus.status==="out" && <div className={"flex items-center text-green-600"}><UserCheck className={"mr-2"}/> <p>Читатель успешно прошел контроль</p></div>}
                                {visitStatus.status==="in" && <div className={"flex items-center text-indigo-700"}><UserMinus className={"mr-2"}/> <p>Читатель отмечен как вышедший</p></div>}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>

                {visitStatus && visitStatus.reader && <ReaderInfo reader={visitStatus.reader}/>}
                {(visitStatus && visitStatus.reader && visitStatus.orders.length === 0) &&
                    <div className="text-center py-8 text-muted-foreground">
                        {t('noOrders')}
                    </div>
                }
                {(visitStatus && visitStatus.reader && visitStatus.orders.length > 0) && (
                        visitStatus.orders.map((order) => (<OrderInfo order={order}/>))
                    )
                }
            </CardContent>
        </Card>
    </div>
}