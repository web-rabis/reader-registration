
import { Button } from "@/components/ui/button";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Link } from "react-router-dom";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useTranslation } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen paper-texture">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12">
          <div className="flex justify-between items-center mb-4">
              <div></div>
            <LanguageSelector />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-serif mb-4">{t('library')}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('welcomeMessage')}
            </p>
          </div>
        </header>
        <main className="animate-in">
          <RegistrationForm />
        </main>
      </div>
    </div>
  );
};

export default Index;
