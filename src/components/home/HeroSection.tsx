import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-16 pt-[120px] pb-96 flex flex-col items-center text-center">
      <div className="inline-flex items-center gap-8 bg-sky-mist text-deep-teal px-16 py-8 rounded-full text-caption font-medium mb-32 border border-black/5">
        <span className="w-8 h-8 rounded-full bg-electric-blue animate-pulse"></span>
        Nueva actualización de tarifas disponible
      </div>
      
      <h1 className="text-display font-bold text-midnight-ink max-w-[900px] leading-display tracking-display mb-24">
        Gestión hotelera <span className="text-electric-blue">inteligente</span> para equipos modernos.
      </h1>
      
      <p className="text-subheading text-slate-grille max-w-[700px] leading-subheading tracking-subheading mb-48">
        Centraliza reservas, optimiza tarifas y mejora la experiencia de tus huéspedes con una plataforma limpia, rápida y basada en datos.
      </p>
      
      <div className="flex items-center gap-16">
        <Button variant="primary" className="h-[48px] px-[32px] text-body">
          Comenzar prueba gratis
        </Button>
        <Button variant="outline" className="h-[48px] px-[32px] text-body flex items-center gap-8">
          Ver demostración <ArrowRight className="w-16 h-16" />
        </Button>
      </div>

      <div className="mt-96 w-full max-w-[1000px] aspect-[16/9] bg-fog-gray rounded-md border border-black/5 flex items-center justify-center overflow-hidden shadow-subtle">
         {/* Placeholder de imagen de producto */}
         <div className="text-stone-whisper text-body flex flex-col items-center gap-16">
           <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
           [Interfaz del Dashboard]
         </div>
      </div>
    </section>
  );
}
