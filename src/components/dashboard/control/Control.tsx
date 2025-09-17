import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {useTranslation} from "@/contexts/LanguageContext.tsx";
import {Input} from "@/components/ui/input.tsx";

export function Control() {

    const {t} = useTranslation()
    return         <div>
        <Card>
            <CardHeader>
                {t('control')}
            </CardHeader>
            <CardContent>
                <Input></Input>
            </CardContent>
        </Card>
    </div>
}