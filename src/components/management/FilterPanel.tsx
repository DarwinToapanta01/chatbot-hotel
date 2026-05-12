// src/components/management/FilterPanel.tsx
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Search, X, BedDouble, Users, Hash, CalendarCheck, CalendarX } from 'lucide-react';

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
  { value: '', label: 'Todos', color: '#354d51', bg: '#f4f4f4', dot: '#a1c2c6' },
  { value: 'DISPONIBLE', label: 'Disponible', color: '#437278', bg: '#eafde8', dot: '#abffae' },
  { value: 'OCUPADA', label: 'Ocupado', color: '#8b3911', bg: '#feefe8', dot: '#8b3911' },
  { value: 'LIMPIEZA', label: 'Limpieza', color: '#0a3890', bg: '#e0f4ff', dot: '#006af2' },
  { value: 'MANTENIMIENTO', label: 'Mantenimiento', color: '#354d51', bg: '#ebebeb', dot: '#4f6466' },
];

export function FilterPanel({ filtros, onChange, onBuscar, onLimpiar, totalHabitaciones, totalFiltradas }: FilterPanelProps) {
  const set = (key: keyof Filtros) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    onChange({ ...filtros, [key]: e.target.value });

  const hayFiltros = Object.values(filtros).some(v => v !== '');

  return (
    <div className="bg-surface-white border border-black/10 rounded-sm mb-16 shadow-subtle-2 overflow-hidden">

      {/* Header del panel */}
      <div className="px-6 py-3 border-b border-black/5 flex items-center justify-between bg-fog-gray">
        <span className="text-[11px] font-bold text-slate-grille uppercase tracking-widest flex items-center gap-2">
          <Search className="w-4 h-4" /> Filtros de búsqueda
        </span>

        {hayFiltros && (
          <button
            onClick={onLimpiar}
            className="flex items-center gap-1.5 text-[11px] font-medium text-amber-pop hover:text-midnight-ink transition-colors"
          >
            <X className="w-4 h-4" /> Limpiar filtros
          </button>
        )}
      </div>


      <div className="p-16 flex flex-col gap-16">
        {/* Fila principal */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 items-end">

          <div className="col-span-1">
            <label className="flex items-center gap-4 text-[11px] font-semibold text-slate-grille mb-6 uppercase tracking-wider">
              <CalendarCheck className="w-11 h-11 text-deep-teal" /> Check-In
            </label>
            <Input type="date" value={filtros.fechaIngreso} onChange={set('fechaIngreso')} className="text-midnight-ink text-caption h-32" />
          </div>

          <div className="col-span-1">
            <label className="flex items-center gap-4 text-[11px] font-semibold text-slate-grille mb-6 uppercase tracking-wider">
              <CalendarX className="w-11 h-11 text-deep-teal" /> Check-Out
            </label>
            <Input type="date" value={filtros.fechaSalida} onChange={set('fechaSalida')} className="text-midnight-ink text-caption h-32" />
          </div>

          <div className="col-span-1">
            <label className="flex items-center gap-4 text-[11px] font-semibold text-slate-grille mb-6 uppercase tracking-wider">
              <Users className="w-11 h-11 text-deep-teal" /> Huéspedes
            </label>
            <Input type="number" min="1" placeholder="Ej. 2" value={filtros.numPersonas} onChange={set('numPersonas')} className="text-caption h-32" />
          </div>

          <div className="col-span-1">
            <label className="flex items-center gap-2 text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider">
              <BedDouble className="w-4 h-4 text-teal-600" /> Tipo Hab.
            </label>

            <select
              value={filtros.tipo}
              onChange={(e) => set('tipo')(e)}
              className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-teal-500 transition-all appearance-none"
            >
              <option value="">Todos los tipos</option>
              <option value="SIMPLE">Sencilla</option>
              <option value="DOBLE">Doble</option>
              <option value="SUITE">Suite</option>
              <option value="FAMILIAR">Familiar</option>
            </select>
          </div>


          <div className="col-span-1">
            <label className="flex items-center gap-4 text-[11px] font-semibold text-slate-grille mb-6 uppercase tracking-wider">
              <Hash className="w-11 h-11 text-deep-teal" /> Número
            </label>
            <Input type="text" placeholder="Ej. 101" value={filtros.numero} onChange={set('numero')} className="text-caption h-32" />
          </div>

          <div className="col-span-1">
            <label className="text-[11px] font-semibold text-slate-grille mb-6 uppercase tracking-wider block opacity-0 select-none">
              Buscar
            </label>
            <Button
              variant="primary"
              className="w-full h-32 flex gap-6 items-center justify-center text-caption bg-slate-900 text-white hover:bg-slate-800 transition-all rounded-2xl shadow-lg"
              onClick={onBuscar}
            >
              <Search className="w-12 h-12" /> Buscar
            </Button>
          </div>
        </div>

        {/* Fila secundaria — estado + búsqueda + contador */}
        <div className="flex flex-wrap items-center gap-12 pt-12 border-t border-black/5">
          <span className="text-[11px] font-semibold text-slate-grille uppercase tracking-wider">
            Estado:
          </span>

          <div className="flex flex-wrap gap-6">
            {ESTADOS.map(est => {
              const activo = filtros.estado === est.value;
              return (
                <button
                  key={est.value}
                  onClick={() => onChange({ ...filtros, estado: est.value })}
                  style={{
                    background: activo ? est.bg : 'transparent',
                    color: est.color,
                    border: `1px solid ${activo ? est.color + '50' : 'rgba(0,0,0,0.08)'}`,
                    borderRadius: '9999px',
                    padding: '4px 12px',
                    fontSize: '11px',
                    fontWeight: activo ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: est.dot,
                    display: 'inline-block',
                    flexShrink: 0,
                  }} />
                  {est.label}
                </button>
              );
            })}
          </div>

          <div className="ml-auto flex items-center gap-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por número o tipo..."
                value={filtros.busqueda}
                onChange={set('busqueda')}
                style={{
                  paddingLeft: '28px',
                  paddingRight: '12px',
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  color: '#00262b',
                  outline: 'none',
                  width: '200px',
                  background: '#fafafa',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => e.currentTarget.style.borderColor = '#abffae'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'}
              />
            </div>

            <div style={{
              background: '#f4f4f4',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '11px',
              color: '#354d51',
              whiteSpace: 'nowrap',
            }}>
              <strong style={{ color: '#00262b' }}>{totalFiltradas}</strong> de {totalHabitaciones} hab.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
