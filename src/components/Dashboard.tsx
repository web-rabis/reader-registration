
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { registrationService } from "@/services/registration-service";
import { authService } from "@/services/auth-service";
import { RegistrationResponse } from "@/types/api";
import { PencilIcon, IdCard, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReaderCard } from "./ReaderCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function Dashboard() {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<RegistrationResponse[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedRegistration, setSelectedRegistration] = useState<RegistrationResponse | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const handleViewCard = (registration: RegistrationResponse) => {
    setSelectedRegistration(registration);
  };

  const filteredRegistrations = registrations.filter((reg) => {
    const matchesStatus = statusFilter === "all" || reg.status === statusFilter;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      !searchQuery || 
      reg.fullName.toLowerCase().includes(searchLower) ||
      (reg.iin && reg.iin.includes(searchQuery)) ||
      (reg.mobilePhone && reg.mobilePhone.toLowerCase().includes(searchLower));
    
    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRegistrations = filteredRegistrations.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset to first page when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchQuery]);

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
          <div className="space-y-4">
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
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по ИИН, ФИО или номеру телефона"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paginatedRegistrations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Нет заявок для отображения
              </div>
            ) : (
              paginatedRegistrations.map((reg) => (
                <div
                  key={reg.id}
                  className="p-4 border rounded-lg flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{reg.fullName}</p>
                    <p className="text-sm text-muted-foreground">{reg.email}</p>
                    <p className="text-sm text-muted-foreground">Дата: {reg.date}</p>
                    {reg.iin && <p className="text-sm text-muted-foreground">ИИН: {reg.iin}</p>}
                    {reg.mobilePhone && <p className="text-sm text-muted-foreground">Телефон: {reg.mobilePhone}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {getStatusLabel(reg.status)}
                    </Badge>
                    {reg.status === "approved" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-600 hover:text-gray-700"
                        onClick={() => handleViewCard(reg)}
                      >
                        <IdCard className="w-4 h-4 mr-1" />
                        Билет
                      </Button>
                    )}
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
              ))
            )}
          </div>
          
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i + 1}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                        className="cursor-pointer"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedRegistration && (
        <ReaderCard
          registration={selectedRegistration}
          open={!!selectedRegistration}
          onClose={() => setSelectedRegistration(null)}
        />
      )}
    </div>
  );
}
