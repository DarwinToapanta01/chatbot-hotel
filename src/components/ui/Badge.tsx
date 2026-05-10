import React from 'react';
import { cn } from './Button';

export type BadgeVariant = 'success' | 'danger' | 'warning' | 'default';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    
    const variants = {
      success: 'bg-pale-mint text-deep-teal border-deep-teal/20', // Disponible (verde)
      danger: 'bg-warm-mist text-amber-pop border-amber-pop/20', // Ocupado (rojo/naranja)
      warning: 'bg-[#fff5e6] text-[#b35900] border-[#b35900]/20', // Limpieza (amarillo/naranja custom)
      default: 'bg-canvas text-slate-grille border-black/10', // Fuera de Servicio
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-sm border px-8 py-2 text-[11px] font-semibold transition-colors uppercase tracking-wider',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';
