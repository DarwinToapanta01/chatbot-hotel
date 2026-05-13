// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Management } from './pages/Management';
import { MisReservas } from './pages/MisReservas';
import { ReservasAdmin } from './pages/ReservasAdmin';
import { ConfiguracionUsuario } from './pages/ConfiguracionUsuario';
import { ChatWidget } from './components/chatbot/ChatWidget';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoading } = useAuth();
  if (isLoading) return null;
  return isAdmin ? <>{children}</> : <Navigate to="/" replace />;
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { usuario, isLoading } = useAuth();
  if (isLoading) return null;
  return usuario ? <>{children}</> : <Navigate to="/" replace />;
}

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gestion" element={<AdminRoute><Management /></AdminRoute>} />
        <Route path="/reservas" element={<AdminRoute><ReservasAdmin /></AdminRoute>} />
        <Route path="/mis-reservas" element={<PrivateRoute><MisReservas /></PrivateRoute>} />
        <Route path="/perfil" element={<PrivateRoute><ConfiguracionUsuario /></PrivateRoute>} />
      </Routes>
      <ChatWidget />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
