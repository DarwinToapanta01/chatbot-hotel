export function Footer() {
  return (
    <footer className="bg-surface-white border-t border-black/5 mt-96 py-64">
      <div className="max-w-[1200px] mx-auto px-16 grid grid-cols-1 md:grid-cols-4 gap-32">
        <div className="flex flex-col gap-16">
          <div className="font-semibold text-oceanic-deep text-subheading">Hotel Manager PMS</div>
          <p className="text-slate-grille text-body-sm">
            La solución definitiva para la gestión de propiedades hoteleras. Interfaz basada en datos y flujos de trabajo eficientes.
          </p>
        </div>
        
        <div className="flex flex-col gap-16">
          <h4 className="font-semibold text-midnight-ink text-body">Producto</h4>
          <a href="#" className="text-slate-grille hover:text-oceanic-deep text-body-sm transition-colors">Gestión de Reservas</a>
          <a href="#" className="text-slate-grille hover:text-oceanic-deep text-body-sm transition-colors">Motor de Precios</a>
          <a href="#" className="text-slate-grille hover:text-oceanic-deep text-body-sm transition-colors">Recepción</a>
        </div>

        <div className="flex flex-col gap-16">
          <h4 className="font-semibold text-midnight-ink text-body">Compañía</h4>
          <a href="#" className="text-slate-grille hover:text-oceanic-deep text-body-sm transition-colors">Sobre nosotros</a>
          <a href="#" className="text-slate-grille hover:text-oceanic-deep text-body-sm transition-colors">Carreras</a>
          <a href="#" className="text-slate-grille hover:text-oceanic-deep text-body-sm transition-colors">Contacto</a>
        </div>

        <div className="flex flex-col gap-16">
          <h4 className="font-semibold text-midnight-ink text-body">Legal</h4>
          <a href="#" className="text-slate-grille hover:text-oceanic-deep text-body-sm transition-colors">Términos de servicio</a>
          <a href="#" className="text-slate-grille hover:text-oceanic-deep text-body-sm transition-colors">Privacidad</a>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-16 mt-64 pt-32 border-t border-black/5 text-center text-stone-whisper text-caption">
        © {new Date().getFullYear()} PMS Hotel Manager. Todos los derechos reservados.
      </div>
    </footer>
  );
}
