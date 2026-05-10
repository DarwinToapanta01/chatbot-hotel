import { Badge } from '../ui/Badge';
import { Eye, CalendarPlus, Edit2, Droplets } from 'lucide-react';

const DUMMY_DATA = [
  { id: 1, number: '101', type: 'Sencilla', status: 'Disponible', price: '$80.00', max: 2, guest: '-' },
  { id: 2, number: '102', type: 'Doble', status: 'Ocupado', price: '$120.00', max: 4, guest: 'Juan Pérez' },
  { id: 3, number: '103', type: 'Suite', status: 'Limpieza', price: '$250.00', max: 2, guest: '-' },
  { id: 4, number: '104', type: 'Doble', status: 'Fuera Serv.', price: '$120.00', max: 4, guest: '-' },
  { id: 5, number: '201', type: 'Sencilla', status: 'Disponible', price: '$80.00', max: 2, guest: '-' },
  { id: 6, number: '202', type: 'Suite', status: 'Ocupado', price: '$250.00', max: 2, guest: 'Maria Gómez' },
  { id: 7, number: '203', type: 'Sencilla', status: 'Limpieza', price: '$80.00', max: 2, guest: '-' },
  { id: 8, number: '204', type: 'Doble', status: 'Disponible', price: '$120.00', max: 4, guest: '-' },
];

export function RoomTable() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Disponible': return <Badge variant="success">Disponible</Badge>;
      case 'Ocupado': return <Badge variant="danger">Ocupado</Badge>;
      case 'Limpieza': return <Badge variant="warning">Limpieza</Badge>;
      default: return <Badge variant="default">Fuera Serv.</Badge>;
    }
  };

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
              <th className="py-8 px-16 font-semibold text-slate-grille uppercase tracking-wider text-[11px]">Huésped Actual</th>
              <th className="py-8 px-16 font-semibold text-slate-grille uppercase tracking-wider text-[11px] text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {DUMMY_DATA.map((room) => (
              <tr key={room.id} className="hover:bg-fog-gray transition-colors group">
                <td className="py-8 px-16 font-medium text-midnight-ink">{room.number}</td>
                <td className="py-8 px-16 text-slate-grille">{room.type}</td>
                <td className="py-8 px-16">{getStatusBadge(room.status)}</td>
                <td className="py-8 px-16 text-midnight-ink font-medium">{room.price}</td>
                <td className="py-8 px-16 text-center text-slate-grille">{room.max}</td>
                <td className="py-8 px-16 text-slate-grille">{room.guest}</td>
                <td className="py-8 px-16 text-right">
                  <div className="flex items-center justify-end gap-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-slate-grille hover:text-deep-teal transition-colors" title="Ver Detalles"><Eye className="w-14 h-14" /></button>
                    {room.status === 'Disponible' && (
                      <button className="text-slate-grille hover:text-spring-leaf transition-colors" title="Reservar"><CalendarPlus className="w-14 h-14" /></button>
                    )}
                    <button className="text-slate-grille hover:text-amber-pop transition-colors" title="Editar"><Edit2 className="w-14 h-14" /></button>
                    {(room.status === 'Ocupado' || room.status === 'Disponible') && (
                      <button className="text-slate-grille hover:text-warning transition-colors" title="Marcar Limpieza"><Droplets className="w-14 h-14" /></button>
                    )}
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
