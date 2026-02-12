import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Journal } from "./pages/Journal";
import { Analytics } from "./pages/Analytics";
import { Landing } from "./pages/Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<Layout />}>
          <Route path="/overview" element={<Dashboard />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
        {/* Redirect for demo purposes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
