import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Search } from 'lucide-react';

export function FilterPanel() {
  return (
    <div className="bg-surface-white border border-black/10 rounded-sm p-16 flex flex-col gap-16 mb-16 shadow-subtle-2">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-16 items-end">
        
        <div className="col-span-1">
          <label className="block text-[11px] font-semibold text-slate-grille mb-4 uppercase tracking-wider">Check-In</label>
          <Input type="date" className="text-midnight-ink" />
        </div>
        
        <div className="col-span-1">
          <label className="block text-[11px] font-semibold text-slate-grille mb-4 uppercase tracking-wider">Check-Out</label>
          <Input type="date" className="text-midnight-ink" />
        </div>
        
        <div className="col-span-1">
          <label className="block text-[11px] font-semibold text-slate-grille mb-4 uppercase tracking-wider">Huéspedes</label>
          <Input type="number" min="1" placeholder="Ej. 2" />
        </div>

        <div className="col-span-1">
          <label className="block text-[11px] font-semibold text-slate-grille mb-4 uppercase tracking-wider">Tipo Hab.</label>
          <Select>
            <option value="">Todos</option>
            <option value="single">Sencilla</option>
            <option value="double">Doble</option>
            <option value="suite">Suite</option>
          </Select>
        </div>

        <div className="col-span-1">
          <label className="block text-[11px] font-semibold text-slate-grille mb-4 uppercase tracking-wider">Habitación</label>
          <Input type="text" placeholder="Ej. 101" />
        </div>

        <div className="col-span-1">
          <Button variant="primary" className="w-full h-32 flex gap-8 items-center">
            <Search className="w-14 h-14" /> Buscar
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-16 pt-8 border-t border-black/5">
        <span className="text-[11px] font-semibold text-slate-grille uppercase tracking-wider">Filtro Estado:</span>
        <div className="flex gap-8">
          <Badge variant="success" className="cursor-pointer hover:opacity-80">Disponible</Badge>
          <Badge variant="danger" className="cursor-pointer hover:opacity-80">Ocupado</Badge>
          <Badge variant="warning" className="cursor-pointer hover:opacity-80">Limpieza</Badge>
          <Badge variant="default" className="cursor-pointer hover:opacity-80">Fuera Serv.</Badge>
        </div>
        
        <div className="ml-auto w-1/4">
          <Input type="text" placeholder="Buscar huésped por nombre..." className="h-24 text-[11px]" />
        </div>
      </div>
    </div>
  );
}
