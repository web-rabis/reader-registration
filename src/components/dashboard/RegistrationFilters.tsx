
import { Search, ArrowDownNarrowWide, ArrowUpWideNarrow } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { SearchToggle } from "@/components/dashboard/SearchToggle.tsx";
import {Label} from "@/components/ui/label.tsx";
import {ReaderSearchParams} from "@/types/reader.ts";
import {Paging} from "@/types/api.ts";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";

interface RegistrationFiltersProps {
  searchParams:ReaderSearchParams;
  paging: Paging;
  onStatusChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onExpirationLowChange: (value: string) => void;
  onExpirationHighChange: (value: string) => void;
  onAdvancedToggle: (value: boolean) => void;
}

export function RegistrationFilters({
  searchParams,
  paging,
  onStatusChange,
  onSearchChange,
  onExpirationLowChange,
  onExpirationHighChange,
  onAdvancedToggle,
}: RegistrationFiltersProps) {
  const { t } = useTranslation();
  const getSort = () =>{
      if(paging.orderBy===1)
        return <ArrowDownNarrowWide/>
      else
        return <ArrowUpWideNarrow />
  }

  return (
    <div className="space-y-4 border rounded-lg p-2" >
      <div className="flex justify-between items-center">
        <CardTitle>{t('readers')}</CardTitle>
        <Select
          value={searchParams.status}
          onValueChange={onStatusChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('statusFilter')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="*">{t('all')}</SelectItem>
            <SelectItem value="pending">{t('pending')}</SelectItem>
            <SelectItem value="rejected">{t('rejected')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('searchPlaceholder')}
          value={searchParams.query}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
        <div className="flex justify-between items-center">
            <SearchToggle isAdvanced={searchParams.advancedSearch} onToggle={onAdvancedToggle}></SearchToggle>
            <!--div className={"w-[350px] inline-flex items-center hidden]"}>
                <Label htmlFor="sort">{t('sort')}</Label>&nbsp;
                <Select value={paging.order}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={"ticketNumber"}>{t('ticketNumber')}</SelectItem>
                        <SelectItem value={"registrationDate"}>{t('registrationDate')}</SelectItem>
                        <SelectItem value={"fio"}>{t('fio')}</SelectItem>
                    </SelectContent>
                </Select>
                <div>
                    {paging.orderBy===1 && <Button><ArrowDownNarrowWide/></Button>}
                    {paging.orderBy!==1 && <Button><ArrowUpWideNarrow /></Button>}
                </div>
            </div!-->
        </div>
        {searchParams.advancedSearch && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div className="space-y-2 inline-flex items-center">
              <Label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700 w-[280px]">
                {t('expirationDate')}
              </Label>
                <Input
                    id="expirationDate"
                    type="date"
                    value={searchParams.expirationDateLow}
                    onChange={(e) => onExpirationLowChange(e.target.value)}
                    required
                    className="width-full"
                />
                <Input
                    id="expirationDate"
                    type="date"
                    value={searchParams.expirationDateHigh}
                    onChange={(e) => onExpirationHighChange(e.target.value)}
                    required
                    className="width-full"
                />
            </div>
          </div>
        )}
    </div>
  );
}
