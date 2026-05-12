// src/components/management/ReceptionSidebar.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CalendarCheck, CalendarX, Users, BedDouble, FileText, LogIn, LogOut } from 'lucide-react';

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

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '7px 10px',
  border: '1px solid rgba(0,0,0,0.1)',
  borderRadius: '4px',
  fontSize: '12px',
  color: '#00262b',
  background: '#fafafa',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s',
};

const labelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '11px',
  fontWeight: 600,
  color: '#354d51',
  marginBottom: '4px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

export function ReceptionSidebar() {
  const { token } = useAuth();
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [reservasHoy, setReservasHoy] = useState<Reserva[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [form, setForm] = useState({
    habitacionId: '', fechaIngreso: '', fechaSalida: '', numPersonas: '1', notas: '',
  });

  useEffect(() => {
    fetch(`${API_URL}/api/habitaciones`)
      .then(r => r.json())
      .then(data => setHabitaciones(data.filter((h: Habitacion) => h.estado === 'DISPONIBLE')));

    fetch(`${API_URL}/api/reservas`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => {
        const hoy = new Date().toDateString();
        setReservasHoy(data.filter((r: Reserva) =>
          new Date(r.fechaIngreso).toDateString() === hoy ||
          new Date(r.fechaSalida).toDateString() === hoy
        ));
      })
      .catch(() => { });
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(''); setSuccessMsg('');
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/reservas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
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
      setSuccessMsg('¡Reserva creada!');
      setForm({ habitacionId: '', fechaIngreso: '', fechaSalida: '', numPersonas: '1', notas: '' });
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
    <aside style={{ width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '12px', height: '100%', overflowY: 'auto' }}>

      {/* Entradas de hoy */}
      <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '4px', padding: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#00262b', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <LogIn style={{ width: '13px', height: '13px', color: '#437278' }} /> Entradas hoy
          </span>
          <span style={{ background: '#eafde8', color: '#437278', fontSize: '10px', fontWeight: 600, padding: '2px 7px', borderRadius: '3px' }}>
            {entradasHoy.length}
          </span>
        </div>
        {entradasHoy.length === 0 ? (
          <p style={{ fontSize: '11px', color: '#a1c2c6', margin: 0 }}>Sin entradas hoy</p>
        ) : (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {entradasHoy.map(r => (
              <li key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '6px', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 500, color: '#00262b' }}>{r.usuario.nombre}</div>
                  <div style={{ fontSize: '11px', color: '#4f6466' }}>Check-in: 14:00</div>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#0b363b', background: '#f4f4f4', padding: '2px 7px', borderRadius: '3px' }}>
                  {r.habitacion.numero}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Salidas de hoy */}
      <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '4px', padding: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#00262b', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <LogOut style={{ width: '13px', height: '13px', color: '#8b3911' }} /> Salidas hoy
          </span>
          <span style={{ background: '#feefe8', color: '#8b3911', fontSize: '10px', fontWeight: 600, padding: '2px 7px', borderRadius: '3px' }}>
            {salidasHoy.length}
          </span>
        </div>
        {salidasHoy.length === 0 ? (
          <p style={{ fontSize: '11px', color: '#a1c2c6', margin: 0 }}>Sin salidas hoy</p>
        ) : (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {salidasHoy.map(r => (
              <li key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '6px', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '12px', fontWeight: 500, color: '#00262b' }}>{r.usuario.nombre}</div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#0b363b', background: '#f4f4f4', padding: '2px 7px', borderRadius: '3px' }}>
                  {r.habitacion.numero}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Formulario nueva reserva */}
      <div style={{ background: '#ffffff', border: '1px solid rgba(171,255,174,0.5)', borderRadius: '4px', padding: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <CalendarCheck style={{ width: '14px', height: '14px', color: '#437278' }} />
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#0b363b' }}>Nueva Reserva Rápida</span>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

          {/* Fechas */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div>
              <label style={labelStyle}>
                <CalendarCheck style={{ width: '10px', height: '10px' }} /> Llegada
              </label>
              <input
                style={inputStyle}
                type="date"
                name="fechaIngreso"
                value={form.fechaIngreso}
                onChange={handleChange}
                required
                onFocus={e => e.currentTarget.style.borderColor = '#abffae'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'}
              />
            </div>
            <div>
              <label style={labelStyle}>
                <CalendarX style={{ width: '10px', height: '10px' }} /> Salida
              </label>
              <input
                style={inputStyle}
                type="date"
                name="fechaSalida"
                value={form.fechaSalida}
                onChange={handleChange}
                required
                onFocus={e => e.currentTarget.style.borderColor = '#abffae'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'}
              />
            </div>
          </div>

          {/* Habitación */}
          <div>
            <label style={labelStyle}>
              <BedDouble style={{ width: '10px', height: '10px' }} /> Habitación
            </label>
            <select
              name="habitacionId"
              value={form.habitacionId}
              onChange={handleChange}
              required
              style={inputStyle}
              onFocus={e => e.currentTarget.style.borderColor = '#abffae'}
              onBlur={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'}
            >
              <option value="">Seleccione...</option>
              {habitaciones.map(h => (
                <option key={h.id} value={h.id}>
                  {h.numero} - {TIPO_LABEL[h.tipo] ?? h.tipo} · ${parseFloat(h.precioPorNoche).toFixed(0)}/noche
                </option>
              ))}
            </select>
          </div>

          {/* Personas */}
          <div>
            <label style={labelStyle}>
              <Users style={{ width: '10px', height: '10px' }} /> Personas
            </label>
            <input
              style={inputStyle}
              type="number"
              name="numPersonas"
              value={form.numPersonas}
              onChange={handleChange}
              min="1" max="10"
              required
              onFocus={e => e.currentTarget.style.borderColor = '#abffae'}
              onBlur={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'}
            />
          </div>

          {/* Notas */}
          <div>
            <label style={labelStyle}>
              <FileText style={{ width: '10px', height: '10px' }} /> Notas
            </label>
            <input
              style={inputStyle}
              type="text"
              name="notas"
              value={form.notas}
              onChange={handleChange}
              placeholder="Peticiones especiales..."
              onFocus={e => e.currentTarget.style.borderColor = '#abffae'}
              onBlur={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'}
            />
          </div>

          {successMsg && (
            <div style={{ background: '#eafde8', border: '1px solid rgba(171,255,174,0.5)', borderRadius: '4px', padding: '7px 10px', fontSize: '11px', color: '#437278' }}>
              ✅ {successMsg}
            </div>
          )}
          {errorMsg && (
            <div style={{ background: '#feefe8', border: '1px solid rgba(139,57,17,0.2)', borderRadius: '4px', padding: '7px 10px', fontSize: '11px', color: '#8b3911' }}>
              ⚠️ {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '8px',
              background: isSubmitting ? '#a1c2c6' : '#00262b',
              color: '#ffffff',
              border: 'none',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'background 0.15s',
              marginTop: '4px',
            }}
          >
            {isSubmitting ? 'Creando...' : '✓ Confirmar Reserva'}
          </button>
        </form>
      </div>
    </aside>
  );
}
