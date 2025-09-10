
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTranslation } from "@/contexts/LanguageContext";

interface SearchToggleProps {
  isAdvanced: boolean
  onToggle: (checked: boolean) => void
}

export function SearchToggle({ isAdvanced, onToggle }: SearchToggleProps) {
    const { t } = useTranslation();
  
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="search-mode"
        checked={isAdvanced}
        onCheckedChange={onToggle}
      />
      <Label htmlFor="search-mode">
          {t("advancedSearch")}
      </Label>
    </div>
  )
}
