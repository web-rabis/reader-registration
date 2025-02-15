
import { LoginForm } from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useTranslation } from "@/hooks/useTranslation";

const Login = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen paper-texture">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <div className="flex justify-between items-center mb-4">
            <Button variant="ghost" asChild>
              <Link to="/">← {t('back')}</Link>
            </Button>
            <LanguageSelector />
          </div>
          <h1 className="text-4xl font-serif mb-4">{t('login')}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('loginMessage')}
          </p>
        </header>
        <main className="animate-in">
          <LoginForm />
        </main>
      </div>
    </div>
  );
};

export default Login;
