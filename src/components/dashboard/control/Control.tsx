import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {useTranslation} from "@/contexts/LanguageContext.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useCallback,  useState} from "react";
import {adminControlService} from "@/services/admin-control-service.ts";
import {VisitStatusResponse} from "@/types/control.ts";
import {ReaderInfo} from "@/components/dashboard/control/ReaderInfo.tsx";
import {OrderInfo} from "@/components/dashboard/control/OrderInfo.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";

export function Control() {
    const {t} = useTranslation()
    const [queryString, setQueryString] = useState<string>("");
    const [visitStatus, setVisitStatus] = useState<VisitStatusResponse>(undefined);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const fetchVisitsStatus = useCallback(async () => {
        try {
            const response = await adminControlService.visitsStatus(queryString);
            if(response.data.status==="out"){
                await adminControlService.visitsCheckIn(queryString);
            } else if(response.data.status==="in"){
                await adminControlService.visitsCheckOut(queryString);
            }
            setVisitStatus(response.data);
            setErrorMessage("");
        } catch (error) {
            setErrorMessage(error.response?.data?.error?.message);
            setVisitStatus(undefined);
            console.error(error.response?.data?.error?.message);

        }
    }, [queryString,t]);

    const handleSearchChange = useCallback((value: string) => {
        setQueryString(value);
    }, []);


    return         <div>
        <Card>
            <CardHeader>
                <Input
                    placeholder={t('searchPlaceholder')}
                    value={queryString}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && queryString.trim()) {
                            void fetchVisitsStatus();
                        }
                    }}
                    className="pl-8"
                />            </CardHeader>
            <CardContent>
                {(errorMessage || (visitStatus && visitStatus.status!=="in"  && visitStatus.status!=="out")) && <Alert variant={"destructive"} className={"mb-3"}>
                    <AlertTitle>Внимание</AlertTitle>
                    <AlertDescription>
                        {visitStatus && visitStatus.status==="expired" && <p>Читательский билет просрочен, нужна перерегистрация</p>}
                        {visitStatus && visitStatus.status==="checkIin" && <p>Необходимо проверить ИИН читателя</p>}
                        {visitStatus && visitStatus.status==="activeOrders" && <p>У читателя есть активные заказы</p>}
                        {errorMessage!=="" && <p>{errorMessage}</p>}
                    </AlertDescription>
                </Alert>
                }

                {visitStatus && <ReaderInfo reader={visitStatus.reader} visitStatus={visitStatus.status}/>}
                {!visitStatus || visitStatus.orders.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        {t('noOrders')}
                    </div>
                ) : (
                        visitStatus.orders.map((order) => (<OrderInfo order={order}/>))
                    )
                }
            </CardContent>
        </Card>
    </div>
}