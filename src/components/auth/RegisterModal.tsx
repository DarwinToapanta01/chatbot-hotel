// src/components/auth/RegisterModal.tsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface RegisterModalProps {
    onClose: () => void;
    onSwitchToLogin: () => void;
}

export function RegisterModal({ onClose, onSwitchToLogin }: RegisterModalProps) {
    const { login } = useAuth();
    const [form, setForm] = useState({ nombre: '', email: '', telefono: '', password: '', confirmar: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (form.password !== form.confirmar) {
            setError('Las contraseñas no coinciden');
            return;
        }
        if (form.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/auth/registro`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: form.nombre,
                    email: form.email,
                    password: form.password,
                    telefono: form.telefono,
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error ?? 'Error al registrarse');
            }

            // Auto login después del registro
            await login(form.email, form.password);
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Inter', sans-serif",
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '40px',
                    width: '100%',
                    maxWidth: '420px',
                    boxShadow: '0 24px 64px rgba(0,38,43,0.16)',
                    animation: 'modalIn 0.2s ease-out',
                }}
            >
                <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: scale(0.96) translateY(8px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
          .auth-input { width: 100%; padding: 10px 14px; border: 1px solid rgba(0,0,0,0.12); border-radius: 6px; font-size: 14px; color: #00262b; outline: none; box-sizing: border-box; transition: border-color 0.15s; }
          .auth-input:focus { border-color: #abffae; box-shadow: 0 0 0 3px rgba(171,255,174,0.2); }
          .auth-btn { width: 100%; padding: 12px; background: #00262b; color: #ffffff; border: none; border-radius: 9999px; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.15s; }
          .auth-btn:hover:not(:disabled) { background: #0b363b; }
          .auth-btn:disabled { opacity: 0.5; cursor: not-allowed; }
          .switch-link { color: #437278; cursor: pointer; text-decoration: underline; font-size: 13px; }
          .switch-link:hover { color: #00262b; }
        `}</style>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <div style={{ width: '28px', height: '28px', background: '#00262b', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#abffae', fontSize: '12px', fontWeight: 700 }}>
                                PMS
                            </div>
                            <span style={{ fontWeight: 700, color: '#0b363b', fontSize: '16px' }}>Hotel Manager</span>
                        </div>
                        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#00262b', margin: 0 }}>Crear cuenta</h2>
                        <p style={{ fontSize: '13px', color: '#4f6466', marginTop: '4px' }}>Regístrate para hacer tus reservas</p>
                    </div>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#a1c2c6', fontSize: '20px', lineHeight: 1, padding: '4px' }}>✕</button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#00262b', marginBottom: '6px' }}>
                            Nombre completo
                        </label>
                        <input className="auth-input" type="text" name="nombre" placeholder="Juan Pérez" value={form.nombre} onChange={handleChange} required />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#00262b', marginBottom: '6px' }}>
                            Correo electrónico
                        </label>
                        <input className="auth-input" type="email" name="email" placeholder="juan@email.com" value={form.email} onChange={handleChange} required />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#00262b', marginBottom: '6px' }}>
                            Teléfono <span style={{ color: '#a1c2c6', fontWeight: 400 }}>(opcional)</span>
                        </label>
                        <input className="auth-input" type="tel" name="telefono" placeholder="0991234567" value={form.telefono} onChange={handleChange} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#00262b', marginBottom: '6px' }}>
                                Contraseña
                            </label>
                            <input className="auth-input" type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#00262b', marginBottom: '6px' }}>
                                Confirmar
                            </label>
                            <input className="auth-input" type="password" name="confirmar" placeholder="••••••••" value={form.confirmar} onChange={handleChange} required />
                        </div>
                    </div>

                    {error && (
                        <div style={{ background: '#feefe8', border: '1px solid #8b3911', borderRadius: '6px', padding: '10px 14px', fontSize: '13px', color: '#8b3911' }}>
                            {error}
                        </div>
                    )}

                    <button className="auth-btn" type="submit" disabled={isLoading} style={{ marginTop: '4px' }}>
                        {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
                    </button>

                    <p style={{ textAlign: 'center', margin: 0, color: '#4f6466', fontSize: '13px' }}>
                        ¿Ya tienes cuenta?{' '}
                        <span className="switch-link" onClick={onSwitchToLogin}>Inicia sesión</span>
                    </p>
                </form>
            </div>
        </div>
    );
}