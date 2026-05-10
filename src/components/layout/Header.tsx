import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-surface-white/90 backdrop-blur-sm border-b border-black/5">
      <div className="max-w-[1200px] mx-auto px-16 h-64 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-8">
          {/* Logo Placeholder */}
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
          <Link to="/gestion" className="text-body text-midnight-ink hover:text-oceanic-deep transition-colors font-semibold">
            Ir a Recepción
          </Link>
          <a href="#resources" className="text-body text-midnight-ink hover:text-oceanic-deep transition-colors">
            Recursos
          </a>
        </nav>

        <div className="flex items-center gap-16">
          <Button variant="ghost" className="hidden sm:inline-flex">Iniciar Sesión</Button>
          <Button variant="primary">Solicitar Demo</Button>
        </div>
      </div>
    </header>
  );
}
