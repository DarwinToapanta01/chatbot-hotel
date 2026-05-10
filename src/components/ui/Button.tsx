import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utilidad para fusionar clases de Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ButtonVariant = 'primary' | 'outline' | 'ghost';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    
    // Variantes de acuerdo al DESIGN.md
    const variants = {
      primary: 'bg-midnight-ink text-surface-white px-[20px] py-[8px] rounded-buttons',
      outline: 'bg-surface-white text-oceanic-deep px-[20px] py-[8px] border border-spring-leaf rounded-buttons',
      ghost: 'bg-transparent text-oceanic-deep px-[8px] py-[0px] rounded-buttons hover:bg-black/5', // añadido hover para UX
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-saansfont font-semibold text-body transition-colors outline-none focus-visible:shadow-[var(--shadow-subtle)] disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
