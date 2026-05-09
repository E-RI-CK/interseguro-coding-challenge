import { useTheme } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import QRPage from "./pages/QRPage";

export function App() {
  const { theme } = useTheme();
  return (
    <>
      <Toaster theme={theme as "light" | "dark" | "system"} />
      <QRPage />
    </>
  )
}

export default App
