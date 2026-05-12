// src/pages/ReservasAdmin.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { AdminLayout } from '../components/layout/AdminLayout';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

interface Reserva {
    id: string;
    fechaIngreso: string;
    fechaSalida: string;
    numPersonas: number;
    estado: string;
    precioTotal: string;
    notas: string | null;
    creadoEn: string;
    usuario: { nombre: string; email: string; telefono: string | null };
    habitacion: { numero: string; tipo: string; precioPorNoche: string };
    pago: { estado: string; metodo: string } | null;
}

const ESTADO_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
    PENDIENTE: { label: 'Pendiente', color: '#0a3890', bg: '#e0f4ff' },
    CONFIRMADA: { label: 'Confirmada', color: '#437278', bg: '#eafde8' },
    ACTIVA: { label: 'Activa', color: '#00262b', bg: '#abffae' },
    COMPLETADA: { label: 'Completada', color: '#354d51', bg: '#ebebeb' },
    CANCELADA: { label: 'Cancelada', color: '#8b3911', bg: '#feefe8' },
};

const TIPO_LABEL: Record<string, string> = {
    SIMPLE: 'Sencilla', DOBLE: 'Doble', SUITE: 'Suite', FAMILIAR: 'Familiar',
};

const ESTADOS_TRANSICION: Record<string, string[]> = {
    PENDIENTE: ['CONFIRMADA', 'CANCELADA'],
    CONFIRMADA: ['ACTIVA', 'CANCELADA'],
    ACTIVA: ['COMPLETADA'],
    COMPLETADA: [],
    CANCELADA: [],
};

export function ReservasAdmin() {
    const { token } = useAuth();
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filtroEstado, setFiltroEstado] = useState('');
    const [busqueda, setBusqueda] = useState('');

    const fetchReservas = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/reservas`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setReservas(Array.isArray(data) ? data : []);
        } catch {
            setReservas([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchReservas(); }, []);

    const cambiarEstado = async (id: string, estado: string) => {
        try {
            await fetch(`${API_URL}/api/reservas/${id}/estado`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ estado }),
            });
            fetchReservas();
        } catch {
            alert('Error al cambiar el estado');
        }
    };

    const formatFecha = (fecha: string) =>
        new Date(fecha).toLocaleDateString('es-EC', { day: '2-digit', month: 'short', year: 'numeric' });

    const calcularNoches = (ingreso: string, salida: string) =>
        Math.ceil((new Date(salida).getTime() - new Date(ingreso).getTime()) / (1000 * 60 * 60 * 24));

    const reservasFiltradas = reservas
        .filter(r => filtroEstado ? r.estado === filtroEstado : true)
        .filter(r => {
            if (!busqueda) return true;
            const q = busqueda.toLowerCase();
            return (
                r.usuario.nombre.toLowerCase().includes(q) ||
                r.usuario.email.toLowerCase().includes(q) ||
                r.habitacion.numero.includes(q) ||
                r.id.toLowerCase().includes(q)
            );
        });

    return (
        <AdminLayout>
            <div className="flex-1 flex flex-col min-w-0 h-full">
                <div className="flex items-center justify-between mb-16">
                    <h2 className="text-heading-sm font-bold text-midnight-ink">
                        Gestión de Reservas
                    </h2>
                    <span className="text-caption text-slate-grille">
                        <strong className="text-midnight-ink">{reservasFiltradas.length}</strong> de {reservas.length} reservas
                    </span>
                </div>

                {/* Filtros */}
                <div className="bg-surface-white border border-black/10 rounded-sm p-16 mb-16 flex flex-wrap gap-12 items-center shadow-subtle-2">
                    <div className="flex gap-6 flex-wrap">
                        {[{ value: '', label: 'Todas' }, ...Object.entries(ESTADO_CONFIG).map(([value, { label }]) => ({ value, label }))].map(op => (
                            <button
                                key={op.value}
                                onClick={() => setFiltroEstado(op.value)}
                                style={{
                                    padding: '4px 12px',
                                    borderRadius: '9999px',
                                    fontSize: '12px',
                                    fontWeight: filtroEstado === op.value ? 600 : 400,
                                    cursor: 'pointer',
                                    border: `1px solid ${filtroEstado === op.value ? '#00262b' : 'rgba(0,0,0,0.1)'}`,
                                    background: filtroEstado === op.value ? '#00262b' : 'transparent',
                                    color: filtroEstado === op.value ? '#ffffff' : '#354d51',
                                    transition: 'all 0.15s',
                                }}
                            >
                                {op.label}
                                {op.value && (
                                    <span style={{ marginLeft: '6px', opacity: 0.7 }}>
                                        ({reservas.filter(r => r.estado === op.value).length})
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="🔍 Buscar por huésped, email o habitación..."
                        value={busqueda}
                        onChange={e => setBusqueda(e.target.value)}
                        style={{
                            marginLeft: 'auto',
                            padding: '7px 14px',
                            border: '1px solid rgba(0,0,0,0.1)',
                            borderRadius: '9999px',
                            fontSize: '13px',
                            outline: 'none',
                            width: '280px',
                            color: '#00262b',
                        }}
                    />
                </div>

                {/* Tabla */}
                <div className="bg-surface-white border border-black/10 rounded-sm shadow-subtle overflow-hidden flex-1 flex flex-col">
                    <div className="overflow-y-auto">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-48 text-slate-grille">
                                Cargando reservas...
                            </div>
                        ) : reservasFiltradas.length === 0 ? (
                            <div className="flex items-center justify-center py-48 text-slate-grille">
                                No hay reservas con esos filtros.
                            </div>
                        ) : (
                            <table className="w-full text-left border-collapse text-caption">
                                <thead className="bg-fog-gray sticky top-0 z-10 border-b border-black/10">
                                    <tr>
                                        <th className="py-8 px-16 font-semibold text-slate-grille uppercase tracking-wider text-[11px]">ID</th>
                                        <th className="py-8 px-16 font-semibold text-slate-grille uppercase tracking-wider text-[11px]">Huésped</th>
                                        <th className="py-8 px-16 font-semibold text-slate-grille uppercase tracking-wider text-[11px]">Hab.</th>
                                        <th className="py-8 px-16 font-semibold text-slate-grille uppercase tracking-wider text-[11px]">Check-in</th>
                                        <th className="py-8 px-16 font-semibold text-slate-grille uppercase tracking-wider text-[11px]">Check-out</th>
                                        <th className="py-8 px-16 font-semibold text-slate-grille uppercase tracking-wider text-[11px] text-center">Noches</th>
                                        <th className="py-8 px-16 font-semibold text-slate-grille uppercase tracking-wider text-[11px]">Total</th>
                                        <th className="py-8 px-16 font-semibold text-slate-grille uppercase tracking-wider text-[11px]">Estado</th>
                                        <th className="py-8 px-16 font-semibold text-slate-grille uppercase tracking-wider text-[11px]">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-black/5">
                                    {reservasFiltradas.map(reserva => {
                                        const estado = ESTADO_CONFIG[reserva.estado] ?? ESTADO_CONFIG.PENDIENTE;
                                        const noches = calcularNoches(reserva.fechaIngreso, reserva.fechaSalida);
                                        const transiciones = ESTADOS_TRANSICION[reserva.estado] ?? [];

                                        return (
                                            <tr key={reserva.id} className="hover:bg-fog-gray transition-colors">
                                                <td className="py-8 px-16 font-mono text-[11px] text-slate-grille">
                                                    {reserva.id.slice(0, 8).toUpperCase()}
                                                </td>
                                                <td className="py-8 px-16">
                                                    <div className="font-medium text-midnight-ink">{reserva.usuario.nombre}</div>
                                                    <div className="text-[11px] text-slate-grille">{reserva.usuario.email}</div>
                                                </td>
                                                <td className="py-8 px-16">
                                                    <div className="font-medium text-midnight-ink">Hab. {reserva.habitacion.numero}</div>
                                                    <div className="text-[11px] text-slate-grille">{TIPO_LABEL[reserva.habitacion.tipo] ?? reserva.habitacion.tipo}</div>
                                                </td>
                                                <td className="py-8 px-16 text-midnight-ink">{formatFecha(reserva.fechaIngreso)}</td>
                                                <td className="py-8 px-16 text-midnight-ink">{formatFecha(reserva.fechaSalida)}</td>
                                                <td className="py-8 px-16 text-center text-slate-grille">{noches}</td>
                                                <td className="py-8 px-16 font-medium text-midnight-ink">
                                                    ${parseFloat(reserva.precioTotal).toFixed(2)}
                                                </td>
                                                <td className="py-8 px-16">
                                                    <span style={{
                                                        background: estado.bg,
                                                        color: estado.color,
                                                        padding: '3px 10px',
                                                        borderRadius: '9999px',
                                                        fontSize: '11px',
                                                        fontWeight: 600,
                                                        whiteSpace: 'nowrap',
                                                    }}>
                                                        {estado.label}
                                                    </span>
                                                </td>
                                                <td className="py-8 px-16">
                                                    <div className="flex gap-6 flex-wrap">
                                                        {transiciones.map(siguiente => {
                                                            const cfg = ESTADO_CONFIG[siguiente];
                                                            return (
                                                                <button
                                                                    key={siguiente}
                                                                    onClick={() => cambiarEstado(reserva.id, siguiente)}
                                                                    style={{
                                                                        padding: '3px 10px',
                                                                        borderRadius: '9999px',
                                                                        fontSize: '11px',
                                                                        fontWeight: 500,
                                                                        cursor: 'pointer',
                                                                        border: `1px solid ${cfg.color}40`,
                                                                        background: cfg.bg,
                                                                        color: cfg.color,
                                                                        transition: 'opacity 0.15s',
                                                                        whiteSpace: 'nowrap',
                                                                    }}
                                                                >
                                                                    → {cfg.label}
                                                                </button>
                                                            );
                                                        })}
                                                        {transiciones.length === 0 && (
                                                            <span className="text-[11px] text-slate-grille">—</span>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}