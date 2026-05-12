// src/components/management/FilterPanel.tsx
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Search, X, BedDouble, Users, Hash, CalendarRange } from 'lucide-react';

export interface Filtros {
  fechaIngreso: string;
  fechaSalida: string;
  numPersonas: string;
  tipo: string;
  numero: string;
  estado: string;
  busqueda: string;
}

interface FilterPanelProps {
  filtros: Filtros;
  onChange: (filtros: Filtros) => void;
  onBuscar: () => void;
  onLimpiar: () => void;
  totalHabitaciones: number;
  totalFiltradas: number;
}

const ESTADOS = [
  { value: '', label: 'Todos', color: '#354d51', bg: '#f4f4f4' },
  { value: 'DISPONIBLE', label: 'Disponible', color: '#437278', bg: '#eafde8' },
  { value: 'OCUPADA', label: 'Ocupado', color: '#8b3911', bg: '#feefe8' },
  { value: 'LIMPIEZA', label: 'Limpieza', color: '#0a3890', bg: '#e0f4ff' },
  { value: 'MANTENIMIENTO', label: 'Mantenimiento', color: '#354d51', bg: '#ebebeb' },
];

export function FilterPanel({ filtros, onChange, onBuscar, onLimpiar, totalHabitaciones, totalFiltradas }: FilterPanelProps) {
  const set = (key: keyof Filtros) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    onChange({ ...filtros, [key]: e.target.value });

  const hayFiltros = Object.values(filtros).some(v => v !== '');

  return (
    <div className="bg-surface-white border border-black/10 rounded-sm p-16 flex flex-col gap-16 mb-16 shadow-subtle-2">

      {/* Fila principal de filtros */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-12 items-end">

        <div className="col-span-1">
          <label className="flex items-center gap-4 text-[11px] font-semibold text-slate-grille mb-4 uppercase tracking-wider">
            <CalendarRange className="w-10 h-10" /> Check-In
          </label>
          <Input type="date" value={filtros.fechaIngreso} onChange={set('fechaIngreso')} className="text-midnight-ink text-caption h-32" />
        </div>

        <div className="col-span-1">
          <label className="flex items-center gap-4 text-[11px] font-semibold text-slate-grille mb-4 uppercase tracking-wider">
            <CalendarRange className="w-10 h-10" /> Check-Out
          </label>
          <Input type="date" value={filtros.fechaSalida} onChange={set('fechaSalida')} className="text-midnight-ink text-caption h-32" />
        </div>

        <div className="col-span-1">
          <label className="flex items-center gap-4 text-[11px] font-semibold text-slate-grille mb-4 uppercase tracking-wider">
            <Users className="w-10 h-10" /> Huéspedes
          </label>
          <Input type="number" min="1" placeholder="Ej. 2" value={filtros.numPersonas} onChange={set('numPersonas')} className="text-caption h-32" />
        </div>

        <div className="col-span-1">
          <label className="flex items-center gap-4 text-[11px] font-semibold text-slate-grille mb-4 uppercase tracking-wider">
            <BedDouble className="w-10 h-10" /> Tipo Hab.
          </label>
          <Select value={filtros.tipo} onChange={set('tipo')} className="text-caption h-32">
            <option value="">Todos</option>
            <option value="SIMPLE">Sencilla</option>
            <option value="DOBLE">Doble</option>
            <option value="SUITE">Suite</option>
            <option value="FAMILIAR">Familiar</option>
          </Select>
        </div>

        <div className="col-span-1">
          <label className="flex items-center gap-4 text-[11px] font-semibold text-slate-grille mb-4 uppercase tracking-wider">
            <Hash className="w-10 h-10" /> Número
          </label>
          <Input type="text" placeholder="Ej. 101" value={filtros.numero} onChange={set('numero')} className="text-caption h-32" />
        </div>

        <div className="col-span-1 flex gap-8">
          <Button variant="primary" className="flex-1 h-32 flex gap-6 items-center justify-center text-caption" onClick={onBuscar}>
            <Search className="w-12 h-12" /> Buscar
          </Button>
          {hayFiltros && (
            <button
              onClick={onLimpiar}
              title="Limpiar filtros"
              className="h-32 w-32 flex items-center justify-center border border-black/10 rounded-sm text-slate-grille hover:text-midnight-ink hover:bg-fog-gray transition-colors"
            >
              <X className="w-12 h-12" />
            </button>
          )}
        </div>
      </div>

      {/* Fila secundaria — estado + búsqueda + contador */}
      <div className="flex flex-wrap items-center gap-12 pt-8 border-t border-black/5">
        <span className="text-[11px] font-semibold text-slate-grille uppercase tracking-wider">Estado:</span>

        <div className="flex flex-wrap gap-6">
          {ESTADOS.map(est => (
            <button
              key={est.value}
              onClick={() => onChange({ ...filtros, estado: est.value })}
              style={{
                background: filtros.estado === est.value ? est.bg : 'transparent',
                color: est.color,
                border: `1px solid ${filtros.estado === est.value ? est.color + '40' : 'rgba(0,0,0,0.08)'}`,
                borderRadius: '9999px',
                padding: '3px 10px',
                fontSize: '11px',
                fontWeight: filtros.estado === est.value ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {est.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-12">
          <Input
            type="text"
            placeholder="🔍 Buscar por número o tipo..."
            value={filtros.busqueda}
            onChange={set('busqueda')}
            className="h-26 text-[11px] w-48"
          />
          <span className="text-[11px] text-slate-grille whitespace-nowrap">
            <strong className="text-midnight-ink">{totalFiltradas}</strong> de {totalHabitaciones} hab.
          </span>
        </div>
      </div>
    </div>
  );
}