
import { LoginForm } from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen paper-texture">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <div className="flex justify-start mb-4">
            <Button variant="ghost" asChild>
              <Link to="/">← Назад на главную</Link>
            </Button>
          </div>
          <h1 className="text-4xl font-serif mb-4">Вход в систему</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Пожалуйста, войдите в систему для получения доступа к панели управления.
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
