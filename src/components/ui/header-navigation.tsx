import * as React from "react";

export type Props = React.HTMLAttributes<HTMLDivElement>;

// Header navigation container
export const HeaderNavigation = (
  { className = "", ref, ...props }: Props & { ref?: React.Ref<HTMLDivElement> }
) => (
  <div
    ref={ref}
    className={`w-full flex items-center gap-4 px-4 py-2 border-b border-foreground/10 bg-background ${className}`}
    {...props}
  />
);
HeaderNavigation.displayName = "HeaderNavigation";

// Left-aligned area inside the header
export const HeaderNavigationLeft = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex items-center gap-2 ${className}`} {...props} />
);
HeaderNavigationLeft.displayName = "HeaderNavigationLeft";

// Right-aligned area inside the header
export const HeaderNavigationRight = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`ml-auto flex items-center gap-2 ${className}`} {...props} />
);
HeaderNavigationRight.displayName = "HeaderNavigationRight";

export default HeaderNavigation;

