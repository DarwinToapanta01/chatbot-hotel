import { AdminLayout } from '../components/layout/AdminLayout';
import { FilterPanel } from '../components/management/FilterPanel';
import { RoomTable } from '../components/management/RoomTable';
import { ReceptionSidebar } from '../components/management/ReceptionSidebar';

export function Management() {
  return (
    <AdminLayout>
      {/* Contenido Principal (Columna Izquierda) */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <h2 className="text-heading-sm font-bold text-midnight-ink mb-16">
          Gestión de Inventario y Recepción
        </h2>
        <FilterPanel />
        <RoomTable />
      </div>

      {/* Sidebar Lateral (Columna Derecha) */}
      <ReceptionSidebar />
    </AdminLayout>
  );
}
