// src/components/home/HeroSection.tsx
import { useState } from 'react';
import { Button } from '../ui/Button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { LoginModal } from '../auth/LoginModal';
import { RegisterModal } from '../auth/RegisterModal';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export function HeroSection() {
  const { usuario, isAdmin } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <section className="w-full max-w-[1200px] mx-auto px-16 pt-[120px] pb-96 flex flex-col items-center text-center">

        <div className="inline-flex items-center gap-8 bg-sky-mist text-deep-teal px-16 py-8 rounded-full text-caption font-medium mb-32 border border-black/5">
          <span className="w-8 h-8 rounded-full bg-electric-blue animate-pulse"></span>
          Chatbot con IA integrado — Reserva en segundos
        </div>

        <h1 className="text-display font-bold text-midnight-ink max-w-[900px] leading-display tracking-display mb-24">
          Tu hotel, gestionado por{' '}
          <span className="text-electric-blue">inteligencia artificial</span>.
        </h1>

        <p className="text-subheading text-slate-grille max-w-[700px] leading-subheading tracking-subheading mb-48">
          HotelBot centraliza reservas, gestiona habitaciones y atiende a tus huéspedes las 24 horas con un asistente virtual inteligente, todo en una sola plataforma.
        </p>

        <div className="flex items-center gap-16">
          {usuario ? (
            isAdmin ? (
              <Link to="/gestion">
                <Button variant="primary" className="h-[48px] px-[32px] text-body">
                  Ir al Panel
                </Button>
              </Link>
            ) : (
              <Link to="/mis-reservas">
                <Button variant="primary" className="h-[48px] px-[32px] text-body">
                  Mis Reservas
                </Button>
              </Link>
            )
          ) : (
            <>
              <Button variant="primary" className="h-[48px] px-[32px] text-body" onClick={() => setShowRegister(true)}>
                Crear cuenta gratis
              </Button>
              <Button variant="outline" className="h-[48px] px-[32px] text-body flex items-center gap-8" onClick={() => setShowLogin(true)}>
                Iniciar sesión <ArrowRight className="w-16 h-16" />
              </Button>
            </>
          )}
        </div>

        {/* Preview del chatbot */}
        <div className="mt-96 w-full max-w-[1000px] aspect-[16/9] bg-fog-gray rounded-md border border-black/5 overflow-hidden shadow-subtle relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div style={{
              background: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,38,43,0.12)',
              width: '360px',
              overflow: 'hidden',
              border: '1px solid rgba(0,0,0,0.06)',
            }}>
              {/* Chat header */}
              <div style={{ background: '#00262b', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#abffae', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>🏨</div>
                <div>
                  <div style={{ color: '#ffffff', fontSize: '13px', fontWeight: 600 }}>Asistente HotelBot</div>
                  <div style={{ color: '#abffae', fontSize: '11px' }}>● En línea</div>
                </div>
              </div>
              {/* Mensajes de ejemplo */}
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', background: '#fafafa' }}>
                <div style={{ alignSelf: 'flex-start', background: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '12px 12px 12px 2px', padding: '8px 12px', fontSize: '12px', color: '#00262b', maxWidth: '80%' }}>
                  ¡Hola! ¿En qué puedo ayudarte hoy? 😊
                </div>
                <div style={{ alignSelf: 'flex-end', background: '#00262b', borderRadius: '12px 12px 2px 12px', padding: '8px 12px', fontSize: '12px', color: '#ffffff', maxWidth: '80%' }}>
                  Quiero una habitación doble para 2 personas
                </div>
                <div style={{ alignSelf: 'flex-start', background: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '12px 12px 12px 2px', padding: '8px 12px', fontSize: '12px', color: '#00262b', maxWidth: '85%' }}>
                  Tenemos habitaciones dobles desde $75/noche. ¿Qué fechas tienes en mente?
                </div>
              </div>
              {/* Input del chat */}
              <div style={{ padding: '10px 16px', background: '#ffffff', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ flex: 1, background: '#fafafa', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '9999px', padding: '6px 14px', fontSize: '12px', color: '#a1c2c6' }}>
                  Escribe tu mensaje...
                </div>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#00262b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageCircle style={{ width: '14px', height: '14px', color: '#abffae' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }} />}
    </>
  );
}