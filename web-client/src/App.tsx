import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { useTheme } from "./components/theme-provider";

import { Toaster } from "./components/ui/sonner";


import QRPage from "./pages/QRPage";
import LoginPage from "./pages/LoginPage";

export function App() {

  const { theme } = useTheme();

  return (
    <>

      <Toaster theme={theme as "light" | "dark" | "system"} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LoginPage />}
          />
          <Route
            path="/qr"
            element={<QRPage />}
          />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;