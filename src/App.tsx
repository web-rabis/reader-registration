import {Routes, Route} from "react-router-dom";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "./contexts/LanguageContext";
import RegistrationLanding from "@/pages/RegistrationLanding.tsx";

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<RegistrationLanding />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
