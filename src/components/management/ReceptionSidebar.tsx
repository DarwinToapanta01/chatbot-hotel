// src/components/management/ReceptionSidebar.tsx
import { useState, useEffect } from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

interface Habitacion {
  id: string;
  numero: string;
  tipo: string;
  estado: string;
  precioPorNoche: string;
}

interface Reserva {
  id: string;
  fechaIngreso: string;
  fechaSalida: string;
  estado: string;
  usuario: { nombre: string };
  habitacion: { numero: string };
}

const TIPO_LABEL: Record<string, string> = {
  SIMPLE: 'Sencilla', DOBLE: 'Doble', SUITE: 'Suite', FAMILIAR: 'Familiar',
};

export function ReceptionSidebar() {
  const { token } = useAuth();
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [reservasHoy, setReservasHoy] = useState<Reserva[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [form, setForm] = useState({
    habitacionId: '',
    fechaIngreso: '',
    fechaSalida: '',
    numPersonas: '1',
    notas: '',
  });

  useEffect(() => {
    // Cargar habitaciones disponibles
    fetch(`${API_URL}/api/habitaciones`)
      .then(r => r.json())
      .then(data => setHabitaciones(data.filter((h: Habitacion) => h.estado === 'DISPONIBLE')));

    // Cargar reservas de hoy (todas, filtradas por fecha)
    fetch(`${API_URL}/api/reservas`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        const hoy = new Date().toDateString();
        const deHoy = data.filter((r: Reserva) =>
          new Date(r.fechaIngreso).toDateString() === hoy ||
          new Date(r.fechaSalida).toDateString() === hoy
        );
        setReservasHoy(deHoy);
      })
      .catch(() => {});
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/api/reservas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          habitacionId: form.habitacionId,
          fechaIngreso: form.fechaIngreso,
          fechaSalida: form.fechaSalida,
          numPersonas: parseInt(form.numPersonas),
          notas: form.notas,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? 'Error al crear la reserva');
      }

      setSuccessMsg('¡Reserva creada correctamente!');
      setForm({ habitacionId: '', fechaIngreso: '', fechaSalida: '', numPersonas: '1', notas: '' });

      // Recarga habitaciones disponibles
      fetch(`${API_URL}/api/habitaciones`)
        .then(r => r.json())
        .then(data => setHabitaciones(data.filter((h: Habitacion) => h.estado === 'DISPONIBLE')));

    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsSubmitting(false);
    }
  };

  const entradasHoy = reservasHoy.filter(r => new Date(r.fechaIngreso).toDateString() === new Date().toDateString());
  const salidasHoy = reservasHoy.filter(r => new Date(r.fechaSalida).toDateString() === new Date().toDateString());

  return (
    <aside className="w-[320px] shrink-0 flex flex-col gap-16 h-full overflow-y-auto pr-4 custom-scrollbar">

      {/* Entradas de hoy */}
      <div className="bg-surface-white border border-black/10 rounded-sm p-16 shadow-subtle-2">
        <h3 className="text-body-sm font-semibold text-midnight-ink mb-12 flex justify-between items-center">
          Reservas de Hoy
          <span className="bg-pale-mint text-deep-teal text-[10px] px-6 py-2 rounded-sm">{entradasHoy.length}</span>
        </h3>
        {entradasHoy.length === 0 ? (
          <p className="text-caption text-slate-grille">No hay entradas hoy.</p>
        ) : (
          <ul className="flex flex-col gap-8">
            {entradasHoy.map(r => (
              <li key={r.id} className="flex justify-between items-start border-b border-black/5 pb-8 last:border-0 last:pb-0">
                <div>
                  <div className="text-caption font-medium text-midnight-ink">{r.usuario.nombre}</div>
                  <div className="text-[11px] text-slate-grille">
                    Llegada: {new Date(r.fechaIngreso).toLocaleDateString('es-EC')}
                  </div>
                </div>
                <div className="text-caption font-semibold text-oceanic-deep">Hab. {r.habitacion.numero}</div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Salidas de hoy */}
      <div className="bg-surface-white border border-black/10 rounded-sm p-16 shadow-subtle-2">
        <h3 className="text-body-sm font-semibold text-midnight-ink mb-12 flex justify-between items-center">
          Salidas de Hoy
          <span className="bg-warm-mist text-amber-pop text-[10px] px-6 py-2 rounded-sm">{salidasHoy.length}</span>
        </h3>
        {salidasHoy.length === 0 ? (
          <p className="text-caption text-slate-grille">No hay salidas hoy.</p>
        ) : (
          <ul className="flex flex-col gap-8">
            {salidasHoy.map(r => (
              <li key={r.id} className="flex justify-between items-start border-b border-black/5 pb-8 last:border-0 last:pb-0">
                <div>
                  <div className="text-caption font-medium text-midnight-ink">{r.usuario.nombre}</div>
                </div>
                <div className="text-caption font-semibold text-oceanic-deep">Hab. {r.habitacion.numero}</div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Formulario nueva reserva */}
      <div className="bg-surface-white border border-spring-leaf/50 rounded-sm p-16 shadow-subtle">
        <h3 className="text-body font-semibold text-oceanic-deep mb-16">Nueva Reserva Rápida</h3>

        <form className="flex flex-col gap-12" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="text-[11px] text-slate-grille mb-4 block">Llegada</label>
              <Input type="date" name="fechaIngreso" value={form.fechaIngreso} onChange={handleChange} className="text-caption h-28 px-4" required />
            </div>
            <div>
              <label className="text-[11px] text-slate-grille mb-4 block">Salida</label>
              <Input type="date" name="fechaSalida" value={form.fechaSalida} onChange={handleChange} className="text-caption h-28 px-4" required />
            </div>
          </div>

          <div>
            <label className="text-[11px] text-slate-grille mb-4 block">Habitación disponible</label>
            <Select name="habitacionId" value={form.habitacionId} onChange={handleChange} className="text-caption h-28" required>
              <option value="">Seleccione habitación...</option>
              {habitaciones.map(h => (
                <option key={h.id} value={h.id}>
                  {h.numero} - {TIPO_LABEL[h.tipo] ?? h.tipo} (${parseFloat(h.precioPorNoche).toFixed(2)}/noche)
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="text-[11px] text-slate-grille mb-4 block">Número de personas</label>
            <Input type="number" name="numPersonas" value={form.numPersonas} onChange={handleChange} min="1" max="10" className="text-caption h-28" required />
          </div>

          <div>
            <label className="text-[11px] text-slate-grille mb-4 block">Notas (opcional)</label>
            <Input type="text" name="notas" value={form.notas} onChange={handleChange} placeholder="Peticiones especiales..." className="text-caption h-28" />
          </div>

          {successMsg && (
            <div className="bg-pale-mint text-deep-teal text-caption px-12 py-8 rounded-sm border border-spring-leaf/30">
              {successMsg}
            </div>
          )}
          {errorMsg && (
            <div className="bg-warm-mist text-amber-pop text-caption px-12 py-8 rounded-sm">
              {errorMsg}
            </div>
          )}

          <Button variant="primary" className="w-full mt-4 h-32 text-caption" disabled={isSubmitting}>
            {isSubmitting ? 'Creando reserva...' : 'Confirmar Reserva'}
          </Button>
        </form>
      </div>
    </aside>
  );
}
