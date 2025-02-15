
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { DashboardPage } from "./pages/DashboardPage";
import { NotFound } from "./pages/NotFound";
import { EditRegistrationPage } from "./pages/EditRegistrationPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/edit-registration/:id" element={<EditRegistrationPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
