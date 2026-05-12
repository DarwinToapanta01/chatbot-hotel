// src/components/management/RoomEditModal.tsx
import { useState } from 'react';
import { X, BedDouble } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { Habitacion } from './RoomTable';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

const TIPOS = ['SIMPLE', 'DOBLE', 'SUITE', 'FAMILIAR'];
const TIPO_LABEL: Record<string, string> = {
    SIMPLE: 'Sencilla', DOBLE: 'Doble', SUITE: 'Suite', FAMILIAR: 'Familiar',
};
const AMENIDADES_OPCIONES = [
    'WiFi', 'TV', 'Aire acondicionado', 'Minibar', 'Jacuzzi',
    'Desayuno incluido', 'Balcón', 'Terraza', 'Nevera', 'Cafetera',
    'Escritorio', 'Bañera', 'Vista piscina', 'Vista montaña', 'Vista panorámica',
    'Sala de estar', 'Cocina equipada', 'Sofá cama', 'Butler service',
];

interface RoomEditModalProps {
    habitacion: Habitacion;
    onClose: () => void;
    onSaved: () => void;
}

const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 12px',
    border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px',
    fontSize: '13px', color: '#00262b', outline: 'none',
    boxSizing: 'border-box', background: '#fafafa', transition: 'border-color 0.15s',
};

export function RoomEditModal({ habitacion, onClose, onSaved }: RoomEditModalProps) {
    const { token } = useAuth();
    const [form, setForm] = useState({
        numero: habitacion.numero,
        tipo: habitacion.tipo,
        precioPorNoche: habitacion.precioPorNoche,
        capacidad: habitacion.capacidad.toString(),
        descripcion: habitacion.descripcion ?? '',
        amenidades: [...habitacion.amenidades],
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const toggleAmenidad = (a: string) => {
        setForm(prev => ({
            ...prev,
            amenidades: prev.amenidades.includes(a)
                ? prev.amenidades.filter(x => x !== a)
                : [...prev.amenidades, a],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/habitaciones/${habitacion.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    numero: form.numero,
                    tipo: form.tipo,
                    precioPorNoche: parseFloat(form.precioPorNoche),
                    capacidad: parseInt(form.capacidad),
                    descripcion: form.descripcion,
                    amenidades: form.amenidades,
                }),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error ?? 'Error al actualizar');
            }
            onSaved();
            onClose();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setIsLoading(false);
        }
    };

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
                    background: '#ffffff', borderRadius: '12px',
                    width: '100%', maxWidth: '520px',
                    maxHeight: '90vh', overflowY: 'auto',
                    boxShadow: '0 24px 64px rgba(0,38,43,0.16)',
                    animation: 'modalIn 0.2s ease-out',
                }}
            >
                <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: scale(0.96) translateY(8px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
          .edit-input:focus { border-color: #abffae !important; box-shadow: 0 0 0 3px rgba(171,255,174,0.2); }
        `}</style>

                {/* Header */}
                <div style={{ background: '#00262b', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <BedDouble style={{ width: '18px', height: '18px', color: '#abffae' }} />
                        <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '16px' }}>
                            Editar Habitación {habitacion.numero}
                        </span>
                    </div>
                    <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#ffffff', cursor: 'pointer', borderRadius: '6px', padding: '6px', display: 'flex' }}>
                        <X style={{ width: '16px', height: '16px' }} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    {/* Número y Tipo */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#354d51', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Número
                            </label>
                            <input
                                className="edit-input"
                                style={inputStyle}
                                type="text"
                                value={form.numero}
                                onChange={e => setForm(p => ({ ...p, numero: e.target.value }))}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#354d51', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Tipo
                            </label>
                            <select
                                className="edit-input"
                                style={inputStyle}
                                value={form.tipo}
                                onChange={e => setForm(p => ({ ...p, tipo: e.target.value }))}
                            >
                                {TIPOS.map(t => (
                                    <option key={t} value={t}>{TIPO_LABEL[t]}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Precio y Capacidad */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#354d51', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Precio por noche ($)
                            </label>
                            <input
                                className="edit-input"
                                style={inputStyle}
                                type="number"
                                min="1"
                                step="0.01"
                                value={form.precioPorNoche}
                                onChange={e => setForm(p => ({ ...p, precioPorNoche: e.target.value }))}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#354d51', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Capacidad (personas)
                            </label>
                            <input
                                className="edit-input"
                                style={inputStyle}
                                type="number"
                                min="1"
                                max="20"
                                value={form.capacidad}
                                onChange={e => setForm(p => ({ ...p, capacidad: e.target.value }))}
                                required
                            />
                        </div>
                    </div>

                    {/* Descripción */}
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#354d51', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Descripción
                        </label>
                        <textarea
                            className="edit-input"
                            style={{ ...inputStyle, resize: 'vertical', minHeight: '72px' }}
                            value={form.descripcion}
                            onChange={e => setForm(p => ({ ...p, descripcion: e.target.value }))}
                            placeholder="Descripción de la habitación..."
                        />
                    </div>

                    {/* Amenidades */}
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#354d51', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Amenidades
                        </label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {AMENIDADES_OPCIONES.map(a => {
                                const activa = form.amenidades.includes(a);
                                return (
                                    <button
                                        key={a}
                                        type="button"
                                        onClick={() => toggleAmenidad(a)}
                                        style={{
                                            padding: '5px 12px',
                                            borderRadius: '9999px',
                                            fontSize: '12px',
                                            fontWeight: activa ? 600 : 400,
                                            cursor: 'pointer',
                                            border: `1px solid ${activa ? '#437278' : 'rgba(0,0,0,0.1)'}`,
                                            background: activa ? '#eafde8' : 'transparent',
                                            color: activa ? '#437278' : '#354d51',
                                            transition: 'all 0.15s',
                                        }}
                                    >
                                        {activa ? '✓ ' : ''}{a}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {error && (
                        <div style={{ background: '#feefe8', border: '1px solid rgba(139,57,17,0.2)', borderRadius: '6px', padding: '10px 14px', fontSize: '13px', color: '#8b3911' }}>
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Botones */}
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '8px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                padding: '8px 20px', background: 'transparent',
                                color: '#354d51', border: '1px solid rgba(0,0,0,0.1)',
                                borderRadius: '9999px', fontSize: '13px', cursor: 'pointer',
                            }}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                padding: '8px 24px',
                                background: isLoading ? '#a1c2c6' : '#00262b',
                                color: '#ffffff', border: 'none',
                                borderRadius: '9999px', fontSize: '13px',
                                fontWeight: 600, cursor: isLoading ? 'not-allowed' : 'pointer',
                                transition: 'background 0.15s',
                            }}
                        >
                            {isLoading ? 'Guardando...' : '✓ Guardar cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
