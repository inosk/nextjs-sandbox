import * as React from "react";

export type Props = React.HTMLAttributes<HTMLDivElement>;

export const Card = React.forwardRef<HTMLDivElement, Props>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`rounded-card border border-foreground/10 bg-background shadow-card ${className}`}
      {...props}
    />
  )
);
Card.displayName = "Card";

export const CardHeader = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-4 md:p-6 border-b border-foreground/10 ${className}`} {...props} />
);

export const Content = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-4 md:p-6 ${className}`} {...props} />
);

export const CardFooter = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-4 md:p-6 border-t border-foreground/10 ${className}`} {...props} />
);

export default Card;
