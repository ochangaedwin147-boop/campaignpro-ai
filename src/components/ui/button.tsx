import * as React from "react";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
  }
>(({ className = '', variant = 'default', size = 'default', ...props }, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50';
  const variants = {
    default: 'bg-slate-900 text-white hover:bg-slate-800',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
    outline: 'border border-slate-600 bg-transparent hover:bg-slate-800',
    secondary: 'bg-slate-700 text-white hover:bg-slate-600',
    ghost: 'hover:bg-slate-800',
    link: 'text-slate-300 underline-offset-4 hover:underline',
  };
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3',
    lg: 'h-11 px-8',
    icon: 'h-10 w-10',
  };
  return <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button };
