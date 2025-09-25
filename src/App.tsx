
import {Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";
import { EditRegistrationPage } from "./pages/EditRegistrationPage";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import NewReaderPage from "@/pages/NewReaderPage.tsx";
import RegistrationLanding from "@/pages/RegistrationLanding.tsx";
import AdminLayout from "@/layouts/AdminLayout.tsx";
import {Control} from "@/components/control/Control.tsx";
import {Readers} from "@/components/dashboard/readers/Readers.tsx";
import {Employees} from "@/components/dashboard/readers/Employees.tsx";

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RegistrationLanding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="readers" replace />} />
              <Route path="control" element={<Control />} />
              <Route path="readers" element={<Readers />} />
              <Route path="employees" element={<Employees />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="new-reader" element={<NewReaderPage />} />
              <Route path="edit-registration/:id" element={<EditRegistrationPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
