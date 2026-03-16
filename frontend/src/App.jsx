import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateProject from "./modules/CreateProject";
import CreateOrganization from "./modules/CreateOrganization";

import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-project"
          element={
            <ProtectedRoute>
              <CreateProject />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-organization"
          element={
            <ProtectedRoute>
              <CreateOrganization />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}