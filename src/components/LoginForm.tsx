
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/auth-service";
import { useTranslation } from "@/hooks/useTranslation";

export function LoginForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authService.login(credentials);
      localStorage.setItem("librarian-token", response.data.token);
      toast.success(t('loginSuccess'));
      navigate("/dashboard");
    } catch (error) {
      toast.error(t('loginError'));
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">{t('librarianLogin')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">{t('username')}</Label>
            <Input
              id="username"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              required
              className="transition-all duration-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t('password')}</Label>
            <Input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
              className="transition-all duration-200"
            />
          </div>
          <Button type="submit" className="w-full">
            {t('login')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
