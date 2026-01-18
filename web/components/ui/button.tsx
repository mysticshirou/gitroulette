import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'accent' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-accent-blue text-white hover:bg-[#0077ED] active:bg-[#006EDB]': variant === 'default',
            'hover:bg-gray-light text-foreground border border-border': variant === 'ghost',
            'bg-accent-orange text-white hover:bg-[#FF7D4F] active:bg-[#FF5D2B]':
              variant === 'accent',
            'bg-gray-light text-foreground hover:bg-[#E8E8ED] active:bg-[#D2D2D7] border border-border':
              variant === 'secondary',
          },
          {
            'h-11 px-5 py-2.5 text-[17px]': size === 'default',
            'h-9 px-4 text-[15px]': size === 'sm',
            'h-14 px-8 text-[21px] font-semibold': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
