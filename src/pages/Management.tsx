// src/pages/Management.tsx
import { useState, useEffect, useCallback } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { FilterPanel } from '../components/management/FilterPanel';
import type { Filtros } from '../components/management/FilterPanel';
import { RoomTable } from '../components/management/RoomTable';
import type { Habitacion } from '../components/management/RoomTable';
import { ReceptionSidebar } from '../components/management/ReceptionSidebar';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

const FILTROS_INICIAL: Filtros = {
  fechaIngreso: '', fechaSalida: '', numPersonas: '',
  tipo: '', numero: '', estado: '', busqueda: '',
};

export function Management() {
  const [todasHabitaciones, setTodasHabitaciones] = useState<Habitacion[]>([]);
  const [habitacionesFiltradas, setHabitacionesFiltradas] = useState<Habitacion[]>([]);
  const [filtros, setFiltros] = useState<Filtros>(FILTROS_INICIAL);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHabitaciones = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/habitaciones`);
      const data = await res.json();
      setTodasHabitaciones(data);
      setHabitacionesFiltradas(data);
    } catch {
      setError('No se pudieron cargar las habitaciones');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchHabitaciones(); }, [fetchHabitaciones]);

  // Filtrado en el cliente (rápido, sin llamadas extra al backend)
  const aplicarFiltros = () => {
    let resultado = [...todasHabitaciones];

    if (filtros.estado)
      resultado = resultado.filter(h => h.estado === filtros.estado);

    if (filtros.tipo)
      resultado = resultado.filter(h => h.tipo === filtros.tipo);

    if (filtros.numero)
      resultado = resultado.filter(h => h.numero.includes(filtros.numero));

    if (filtros.numPersonas)
      resultado = resultado.filter(h => h.capacidad >= parseInt(filtros.numPersonas));

    if (filtros.busqueda) {
      const q = filtros.busqueda.toLowerCase();
      resultado = resultado.filter(h =>
        h.numero.toLowerCase().includes(q) ||
        h.tipo.toLowerCase().includes(q) ||
        (h.descripcion ?? '').toLowerCase().includes(q)
      );
    }

    setHabitacionesFiltradas(resultado);
  };

  const limpiarFiltros = () => {
    setFiltros(FILTROS_INICIAL);
    setHabitacionesFiltradas(todasHabitaciones);
  };

  // Aplica filtros de estado y búsqueda en tiempo real
  useEffect(() => {
    let resultado = [...todasHabitaciones];
    if (filtros.estado)
      resultado = resultado.filter(h => h.estado === filtros.estado);
    if (filtros.busqueda) {
      const q = filtros.busqueda.toLowerCase();
      resultado = resultado.filter(h =>
        h.numero.toLowerCase().includes(q) ||
        h.tipo.toLowerCase().includes(q)
      );
    }
    setHabitacionesFiltradas(resultado);
  }, [filtros.estado, filtros.busqueda, todasHabitaciones]);

  return (
    <AdminLayout>
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <h2 className="text-heading-sm font-bold text-midnight-ink mb-16">
          Gestión de Inventario y Recepción
        </h2>
        <FilterPanel
          filtros={filtros}
          onChange={setFiltros}
          onBuscar={aplicarFiltros}
          onLimpiar={limpiarFiltros}
          totalHabitaciones={todasHabitaciones.length}
          totalFiltradas={habitacionesFiltradas.length}
        />
        <RoomTable
          habitaciones={habitacionesFiltradas}
          isLoading={isLoading}
          error={error}
          onRefresh={fetchHabitaciones}
        />
      </div>
      <ReceptionSidebar />
    </AdminLayout>
  );
}
