import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Hotels from "./pages/Hotels";   // ✅ ajout manquant

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirection par défaut */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Routes protégées */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="hotels" element={<Hotels />} /> {/* ✅ corrigé */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
