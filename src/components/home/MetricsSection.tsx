export function MetricsSection() {
  const metrics = [
    { value: '+500', label: 'Hoteles Activos' },
    { value: '2.5M', label: 'Reservas Procesadas' },
    { value: '99.9%', label: 'Uptime Garantizado' },
    { value: '24/7', label: 'Soporte Técnico' }
  ];

  return (
    <section className="w-full py-96 bg-surface-white">
      <div className="max-w-[1200px] mx-auto px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-32">
          {metrics.map((metric, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-8">
              <div className="text-heading-lg font-bold text-electric-blue tracking-heading-lg">
                {metric.value}
              </div>
              <div className="text-body font-medium text-slate-grille uppercase tracking-widest text-xs">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
