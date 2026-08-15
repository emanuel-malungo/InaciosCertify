import React, { forwardRef } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "white";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  target?: string;
  rel?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary hover:bg-primary-hover text-white shadow-premium active:scale-95 focus-visible:ring-primary",
  secondary:
    "bg-surface-warm hover:bg-border text-foreground active:scale-95 focus-visible:ring-text-muted",
  outline:
    "border border-border hover:border-primary text-text hover:text-primary bg-transparent active:scale-95 focus-visible:ring-primary",
  ghost:
    "bg-transparent hover:bg-foreground/5 text-text hover:text-primary active:scale-95 focus-visible:ring-primary",
  white:
    "bg-white hover:bg-surface-warm text-primary shadow-premium active:scale-95 focus-visible:ring-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-6 py-3 text-xs sm:text-sm",
  lg: "px-8 py-4 text-sm sm:text-base",
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      href,
      target,
      rel,
      fullWidth = false,
      leftIcon,
      rightIcon,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-heading font-bold uppercase tracking-wider rounded-button transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
      fullWidth ? "w-full" : ""
    } ${className}`.trim();

    if (href) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          className={combinedClasses}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        type={type}
        className={combinedClasses}
        {...props}
      >
        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
