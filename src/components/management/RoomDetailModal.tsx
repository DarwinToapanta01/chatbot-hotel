// src/components/management/RoomDetailModal.tsx
import { X, BedDouble, Users, DollarSign, Tag, FileText, Wifi, Tv, Wind, Coffee, Bath, Star } from 'lucide-react';
import type { Habitacion } from './RoomTable';

const TIPO_LABEL: Record<string, string> = {
    SIMPLE: 'Sencilla', DOBLE: 'Doble', SUITE: 'Suite', FAMILIAR: 'Familiar',
};

const ESTADO_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
    DISPONIBLE: { label: 'Disponible', color: '#437278', bg: '#eafde8' },
    OCUPADA: { label: 'Ocupado', color: '#8b3911', bg: '#feefe8' },
    LIMPIEZA: { label: 'Limpieza', color: '#0a3890', bg: '#e0f4ff' },
    MANTENIMIENTO: { label: 'Mantenimiento', color: '#354d51', bg: '#ebebeb' },
};

const AMENIDAD_ICON: Record<string, React.ReactNode> = {
    'WiFi': <Wifi className="w-12 h-12" />,
    'TV': <Tv className="w-12 h-12" />,
    'Aire acondicionado': <Wind className="w-12 h-12" />,
    'Cafetera': <Coffee className="w-12 h-12" />,
    'Jacuzzi': <Bath className="w-12 h-12" />,
    'Desayuno incluido': <Star className="w-12 h-12" />,
};

interface RoomDetailModalProps {
    habitacion: Habitacion;
    onClose: () => void;
}

export function RoomDetailModal({ habitacion, onClose }: RoomDetailModalProps) {
    const estado = ESTADO_CONFIG[habitacion.estado] ?? ESTADO_CONFIG.DISPONIBLE;

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,38,43,0.4)',
                zIndex: 99999,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Inter', sans-serif",
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    width: '100%',
                    maxWidth: '480px',
                    boxShadow: '0 24px 64px rgba(0,38,43,0.16)',
                    animation: 'modalIn 0.2s ease-out',
                    overflow: 'hidden',
                }}
            >
                <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: scale(0.96) translateY(8px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>

                {/* Header */}
                <div style={{ background: '#00262b', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#abffae20', border: '1px solid #abffae40', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <BedDouble style={{ width: '20px', height: '20px', color: '#abffae' }} />
                        </div>
                        <div>
                            <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '18px' }}>
                                Habitación {habitacion.numero}
                            </div>
                            <div style={{ color: '#a1c2c6', fontSize: '12px' }}>
                                {TIPO_LABEL[habitacion.tipo] ?? habitacion.tipo}
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#ffffff', cursor: 'pointer', borderRadius: '6px', padding: '6px', display: 'flex' }}>
                        <X style={{ width: '16px', height: '16px' }} />
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    {/* Estado y precio */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                        <div style={{ background: '#fafafa', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px', color: '#437278' }}>
                                <Tag style={{ width: '16px', height: '16px' }} />
                            </div>
                            <div style={{ fontSize: '11px', color: '#4f6466', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estado</div>
                            <span style={{ background: estado.bg, color: estado.color, padding: '3px 8px', borderRadius: '9999px', fontSize: '11px', fontWeight: 600 }}>
                                {estado.label}
                            </span>
                        </div>
                        <div style={{ background: '#fafafa', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px', color: '#437278' }}>
                                <DollarSign style={{ width: '16px', height: '16px' }} />
                            </div>
                            <div style={{ fontSize: '11px', color: '#4f6466', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Precio</div>
                            <div style={{ fontSize: '15px', fontWeight: 700, color: '#00262b' }}>
                                ${parseFloat(habitacion.precioPorNoche).toFixed(2)}
                            </div>
                            <div style={{ fontSize: '10px', color: '#a1c2c6' }}>por noche</div>
                        </div>
                        <div style={{ background: '#fafafa', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px', color: '#437278' }}>
                                <Users style={{ width: '16px', height: '16px' }} />
                            </div>
                            <div style={{ fontSize: '11px', color: '#4f6466', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Capacidad</div>
                            <div style={{ fontSize: '15px', fontWeight: 700, color: '#00262b' }}>{habitacion.capacidad}</div>
                            <div style={{ fontSize: '10px', color: '#a1c2c6' }}>personas</div>
                        </div>
                    </div>

                    {/* Descripción */}
                    {habitacion.descripcion && (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                <FileText style={{ width: '13px', height: '13px', color: '#437278' }} />
                                <span style={{ fontSize: '11px', fontWeight: 600, color: '#354d51', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Descripción</span>
                            </div>
                            <p style={{ fontSize: '13px', color: '#354d51', lineHeight: 1.6, margin: 0, background: '#fafafa', padding: '12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)' }}>
                                {habitacion.descripcion}
                            </p>
                        </div>
                    )}

                    {/* Amenidades */}
                    {habitacion.amenidades.length > 0 && (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                                <Star style={{ width: '13px', height: '13px', color: '#437278' }} />
                                <span style={{ fontSize: '11px', fontWeight: 600, color: '#354d51', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Amenidades</span>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {habitacion.amenidades.map(a => (
                                    <div key={a} style={{
                                        display: 'flex', alignItems: 'center', gap: '5px',
                                        background: '#e0f4ff', color: '#0a3890',
                                        padding: '5px 10px', borderRadius: '9999px', fontSize: '12px', fontWeight: 500,
                                    }}>
                                        {AMENIDAD_ICON[a] ?? <Star style={{ width: '12px', height: '12px' }} />}
                                        {a}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '8px 20px', background: '#00262b', color: '#ffffff',
                            border: 'none', borderRadius: '9999px', fontSize: '13px',
                            fontWeight: 600, cursor: 'pointer',
                        }}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
