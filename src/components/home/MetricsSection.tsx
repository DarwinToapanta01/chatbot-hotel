// src/components/home/MetricsSection.tsx

const metrics = [
  { value: '13', label: 'Habitaciones', sub: 'gestionadas en tiempo real' },
  { value: '4', label: 'Capas', sub: 'de arquitectura de software' },
  { value: '24/7', label: 'Disponibilidad', sub: 'del asistente virtual IA' },
  { value: '100%', label: 'Gratuito', sub: 'sin costo de infraestructura' },
];

export function MetricsSection() {
  return (
    <section className="w-full py-96 bg-surface-white">
      <div className="max-w-[1200px] mx-auto px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-32">
          {metrics.map((metric, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-8">
              <div className="text-heading-lg font-bold text-electric-blue tracking-heading-lg">
                {metric.value}
              </div>
              <div className="text-body font-semibold text-midnight-ink uppercase tracking-widest text-xs">
                {metric.label}
              </div>
              <div className="text-caption text-slate-grille">
                {metric.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
