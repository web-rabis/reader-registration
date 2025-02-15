
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { registrationService } from "@/services/registration-service";
import { authService } from "@/services/auth-service";
import { RegistrationResponse } from "@/types/api";
import { ReaderCard } from "./ReaderCard";
import { RegistrationFilters } from "./dashboard/RegistrationFilters";
import { RegistrationCard } from "./dashboard/RegistrationCard";
import { RegistrationPagination } from "./dashboard/RegistrationPagination";

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
          <RegistrationFilters
            statusFilter={statusFilter}
            searchQuery={searchQuery}
            onStatusChange={setStatusFilter}
            onSearchChange={setSearchQuery}
          />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paginatedRegistrations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Нет заявок для отображения
              </div>
            ) : (
              paginatedRegistrations.map((registration) => (
                <RegistrationCard
                  key={registration.id}
                  registration={registration}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onEdit={handleEdit}
                  onViewCard={setSelectedRegistration}
                  getStatusLabel={getStatusLabel}
                />
              ))
            )}
          </div>
          
          {totalPages > 1 && (
            <RegistrationPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
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
