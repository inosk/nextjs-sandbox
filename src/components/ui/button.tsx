import * as React from "react";

type Variant = "primary" | "accent" | "outline";
type Size = "sm" | "md" | "lg";

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-button transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none";

const styles: Record<Variant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary/90",
  accent: "bg-accent text-on-accent hover:bg-accent/90",
  outline:
    "border border-primary text-primary bg-transparent hover:bg-primary/10",
};

const sizes: Record<Size, string> = {
  sm: "text-caption px-3 py-1.5",
  md: "text-body px-4 py-2",
  lg: "text-title px-5 py-2.5",
};

function Spinner({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      viewBox="0 0 24 24"
      width={16}
      height={16}
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
      />
    </svg>
  );
}

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  (
    { variant = "primary", size = "md", loading = false, className = "", children, ...props },
    ref
  ) => {
    const variantClasses = styles[variant];
    const sizeClasses = sizes[size];
    return (
      <button
        ref={ref}
        className={`${base} ${variantClasses} ${sizeClasses} ${className}`}
        disabled={loading || props.disabled}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && <Spinner />}
        <span className={loading ? "opacity-80" : undefined}>{children}</span>
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
