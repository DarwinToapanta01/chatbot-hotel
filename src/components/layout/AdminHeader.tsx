// src/components/layout/AdminHeader.tsx
import { Button } from '../ui/Button';
import { Send, MessageCircle, ChevronDown, Bell, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function AdminHeader() {
  const { usuario, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-surface-white border-b border-black/10">
      <div className="w-full px-16 h-48 flex items-center justify-between">
        <div className="flex items-center gap-16">
          <Link to="/" className="flex items-center gap-8">
            <div className="w-24 h-24 bg-oceanic-deep rounded-sm flex items-center justify-center text-white font-bold text-[10px]">
              PMS
            </div>
            <span className="font-semibold text-oceanic-deep text-body-sm tracking-tight hidden sm:block">
              Hotel Manager
            </span>
          </Link>

          <div className="h-24 w-px bg-black/10 mx-8"></div>

          <nav className="flex items-center gap-16 text-body-sm">
            <Link to="/gestion" className="font-semibold text-midnight-ink hover:text-oceanic-deep transition-colors">
              Habitaciones
            </Link>
            <Link to="/reservas" className="text-slate-grille hover:text-midnight-ink transition-colors hidden md:block">
              Reservas
            </Link>
            <Link to="#" className="text-slate-grille hover:text-midnight-ink transition-colors hidden md:block">
              Huéspedes
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-16">
          <div className="flex items-center gap-8">
            {/* Usuario y logout */}
            <div className="flex items-center gap-8">
              <span className="text-caption text-slate-grille hidden sm:block">
                {usuario?.nombre.split(' ')[0]}
              </span>
              <button
                onClick={logout}
                title="Cerrar sesión"
                className="text-slate-grille hover:text-amber-pop transition-colors"
              >
                <LogOut className="w-16 h-16" />
              </button>
            </div>

            <div className="w-24 h-24 rounded-full bg-ash-cloud border border-black/10 flex items-center justify-center text-[10px] font-bold text-slate-grille">
              {usuario?.nombre.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
