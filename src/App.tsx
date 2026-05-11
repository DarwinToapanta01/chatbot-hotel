// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Management } from './pages/Management';
import { ChatWidget } from './components/chatbot/ChatWidget';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

// Ruta protegida — solo admins
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoading } = useAuth();
  if (isLoading) return null;
  return isAdmin ? <>{children}</> : <Navigate to="/" replace />;
}

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/gestion"
          element={
            <AdminRoute>
              <Management />
            </AdminRoute>
          }
        />
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
