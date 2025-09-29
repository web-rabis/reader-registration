
import {CardTitle} from "@/components/ui/card";
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
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Readers} from "@/components/dashboard/readers/Readers.tsx";
import {Control} from "@/components/control/Control.tsx";
import {Employees} from "@/components/dashboard/readers/Employees.tsx";
import imgLogo from '@/components/img/logo2.png'
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
    <div>
        <Tabs defaultValue={"readers"} value={tabValue} onValueChange={(value)=>{setTabValue(value);}}>
            <TabsList>
                <TabsTrigger value={"readers"} ><CardTitle>{t('readers')}</CardTitle></TabsTrigger>
                {/*<TabsTrigger value={"employees"} disabled={false}><CardTitle>{t('employees')}</CardTitle></TabsTrigger>*/}
                <TabsTrigger value={"control"} disabled={false}><CardTitle>{t('control')}</CardTitle></TabsTrigger>
            </TabsList>
        </Tabs>
        {tabValue==='readers'  && <Readers readerType={tabValue}/>}
        {tabValue==='employees'  && <Employees />}
        {tabValue==='control'  && <Control/>}
    </div>
  );
}
