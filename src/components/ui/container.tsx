
import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const Container = ({
  children,
  className,
  as: Component = "div",
  size = "lg",
  ...props
}: ContainerProps) => {
  const sizeClasses = {
    sm: "max-w-3xl",
    md: "max-w-4xl",
    lg: "max-w-5xl",
    xl: "max-w-6xl",
    full: "max-w-full",
  };

  return (
    <Component
      className={cn(
        "w-full px-4 mx-auto",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export { Container };
