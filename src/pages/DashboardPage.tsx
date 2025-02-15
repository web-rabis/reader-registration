
import { Dashboard } from "@/components/Dashboard";
import { useAuth } from "@/contexts/AuthContext";

const DashboardPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return <Dashboard />;
};

export default DashboardPage;
