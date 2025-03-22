
import React from "react";
import ZettleCard, { ZettleCardProps } from "./ZettleCard";
import { cn } from "@/lib/utils";
import { useInView } from "@/utils/animation";

interface ZettleThreadProps {
  zettles: ZettleCardProps[];
  className?: string;
}

const ZettleThread = ({ zettles, className }: ZettleThreadProps) => {
  const items = [...zettles]; // Clone to avoid mutating props

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((zettle, index) => {
        // Custom hook for scroll animations
        const [ref, isInView] = useInView({
          threshold: 0.1,
          rootMargin: '0px 0px 100px 0px',
        });
        
        return (
          <div
            key={zettle.id}
            // @ts-ignore - ref typing issue
            ref={ref}
            className={cn(
              "transition-all duration-500",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              // Create a staggered animation effect
              isInView && `transition-delay-${index * 50}`
            )}
            style={{ 
              transitionDelay: isInView ? `${index * 50}ms` : '0ms'
            }}
          >
            <ZettleCard {...zettle} />
            
            {/* Connection line between zettles */}
            {index < items.length - 1 && (
              <div className="flex justify-center my-1">
                <div className="h-4 border-l border-dashed border-muted"></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ZettleThread;
