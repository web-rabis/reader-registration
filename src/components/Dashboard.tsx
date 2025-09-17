
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCallback, useEffect, useState, useMemo } from "react";
import { ReaderCard } from "./dashboard/readers/ReaderCard.tsx";
import { RegistrationFilters } from "./dashboard/readers/RegistrationFilters.tsx";
import { RegistrationCard } from "./dashboard/readers/RegistrationCard.tsx";
import { RegistrationPagination } from "./dashboard/RegistrationPagination";
import { useTranslation } from "@/contexts/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";
import { useAuth } from "@/contexts/AuthContext";
import {ReaderListResponse, Reader, ReaderSearchParams, initReaderSearchParams} from "@/types/admin-api";
import {adminReaderService} from "@/services/admin-service.ts";
import { loadFromStorage, saveToStorage } from "@/utils/stateStorage";
import {Paging} from "@/types/api.ts";
import {adminDictionaryService} from "@/services/admin-dictionary-service.ts";
import {ReaderCropPhoto} from "@/components/dashboard/readers/ReaderCropPhoto.tsx";
import {SelectItem, SelectTrigger, SelectValue, SelectContent, Select} from "@/components/ui/select.tsx";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import newReaderPage from "@/pages/NewReaderPage.tsx";
import {Readers} from "@/components/dashboard/readers/Readers.tsx";
import {Control} from "@/components/dashboard/control/Control.tsx";
import {Employees} from "@/components/dashboard/readers/Employees.tsx";
export function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logout } = useAuth();
  const [tabValue,setTabValue]=useState("readers");
    const handleLogout = useCallback(() => {
        logout();
        toast.success(t('logoutSuccess'));
    }, [logout, t]);

  console.log(tabValue)
  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto p-6 min-w-[760px]">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif">{t('dashboard')}</h1>
        <div className="flex gap-4 items-center">
          <LanguageSelector />
          <Button variant="outline" onClick={handleLogout}>
            {t('logout')}
          </Button>
        </div>
      </div>
        <Tabs defaultValue={"readers"} value={tabValue} onValueChange={(value)=>{setTabValue(value);}}>
            <TabsList>
                <TabsTrigger value={"readers"} ><CardTitle>{t('readers')}</CardTitle></TabsTrigger>
                {/*<TabsTrigger value={"employees"} disabled={false}><CardTitle>{t('employees')}</CardTitle></TabsTrigger>*/}
                <TabsTrigger value={"control"} disabled={true}><CardTitle>{t('control')}</CardTitle></TabsTrigger>
            </TabsList>
        </Tabs>
        {tabValue==='readers'  && <Readers readerType={tabValue}/>}
        {tabValue==='employees'  && <Employees />}
        {tabValue==='control'  && <Control/>}
    </div>
  );
}
