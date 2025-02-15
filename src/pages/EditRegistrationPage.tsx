
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RegistrationForm } from "@/components/RegistrationForm";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useTranslation } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export function EditRegistrationPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logout } = useAuth();

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleLogout = () => {
    logout();
    toast.success(t('logoutSuccess'));
    navigate("/login");
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-serif">{t('registrationEdit')} #{id}</h1>
          <Button variant="outline" onClick={handleBack}>
            {t('back')}
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <Button variant="outline" onClick={handleLogout}>
            {t('logout')}
          </Button>
        </div>
      </div>
      <RegistrationForm mode="edit" registrationId={Number(id)} />
    </div>
  );
}

export default EditRegistrationPage;
