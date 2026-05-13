// src/components/layout/Header.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { LoginModal } from '../auth/LoginModal';
import { RegisterModal } from '../auth/RegisterModal';
import { useAuth } from '../../context/AuthContext';

export function Header() {
  const { usuario, isAdmin, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-surface-white/90 backdrop-blur-sm border-b border-black/5">
        <div className="max-w-[1200px] mx-auto px-16 h-64 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-8">
            <div className="w-32 h-32 bg-oceanic-deep rounded flex items-center justify-center text-white font-bold text-caption">
              PMS
            </div>
            <span className="font-semibold text-oceanic-deep text-subheading tracking-subheading">
              Hotel Manager
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-24">
            <a href="#features" className="text-body text-midnight-ink hover:text-oceanic-deep transition-colors">
              Características
            </a>
            {usuario && !isAdmin && (
              <Link to="/mis-reservas" className="text-body text-midnight-ink hover:text-oceanic-deep transition-colors font-semibold">
                Mis Reservas
              </Link>
            )}
            {isAdmin && (
              <Link to="/gestion" className="text-body text-midnight-ink hover:text-oceanic-deep transition-colors font-semibold">
                Ir a Recepción
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-16">
            {usuario ? (
              <div className="flex items-center gap-16">
                <Link to="/perfil" className="text-caption text-slate-grille hidden sm:block hover:opacity-80 transition-opacity">
                  Hola, <strong className="text-midnight-ink">{usuario.nombre.split(' ')[0]}</strong>
                  {isAdmin && (
                    <span className="ml-6 bg-pale-mint text-deep-teal text-[10px] px-6 py-2 rounded-sm font-semibold">
                      ADMIN
                    </span>
                  )}
                </Link>
                <Button variant="ghost" className="hidden sm:inline-flex" onClick={logout}>
                  Cerrar sesión
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" className="hidden sm:inline-flex" onClick={() => setShowLogin(true)}>
                  Iniciar Sesión
                </Button>
                <Button variant="primary" onClick={() => setShowRegister(true)}>
                  Registrarse
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }}
        />
      )}
      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }}
        />
      )}
    </>
  );
}