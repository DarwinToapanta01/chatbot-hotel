// src/pages/MisReservas.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { MainLayout } from '../components/layout/MainLayout';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

interface Reserva {
    id: string;
    fechaIngreso: string;
    fechaSalida: string;
    numPersonas: number;
    estado: string;
    precioTotal: string;
    notas: string | null;
    habitacion: {
        numero: string;
        tipo: string;
        precioPorNoche: string;
        amenidades: string[];
    };
    pago: { estado: string; metodo: string } | null;
}

const ESTADO_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
    PENDIENTE: { label: 'Pendiente', color: '#0a3890', bg: '#e0f4ff' },
    CONFIRMADA: { label: 'Confirmada', color: '#437278', bg: '#eafde8' },
    ACTIVA: { label: 'Activa', color: '#437278', bg: '#abffae' },
    COMPLETADA: { label: 'Completada', color: '#354d51', bg: '#ebebeb' },
    CANCELADA: { label: 'Cancelada', color: '#8b3911', bg: '#feefe8' },
};

const TIPO_LABEL: Record<string, string> = {
    SIMPLE: 'Sencilla', DOBLE: 'Doble', SUITE: 'Suite', FAMILIAR: 'Familiar',
};

export function MisReservas() {
    const { token, usuario } = useAuth();
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cancelando, setCancelando] = useState<string | null>(null);

    const fetchReservas = async () => {
        try {
            const res = await fetch(`${API_URL}/api/reservas/mis-reservas`, {
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

    const cancelarReserva = async (id: string) => {
        if (!confirm('¿Estás seguro de que deseas cancelar esta reserva?')) return;
        setCancelando(id);
        try {
            await fetch(`${API_URL}/api/reservas/${id}/cancelar`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchReservas();
        } catch {
            alert('Error al cancelar la reserva');
        } finally {
            setCancelando(null);
        }
    };

    const formatFecha = (fecha: string) =>
        new Date(fecha).toLocaleDateString('es-EC', { day: '2-digit', month: 'short', year: 'numeric' });

    const calcularNoches = (ingreso: string, salida: string) =>
        Math.ceil((new Date(salida).getTime() - new Date(ingreso).getTime()) / (1000 * 60 * 60 * 24));

    return (
        <MainLayout>
            <div className="max-w-[900px] mx-auto px-16 py-48">

                {/* Header */}
                <div className="mb-32">
                    <h1 className="text-heading font-bold text-midnight-ink tracking-heading">
                        Mis Reservas
                    </h1>
                    <p className="text-body text-slate-grille mt-8">
                        Bienvenido, <strong>{usuario?.nombre}</strong>. Aquí puedes ver y gestionar tus reservas.
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-64 text-slate-grille">
                        Cargando reservas...
                    </div>
                ) : reservas.length === 0 ? (
                    <div className="bg-surface-white border border-black/10 rounded-sm p-48 text-center">
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏨</div>
                        <h3 className="text-heading-sm font-semibold text-midnight-ink mb-8">
                            No tienes reservas aún
                        </h3>
                        <p className="text-body text-slate-grille mb-24">
                            Chatea con nuestro asistente virtual para encontrar la habitación perfecta.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-16">
                        {reservas.map(reserva => {
                            const estado = ESTADO_CONFIG[reserva.estado] ?? ESTADO_CONFIG.PENDIENTE;
                            const noches = calcularNoches(reserva.fechaIngreso, reserva.fechaSalida);
                            const puedeCancelar = ['PENDIENTE', 'CONFIRMADA'].includes(reserva.estado);

                            return (
                                <div
                                    key={reserva.id}
                                    className="bg-surface-white border border-black/10 rounded-sm p-24 shadow-subtle"
                                >
                                    <div className="flex items-start justify-between mb-16">
                                        <div>
                                            <div className="flex items-center gap-12 mb-4">
                                                <span className="text-heading-sm font-bold text-midnight-ink">
                                                    Hab. {reserva.habitacion.numero}
                                                </span>
                                                <span className="text-body-sm text-slate-grille">
                                                    {TIPO_LABEL[reserva.habitacion.tipo] ?? reserva.habitacion.tipo}
                                                </span>
                                                <span
                                                    style={{
                                                        background: estado.bg,
                                                        color: estado.color,
                                                        padding: '2px 10px',
                                                        borderRadius: '9999px',
                                                        fontSize: '11px',
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {estado.label}
                                                </span>
                                            </div>
                                            <p className="text-caption text-slate-grille">
                                                ID: {reserva.id.slice(0, 8).toUpperCase()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-heading-sm font-bold text-midnight-ink">
                                                ${parseFloat(reserva.precioTotal).toFixed(2)}
                                            </div>
                                            <div className="text-caption text-slate-grille">
                                                {noches} {noches === 1 ? 'noche' : 'noches'}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Fechas */}
                                    <div className="grid grid-cols-3 gap-16 py-16 border-y border-black/5 mb-16">
                                        <div>
                                            <div className="text-[11px] text-slate-grille uppercase tracking-wider mb-4">Check-in</div>
                                            <div className="text-body-sm font-medium text-midnight-ink">{formatFecha(reserva.fechaIngreso)}</div>
                                            <div className="text-caption text-slate-grille">14:00</div>
                                        </div>
                                        <div>
                                            <div className="text-[11px] text-slate-grille uppercase tracking-wider mb-4">Check-out</div>
                                            <div className="text-body-sm font-medium text-midnight-ink">{formatFecha(reserva.fechaSalida)}</div>
                                            <div className="text-caption text-slate-grille">12:00</div>
                                        </div>
                                        <div>
                                            <div className="text-[11px] text-slate-grille uppercase tracking-wider mb-4">Huéspedes</div>
                                            <div className="text-body-sm font-medium text-midnight-ink">{reserva.numPersonas} persona{reserva.numPersonas > 1 ? 's' : ''}</div>
                                            <div className="text-caption text-slate-grille">${parseFloat(reserva.habitacion.precioPorNoche).toFixed(2)}/noche</div>
                                        </div>
                                    </div>

                                    {/* Amenidades */}
                                    {reserva.habitacion.amenidades.length > 0 && (
                                        <div className="flex flex-wrap gap-6 mb-16">
                                            {reserva.habitacion.amenidades.map(a => (
                                                <span
                                                    key={a}
                                                    style={{
                                                        background: '#f4f4f4',
                                                        color: '#354d51',
                                                        padding: '3px 10px',
                                                        borderRadius: '9999px',
                                                        fontSize: '11px',
                                                    }}
                                                >
                                                    {a}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Notas */}
                                    {reserva.notas && (
                                        <p className="text-caption text-slate-grille mb-16 italic">
                                            📝 {reserva.notas}
                                        </p>
                                    )}

                                    {/* Acciones */}
                                    {puedeCancelar && (
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => cancelarReserva(reserva.id)}
                                                disabled={cancelando === reserva.id}
                                                style={{
                                                    background: 'transparent',
                                                    border: '1px solid #8b3911',
                                                    color: '#8b3911',
                                                    padding: '6px 16px',
                                                    borderRadius: '9999px',
                                                    fontSize: '13px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.15s',
                                                    opacity: cancelando === reserva.id ? 0.5 : 1,
                                                }}
                                            >
                                                {cancelando === reserva.id ? 'Cancelando...' : 'Cancelar reserva'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}