// src/components/management/RoomTable.tsx
import { Badge } from '../ui/Badge';
import { Eye, CalendarPlus, Edit2, Droplets, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export interface Habitacion {
  id: string;
  numero: string;
  tipo: string;
  estado: 'DISPONIBLE' | 'OCUPADA' | 'LIMPIEZA' | 'MANTENIMIENTO';
  precioPorNoche: string;
  capacidad: number;
  descripcion: string | null;
  amenidades: string[];
}

const TIPO_LABEL: Record<string, string> = {
  SIMPLE: 'Sencilla', DOBLE: 'Doble', SUITE: 'Suite', FAMILIAR: 'Familiar',
};

interface RoomTableProps {
  habitaciones: Habitacion[];
  isLoading: boolean;
  error: string;
  onRefresh: () => void;
}

export function RoomTable({ habitaciones, isLoading, error, onRefresh }: RoomTableProps) {
  const { token } = useAuth();

  const cambiarEstado = async (id: string, estado: string) => {
    try {
      await fetch(`${API_URL}/api/habitaciones/${id}/estado`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ estado }),
      });
      onRefresh();
    } catch {
      alert('Error al cambiar el estado');
    }
  };

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case 'DISPONIBLE': return <Badge variant="success">Disponible</Badge>;
      case 'OCUPADA': return <Badge variant="danger">Ocupado</Badge>;
      case 'LIMPIEZA': return <Badge variant="warning">Limpieza</Badge>;
      case 'MANTENIMIENTO': return <Badge variant="default">Mantenimiento</Badge>;
      default: return <Badge variant="default">{estado}</Badge>;
    }
  };

  if (isLoading) return (
    <div className="bg-surface-white border border-black/10 rounded-sm flex-1 flex items-center justify-center text-slate-grille text-body-sm">
      Cargando habitaciones...
    </div>
  );

  if (error) return (
    <div className="bg-surface-white border border-black/10 rounded-sm flex-1 flex items-center justify-center text-amber-pop text-body-sm">
      {error}
    </div>
  );

  if (habitaciones.length === 0) return (
    <div className="bg-surface-white border border-black/10 rounded-sm flex-1 flex items-center justify-center text-slate-grille text-body-sm">
      No se encontraron habitaciones con esos filtros.
    </div>
  );

  return (
    <div className="bg-surface-white border border-black/10 rounded-sm shadow-subtle overflow-hidden flex-1 flex flex-col">
      <div className="overflow-y-auto">
        <table className="w-full text-left border-collapse text-caption">
          <thead className="bg-fog-gray sticky top-0 z-10 border-b border-black/10">
            <tr>
              <th className="py-8 px-16 font-semibold text-slate-grille uppercase tracking-wider text-[11px]">Hab.</th>
              <th className="py-8 px-16 font-semibold text-slate-grille uppercase tracking-wider text-[11px]">Tipo</th>
              <th className="py-8 px-16 font-semibold text-slate-grille uppercase tracking-wider text-[11px]">Estado</th>
              <th className="py-8 px-16 font-semibold text-slate-grille uppercase tracking-wider text-[11px]">Precio</th>
              <th className="py-8 px-16 font-semibold text-slate-grille uppercase tracking-wider text-[11px] text-center">Máx</th>
              <th className="py-8 px-16 font-semibold text-slate-grille uppercase tracking-wider text-[11px]">Amenidades</th>
              <th className="py-8 px-16 font-semibold text-slate-grille uppercase tracking-wider text-[11px] text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {habitaciones.map((room) => (
              <tr key={room.id} className="hover:bg-fog-gray transition-colors group">
                <td className="py-8 px-16 font-medium text-midnight-ink">{room.numero}</td>
                <td className="py-8 px-16 text-slate-grille">{TIPO_LABEL[room.tipo] ?? room.tipo}</td>
                <td className="py-8 px-16">{getStatusBadge(room.estado)}</td>
                <td className="py-8 px-16 text-midnight-ink font-medium">${parseFloat(room.precioPorNoche).toFixed(2)}</td>
                <td className="py-8 px-16 text-center text-slate-grille">{room.capacidad}</td>
                <td className="py-8 px-16 text-slate-grille text-[11px]">{room.amenidades.join(', ') || '—'}</td>
                <td className="py-8 px-16 text-right">
                  <div className="flex items-center justify-end gap-6 opacity-0 group-hover:opacity-100 transition-opacity">

                    <button
                      className="text-slate-grille hover:text-deep-teal transition-colors p-4 rounded hover:bg-fog-gray"
                      title="Ver Detalles"
                    >
                      <Eye className="w-12 h-12" />
                    </button>

                    {room.estado === 'DISPONIBLE' && (
                      <button
                        className="text-slate-grille hover:text-spring-leaf transition-colors p-4 rounded hover:bg-fog-gray"
                        title="Marcar Ocupada"
                        onClick={() => cambiarEstado(room.id, 'OCUPADA')}
                      >
                        <CalendarPlus className="w-12 h-12" />
                      </button>
                    )}

                    {(room.estado === 'OCUPADA' || room.estado === 'LIMPIEZA' || room.estado === 'MANTENIMIENTO') && (
                      <button
                        className="text-slate-grille hover:text-deep-teal transition-colors p-4 rounded hover:bg-fog-gray"
                        title="Marcar Disponible"
                        onClick={() => cambiarEstado(room.id, 'DISPONIBLE')}
                      >
                        <CheckCircle className="w-12 h-12" />
                      </button>
                    )}

                    {(room.estado === 'OCUPADA' || room.estado === 'DISPONIBLE') && (
                      <button
                        className="text-slate-grille hover:text-electric-blue transition-colors p-4 rounded hover:bg-fog-gray"
                        title="Marcar Limpieza"
                        onClick={() => cambiarEstado(room.id, 'LIMPIEZA')}
                      >
                        <Droplets className="w-12 h-12" />
                      </button>
                    )}

                    <button
                      className="text-slate-grille hover:text-amber-pop transition-colors p-4 rounded hover:bg-fog-gray"
                      title="Editar"
                    >
                      <Edit2 className="w-12 h-12" />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
