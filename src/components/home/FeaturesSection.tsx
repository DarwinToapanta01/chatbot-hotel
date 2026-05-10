import { Card } from '../ui/Card';
import { Calendar, CreditCard, Users, Settings } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: <Calendar className="w-24 h-24 text-deep-teal" />,
      title: 'Gestión de Reservas',
      description: 'Visualiza y administra todas tus reservas en un calendario interactivo y fácil de usar.'
    },
    {
      icon: <CreditCard className="w-24 h-24 text-deep-teal" />,
      title: 'Motor de Tarifas',
      description: 'Ajusta precios dinámicamente basados en la demanda, estacionalidad y ocupación actual.'
    },
    {
      icon: <Users className="w-24 h-24 text-deep-teal" />,
      title: 'Recepción Integrada',
      description: 'Agiliza los procesos de check-in y check-out con un flujo de trabajo optimizado.'
    },
    {
      icon: <Settings className="w-24 h-24 text-deep-teal" />,
      title: 'Configuración de Módulos',
      description: 'Personaliza los servicios y características del hotel según tus necesidades operativas.'
    }
  ];

  return (
    <section id="features" className="w-full bg-fog-gray py-96 border-y border-black/5">
      <div className="max-w-[1200px] mx-auto px-16">
        <div className="text-center mb-64 max-w-[700px] mx-auto">
          <h2 className="text-heading font-bold text-midnight-ink tracking-heading mb-16">
            Todo lo que necesitas, en un solo lugar
          </h2>
          <p className="text-body text-slate-grille tracking-body">
            Nuestra arquitectura modular está diseñada para ofrecer rendimiento y claridad, permitiéndote enfocarte en lo importante: tus huéspedes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col gap-16 transition-shadow hover:shadow-subtle-2">
              <div className="w-48 h-48 rounded bg-sky-mist flex items-center justify-center">
                {feature.icon}
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
