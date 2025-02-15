
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { registrationService } from "@/services/registration-service";
import { authService } from "@/services/auth-service";
import { RegistrationResponse } from "@/types/api";
import { PencilIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Dashboard() {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<RegistrationResponse[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await registrationService.getAll();
        setRegistrations(response.data);
      } catch (error) {
        toast.error("Ошибка при загрузке данных");
      }
    };

    fetchRegistrations();
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
    toast.success("Вы вышли из системы");
  };

  const handleApprove = async (id: number) => {
    try {
      await registrationService.approve(id);
      toast.success(`Заявка #${id} одобрена`);
      const response = await registrationService.getAll();
      setRegistrations(response.data);
    } catch (error) {
      toast.error("Ошибка при обработке заявки");
    }
  };

  const handleReject = async (id: number) => {
    try {
      await registrationService.reject(id);
      toast.success(`Заявка #${id} отклонена`);
      const response = await registrationService.getAll();
      setRegistrations(response.data);
    } catch (error) {
      toast.error("Ошибка при обработке заявки");
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/edit-registration/${id}`);
  };

  const filteredRegistrations = registrations.filter((reg) => {
    if (statusFilter === "all") return true;
    return reg.status === statusFilter;
  });

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Ожидает";
      case "approved":
        return "Одобрено";
      case "rejected":
        return "Отклонено";
      default:
        return "Все";
    }
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
          <div className="flex justify-between items-center">
            <CardTitle>Заявки на регистрацию</CardTitle>
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Фильтр по статусу" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все заявки</SelectItem>
                <SelectItem value="pending">Ожидающие</SelectItem>
                <SelectItem value="approved">Одобренные</SelectItem>
                <SelectItem value="rejected">Отклоненные</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRegistrations.map((reg) => (
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
                  <Badge variant="secondary">
                    {getStatusLabel(reg.status)}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700"
                    onClick={() => handleEdit(reg.id)}
                  >
                    <PencilIcon className="w-4 h-4 mr-1" />
                    Редактировать
                  </Button>
                  {reg.status === "pending" && (
                    <>
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
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
