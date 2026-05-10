import { Button } from '../ui/Button';
import { Send, MessageCircle, ChevronDown, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 bg-surface-white border-b border-black/10">
      <div className="w-full px-16 h-48 flex items-center justify-between">
        <div className="flex items-center gap-16">
          {/* Logo Placeholder */}
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
            <Link to="/gestion" className="font-semibold text-midnight-ink">Panel Principal</Link>
            <Link to="#" className="text-slate-grille hover:text-midnight-ink transition-colors hidden md:block">Reservas</Link>
            <Link to="#" className="text-slate-grille hover:text-midnight-ink transition-colors hidden md:block">Huéspedes</Link>
          </nav>
        </div>

        <div className="flex items-center gap-16">
          <div className="flex items-center gap-8 text-slate-grille border-r border-black/10 pr-16">
            <a href="#" className="hover:text-deep-teal transition-colors" title="Telegram"><Send className="w-16 h-16" /></a>
            <a href="#" className="hover:text-deep-teal transition-colors" title="WhatsApp"><MessageCircle className="w-16 h-16" /></a>
            <button className="hover:text-deep-teal transition-colors ml-8 relative">
              <Bell className="w-16 h-16" />
              <span className="absolute -top-4 -right-4 w-8 h-8 bg-amber-pop rounded-full"></span>
            </button>
          </div>
          
          <div className="flex items-center gap-8">
            <Button variant="ghost" className="h-24 text-caption border border-black/10 flex items-center gap-4 bg-fog-gray">
              Acciones Rápidas <ChevronDown className="w-12 h-12" />
            </Button>
            <div className="w-24 h-24 rounded-full bg-ash-cloud border border-black/10"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
