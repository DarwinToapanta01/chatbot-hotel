// src/pages/ConfiguracionUsuario.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/ui/Button';

// URL base de la API
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export function ConfiguracionUsuario() {
    const { usuario, token, updateUser } = useAuth();

    // Estados del formulario
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [passwordActual, setPasswordActual] = useState('');
    const [nuevaPassword, setNuevaPassword] = useState('');

    // Estados de UI
    const [isSaving, setIsSaving] = useState(false);
    const [mensaje, setMensaje] = useState<{ texto: string; tipo: 'exito' | 'error' } | null>(null);

    useEffect(() => {
        if (usuario) {
            setNombre(usuario.nombre || '');
            setEmail(usuario.email || '');
            // Si el backend devuelve teléfono en el usuario, se setea aquí.
            setTelefono(usuario.telefono || '');
        }
    }, [usuario]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMensaje(null);
        setIsSaving(true);

        try {
            const response = await fetch(`${API_URL}/api/auth/perfil`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ nombre, telefono, passwordActual, nuevaPassword })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al actualizar el perfil');
            }

            const data = await response.json();

            // Actualizar contexto
            if (updateUser) updateUser(data.usuario);

            setMensaje({ texto: 'Perfil actualizado correctamente.', tipo: 'exito' });
            setPasswordActual('');
            setNuevaPassword('');
        } catch (error: any) {
            setMensaje({ texto: error.message || 'Error al actualizar el perfil.', tipo: 'error' });
        } finally {
            setIsSaving(false);
        }
    };

    if (!usuario) return null;

    return (
        <MainLayout>
            <div className="max-w-[800px] mx-auto px-16 py-48">

                {/* Header */}
                <div className="mb-32">
                    <h1 className="text-heading font-bold text-midnight-ink tracking-heading">
                        Mi Perfil
                    </h1>
                    <p className="text-body text-slate-grille mt-8">
                        Gestiona tu información personal y opciones de seguridad.
                    </p>
                </div>

                <div className="bg-surface-white border border-black/10 rounded-sm shadow-subtle overflow-hidden">

                    <div className="p-32 border-b border-black/5 bg-slate-50/50 flex items-center justify-between">
                        <div className="flex items-center gap-16">
                            <div className="w-48 h-48 bg-oceanic-deep text-white rounded-full flex items-center justify-center text-heading-sm font-bold">
                                {usuario.nombre.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-heading-sm font-bold text-midnight-ink">{usuario.nombre}</h2>
                                <p className="text-body-sm text-slate-grille">
                                    Rol: <span className="font-semibold text-oceanic-deep">{usuario.rol}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-32 flex flex-col gap-24">

                        {mensaje && (
                            <div className={`p-16 rounded-sm text-body-sm border ${mensaje.tipo === 'exito' ? 'bg-[#eafde8] text-[#437278] border-[#abffae]/50' : 'bg-[#feefe8] text-[#8b3911] border-[#8b3911]/20'}`}>
                                {mensaje.texto}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                            {/* Información Personal */}
                            <div className="flex flex-col gap-16">
                                <h3 className="text-body font-bold text-midnight-ink border-b border-black/5 pb-8 mb-8">
                                    Información Personal
                                </h3>

                                <div>
                                    <label className="block text-caption font-semibold text-slate-grille uppercase tracking-wider mb-8">
                                        Nombre Completo
                                    </label>
                                    <input
                                        type="text"
                                        value={nombre}
                                        onChange={e => setNombre(e.target.value)}
                                        className="w-full p-8 border border-black/10 rounded-sm text-body-sm outline-none focus:border-oceanic-deep transition-colors"
                                        placeholder="Tu nombre"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-caption font-semibold text-slate-grille uppercase tracking-wider mb-8">
                                        Correo Electrónico
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        disabled
                                        className="w-full p-8 border border-black/10 rounded-sm text-body-sm bg-black/5 text-slate-grille cursor-not-allowed"
                                        title="El correo no se puede cambiar"
                                    />
                                </div>

                                <div>
                                    <label className="block text-caption font-semibold text-slate-grille uppercase tracking-wider mb-8">
                                        Teléfono
                                    </label>
                                    <input
                                        type="tel"
                                        value={telefono}
                                        onChange={e => setTelefono(e.target.value)}
                                        className="w-full p-8 border border-black/10 rounded-sm text-body-sm outline-none focus:border-oceanic-deep transition-colors"
                                        placeholder="Ej: 0991234567"
                                    />
                                </div>
                            </div>

                            {/* Seguridad */}
                            <div className="flex flex-col gap-16">
                                <h3 className="text-body font-bold text-midnight-ink border-b border-black/5 pb-8 mb-8">
                                    Seguridad
                                </h3>

                                <div>
                                    <label className="block text-caption font-semibold text-slate-grille uppercase tracking-wider mb-8">
                                        Contraseña Actual
                                    </label>
                                    <input
                                        type="password"
                                        value={passwordActual}
                                        onChange={e => setPasswordActual(e.target.value)}
                                        className="w-full p-8 border border-black/10 rounded-sm text-body-sm outline-none focus:border-oceanic-deep transition-colors"
                                        placeholder="••••••••"
                                    />
                                    <p className="text-[11px] text-slate-grille mt-4">
                                        Requerida si deseas cambiar tu contraseña.
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-caption font-semibold text-slate-grille uppercase tracking-wider mb-8">
                                        Nueva Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        value={nuevaPassword}
                                        onChange={e => setNuevaPassword(e.target.value)}
                                        className="w-full p-8 border border-black/10 rounded-sm text-body-sm outline-none focus:border-oceanic-deep transition-colors"
                                        placeholder="Mínimo 6 caracteres"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-24 border-t border-black/5 flex justify-end">
                            <Button type="submit" variant="primary" disabled={isSaving}>
                                {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                            </Button>
                        </div>
                    </form>
                </div>

            </div>
        </MainLayout>
    );
}
