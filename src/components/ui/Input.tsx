import React from 'react';
import { cn } from './Button'; // Reusando la utilidad

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'flex h-32 w-full rounded-sm border border-black/10 bg-surface-white px-8 py-4 text-caption file:border-0 file:bg-transparent file:text-caption file:font-medium placeholder:text-stone-whisper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spring-leaf focus-visible:border-oceanic-deep disabled:cursor-not-allowed disabled:opacity-50 text-midnight-ink',
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
