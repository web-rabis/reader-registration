
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RegistrationForm } from "@/components/RegistrationForm";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useTranslation } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {ReaderEditForm} from "@/components/dashboard/readers/ReaderEditForm.tsx";

export function EditRegistrationPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logout } = useAuth();

  const handleBack = () => {
    navigate("/admin/readers");
  };

  const handleLogout = () => {
    logout();
    toast.success(t('logoutSuccess'));
    navigate("/login");
  };

  return (
    <div className="container mx-auto py-6 space-y-6">

      <ReaderEditForm mode="edit" id={Number(id)} />
    </div>
  );
}

export default EditRegistrationPage;
