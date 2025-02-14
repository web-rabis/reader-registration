
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const mockRegistrations = [
  {
    id: 1,
    fullName: "Иванов Иван Иванович",
    email: "ivanov@example.com",
    status: "pending",
    date: "2024-03-20",
  },
  {
    id: 2,
    fullName: "Петрова Мария Сергеевна",
    email: "petrova@example.com",
    status: "pending",
    date: "2024-03-19",
  },
];

export function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("librarian-token");
    navigate("/login");
    toast.success("Вы вышли из системы");
  };

  const handleApprove = (id: number) => {
    toast.success(`Заявка #${id} одобрена`);
  };

  const handleReject = (id: number) => {
    toast.success(`Заявка #${id} отклонена`);
  };

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif">Панель управления</h1>
        <Button variant="outline" onClick={handleLogout}>
          Выйти
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Заявки на регистрацию</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRegistrations.map((reg) => (
              <div
                key={reg.id}
                className="p-4 border rounded-lg flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-1">
                  <p className="font-medium">{reg.fullName}</p>
                  <p className="text-sm text-muted-foreground">{reg.email}</p>
                  <p className="text-sm text-muted-foreground">Дата: {reg.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{reg.status === "pending" ? "Ожидает" : reg.status}</Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-green-600 hover:text-green-700"
                    onClick={() => handleApprove(reg.id)}
                  >
                    Одобрить
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleReject(reg.id)}
                  >
                    Отклонить
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
