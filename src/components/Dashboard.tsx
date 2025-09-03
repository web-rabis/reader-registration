
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCallback, useEffect, useState, useMemo } from "react";
import { ReaderCard } from "./dashboard/ReaderCard.tsx";
import { RegistrationFilters } from "./dashboard/RegistrationFilters";
import { RegistrationCard } from "./dashboard/RegistrationCard";
import { RegistrationPagination } from "./dashboard/RegistrationPagination";
import { useTranslation } from "@/contexts/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";
import { useAuth } from "@/contexts/AuthContext";
import {ReaderListResponse, Reader, ReaderSearchParams, initReaderSearchParams} from "@/types/admin-api";
import {adminReaderService} from "@/services/admin-service.ts";
import { loadFromStorage, saveToStorage } from "@/utils/stateStorage";
import {Paging} from "@/types/api.ts";
import {adminDictionaryService} from "@/services/admin-dictionary-service.ts";
const KEY_SEARCH   = "dashboard:search";
const KEY_PAGING   = "dashboard:paging";
const DEFAULT_SEARCH: ReaderSearchParams = initReaderSearchParams; // КОНСТАНТА, не вызываем!
const DEFAULT_PAGING: Paging = { skip: 1, limit: 15 };
export function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logout } = useAuth();
  const [registrations, setRegistrations] = useState<ReaderListResponse>({result:[],count:0});
    const [searchParams, setSearchParams] = useState<ReaderSearchParams>(() =>
        loadFromStorage<ReaderSearchParams>(KEY_SEARCH, DEFAULT_SEARCH)
    );
    const [paging, setPaging] = useState<Paging>(() =>
        loadFromStorage<Paging>(KEY_PAGING, DEFAULT_PAGING)
    );

    const [selectedRegistration, setSelectedRegistration] = useState<Reader | null>(null);

  const fetchRegistrations = useCallback(async () => {
        try {
            const response = await adminReaderService.getReaderAll(searchParams,paging);
            setRegistrations(response.data);
        } catch (error) {
            toast.error(t('loadError'));
        }
    }, [ searchParams,paging, t]);
    useEffect(() => { saveToStorage(KEY_SEARCH, searchParams); },        [searchParams]);
    useEffect(() => { saveToStorage(KEY_PAGING, paging); },         [paging]);

  useEffect(() => {
        fetchRegistrations();
    }, [fetchRegistrations, paging]);

  const handleLogout = useCallback(() => {
    logout();
    toast.success(t('logoutSuccess'));
  }, [logout, t]);

  const handleApprove = useCallback(async (id: number) => {
    try {
      const response = await adminReaderService.approveReaderRegistration(id);
      toast.success(t('approveSuccess').replace('{id}', id.toString()));
      // Обновляем локальный список регистраций
      // fetchRegistrations();
        // обновляем локально: меняем статус записи
        setRegistrations(prev => ({
            ...prev,
            result: prev.result.map(r =>
                r.ticketNumber === id ? { ...r, status: "" } : r
            ),
        }));
    } catch (error) {
      toast.error(t('processingError'));
    }
  }, [t]);

  const handleReject = useCallback(async (id: number) => {
    try {
      const response = await adminReaderService.rejectReaderRegistration(id);
      toast.success(t('rejectSuccess').replace('{id}', id.toString()));
      // Обновляем локальный список регистраций
      // fetchRegistrations();
        setRegistrations(prev => ({
            ...prev,
            result: prev.result.map(r =>
                r.ticketNumber === id ? { ...r, status: "rejected" } : r
            ),
        }));
    } catch (error) {
      toast.error(t('processingError'));
    }
  }, [t]);

  const handleEdit = useCallback((id: number) => {
    navigate(`/edit-registration/${id}`);
  }, [navigate]);

  const totalPages = Math.ceil(registrations.count / paging.limit);

  const getStatusLabel = useCallback((status: string) => {
    switch (status) {
      case "pending":
        return t('pending');
      case "approved":
        return t('approved');
      case "rejected":
        return t('rejected');
      default:
        return t('active');
    }
  }, [t]);

  const handleStatusChange = useCallback((value: string) => {
        // setStatusFilter(value);
      setSearchParams(prev => ({ ...prev, status: value}));
        setPaging(DEFAULT_PAGING); // сброс
    }, []);

  const handleAdvancedToggle = useCallback((value: boolean) => {
      setSearchParams(prev => ({ ...prev, advancedSearch: value}));
      setPaging(DEFAULT_PAGING); // сброс
      }, []);

  const handleSearchChange = useCallback((value: string) => {
      // setSearchQuery(value);
      setSearchParams(prev => ({ ...prev, query: value}));
      setPaging(DEFAULT_PAGING); // сброс
  }, []);

  const handleExpirationChange = useCallback((value: string) => {
        // setSearchQuery(value);

      setSearchParams(prev => ({ ...prev, expirationDate: value}));
      setPaging(DEFAULT_PAGING); // сброс
    }, []);

  const handlePageChange = useCallback((page: number) => {
      setPaging({...paging,skip:page}); // сброс
    }, []);

  const handleOnViewCard=useCallback((reader:Reader)=>{
       adminReaderService.getReaderPhoto(reader.ticketNumber).then(res=>{
        reader.photo = res
       });
       adminDictionaryService.getTypeCardBackground(reader.typeCard.id).then(res=>{
           reader.typeCard.photo = res
       })
      setSelectedRegistration(reader);
  },[])

    const handleReRegistration = useCallback(async (reader:Reader) => {
        try {
            const response = await adminReaderService.renewalReaderRegistration(reader.ticketNumber);
            toast.success(t('rejectSuccess').replace('{id}', reader.ticketNumber.toString()));
            fetchRegistrations();
        } catch (error) {
            toast.error(t('processingError'));
        }
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
            searchParams={searchParams}
            onStatusChange={handleStatusChange}
            onSearchChange={handleSearchChange}
            onExpirationChange={handleExpirationChange}
            onAdvancedToggle={handleAdvancedToggle}
          />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {registrations.count === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {t('noRegistrations')}
              </div>
            ) : (
              registrations.result.map((registration) => (
                <RegistrationCard
                  key={registration.ticketNumber}
                  registration={registration}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onEdit={handleEdit}
                  onViewCard={handleOnViewCard}
                  onReRegistration={handleReRegistration}
                  getStatusLabel={getStatusLabel}
                />
              ))
            )}
          </div>
          
          {totalPages > 1 && (
            <RegistrationPagination
              currentPage={paging.skip}
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
