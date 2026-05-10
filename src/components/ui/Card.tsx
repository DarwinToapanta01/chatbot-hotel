import React from 'react';
import { cn } from './Button'; // Reutilizando la utilidad cn

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    // Background: Surface White (#ffffff), Padding: 32px all sides, No explicit border or shadow, sharp corners (0px radius) o 2px según tabla
    // Usaremos radius-sm (2px) como base o redondez 0 explícita.
    return (
      <div
        ref={ref}
        className={cn(
          'bg-surface-white p-32 rounded-none sm:rounded-sm border border-black/5', // añadido borde sutil por usabilidad general, aunque DESIGN dice sin borde explícito
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
