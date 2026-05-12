// src/components/home/FeaturesSection.tsx
import { Card } from '../ui/Card';
import { Bot, BedDouble, CalendarCheck, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <Bot className="w-24 h-24 text-deep-teal" />,
    badge: 'IA',
    title: 'Chatbot con IA',
    description: 'Nuestro asistente virtual responde preguntas, consulta disponibilidad y crea reservas en tiempo real usando inteligencia artificial.',
  },
  {
    icon: <BedDouble className="w-24 h-24 text-deep-teal" />,
    badge: 'Gestión',
    title: 'Control de Habitaciones',
    description: 'Visualiza el estado de cada habitación en tiempo real. Cambia entre disponible, ocupada, limpieza o mantenimiento con un clic.',
  },
  {
    icon: <CalendarCheck className="w-24 h-24 text-deep-teal" />,
    badge: 'Reservas',
    title: 'Reservas en Tiempo Real',
    description: 'Los clientes pueden reservar desde el chatbot o la web. El admin gestiona todo el ciclo: pendiente → confirmada → activa → completada.',
  },
  {
    icon: <ShieldCheck className="w-24 h-24 text-deep-teal" />,
    badge: 'Seguridad',
    title: 'Roles y Autenticación',
    description: 'Sistema de autenticación con JWT. Clientes acceden a sus reservas, administradores gestionan el hotel completo.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="w-full bg-fog-gray py-96 border-y border-black/5">
      <div className="max-w-[1200px] mx-auto px-16">
        <div className="text-center mb-64 max-w-[700px] mx-auto">
          <div className="inline-flex items-center gap-8 bg-surface-white text-deep-teal px-16 py-8 rounded-full text-caption font-medium mb-24 border border-black/5">
            Arquitectura en Capas
          </div>
          <h2 className="text-heading font-bold text-midnight-ink tracking-heading mb-16">
            Todo lo que necesitas, en un solo lugar
          </h2>
          <p className="text-body text-slate-grille tracking-body">
            HotelBot implementa una arquitectura en capas con presentación, controladores, servicios y acceso a datos claramente separados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col gap-16 transition-shadow hover:shadow-subtle-2">
              <div className="flex items-center gap-12">
                <div className="w-48 h-48 rounded bg-sky-mist flex items-center justify-center flex-shrink-0">
                  {feature.icon}
                </div>
                <span style={{
                  background: '#e0f4ff',
                  color: '#0a3890',
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  letterSpacing: '0.05em',
                }}>
                  {feature.badge}
                </span>
              </div>
              <h3 className="text-heading-sm font-semibold text-midnight-ink">
                {feature.title}
              </h3>
              <p className="text-body text-slate-grille">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
