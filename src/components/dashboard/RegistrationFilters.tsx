
import { Search } from "lucide-react";
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

interface RegistrationFiltersProps {
  statusFilter: string;
  searchQuery: string;
  onStatusChange: (value: string) => void;
  onSearchChange: (value: string) => void;
}

export function RegistrationFilters({
  statusFilter,
  searchQuery,
  onStatusChange,
  onSearchChange,
}: RegistrationFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <CardTitle>{t('registrationRequests')}</CardTitle>
        <Select
          value={statusFilter}
          onValueChange={onStatusChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('statusFilter')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('all')}</SelectItem>
            <SelectItem value="pending">{t('pending')}</SelectItem>
            <SelectItem value="approved">{t('approved')}</SelectItem>
            <SelectItem value="rejected">{t('rejected')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
    </div>
  );
}
