
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCallback, useEffect, useState, useMemo } from "react";
import { registrationService } from "@/services/registration-service";
import { ReaderCard } from "./ReaderCard";
import { RegistrationFilters } from "./dashboard/RegistrationFilters";
import { RegistrationCard } from "./dashboard/RegistrationCard";
import { RegistrationPagination } from "./dashboard/RegistrationPagination";
import { useTranslation } from "@/contexts/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";
import { useAuth } from "@/contexts/AuthContext";
import { RegistrationResponse } from "@/types/api";

export function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logout } = useAuth();
  const [registrations, setRegistrations] = useState<RegistrationResponse[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedRegistration, setSelectedRegistration] = useState<RegistrationResponse | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchRegistrations = useCallback(async () => {
    try {
      const response = await registrationService.getAll();
      setRegistrations(response.data);
    } catch (error) {
      toast.error(t('loadError'));
    }
  }, [t]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const handleLogout = useCallback(() => {
    logout();
    toast.success(t('logoutSuccess'));
  }, [logout, t]);

  const handleApprove = useCallback(async (id: number) => {
    try {
      await registrationService.approve(id);
      toast.success(t('approveSuccess').replace('{id}', id.toString()));
      await fetchRegistrations();
    } catch (error) {
      toast.error(t('processingError'));
    }
  }, [fetchRegistrations, t]);

  const handleReject = useCallback(async (id: number) => {
    try {
      await registrationService.reject(id);
      toast.success(t('rejectSuccess').replace('{id}', id.toString()));
      await fetchRegistrations();
    } catch (error) {
      toast.error(t('processingError'));
    }
  }, [fetchRegistrations, t]);

  const handleEdit = useCallback((id: number) => {
    navigate(`/edit-registration/${id}`);
  }, [navigate]);

  const filteredRegistrations = useMemo(() => {
    return registrations.filter((reg) => {
      const matchesStatus = statusFilter === "all" || reg.status === statusFilter;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        !searchQuery || 
        reg.fullName.toLowerCase().includes(searchLower) ||
        (reg.iin && reg.iin.includes(searchQuery)) ||
        (reg.mobilePhone && reg.mobilePhone.toLowerCase().includes(searchLower));
      
      return matchesStatus && matchesSearch;
    });
  }, [registrations, statusFilter, searchQuery]);

  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRegistrations = useMemo(() => {
    return filteredRegistrations.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [filteredRegistrations, startIndex, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchQuery]);

  const getStatusLabel = useCallback((status: string) => {
    switch (status) {
      case "pending":
        return t('pending');
      case "approved":
        return t('approved');
      case "rejected":
        return t('rejected');
      default:
        return t('all');
    }
  }, [t]);

  const handleStatusChange = useCallback((value: string) => {
    setStatusFilter(value);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif">{t('dashboard')}</h1>
        <div className="flex gap-4 items-center">
          <LanguageSelector />
          <Button variant="outline" onClick={handleLogout}>
            {t('logout')}
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <RegistrationFilters
            statusFilter={statusFilter}
            searchQuery={searchQuery}
            onStatusChange={handleStatusChange}
            onSearchChange={handleSearchChange}
          />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paginatedRegistrations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {t('noRegistrations')}
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
              onPageChange={handlePageChange}
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
