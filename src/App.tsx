
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Index from "./pages/Index";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";
import { EditRegistrationPage } from "./pages/EditRegistrationPage";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/edit-registration/:id" element={<EditRegistrationPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
