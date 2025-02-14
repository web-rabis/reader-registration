
import { Button } from "@/components/ui/button";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen paper-texture">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <div className="flex justify-end mb-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Вход для библиотекарей</Link>
            </Button>
          </div>
          <h1 className="text-4xl font-serif mb-4">Библиотека</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Добро пожаловать в нашу библиотеку. Для получения читательского билета, пожалуйста,
            заполните форму регистрации ниже.
          </p>
        </header>
        <main className="animate-in">
          <RegistrationForm />
        </main>
      </div>
    </div>
  );
};

export default Index;
