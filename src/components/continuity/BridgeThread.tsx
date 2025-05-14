
import React from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/utils/animation";
import BridgeNote from "./BridgeNote";
import { ContinuityBridge } from "@/types/ContinuityBridge";

interface BridgeThreadProps {
  bridges: ContinuityBridge[];
  className?: string;
}

const BridgeThread = ({ bridges, className }: BridgeThreadProps) => {
  const items = [...bridges]; // Clone to avoid mutating props

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((bridge, index) => {
        // Custom hook for scroll animations
        const [ref, isInView] = useInView({
          threshold: 0.1,
          rootMargin: '0px 0px 100px 0px',
        });
        
        return (
          <div
            key={bridge.bridge_id}
            // @ts-ignore - ref typing issue
            ref={ref}
            className={cn(
              "transition-all duration-500",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{ 
              transitionDelay: isInView ? `${index * 50}ms` : '0ms'
            }}
          >
            <BridgeNote bridge={bridge} />
            
            {/* Connection line between notes */}
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

export default BridgeThread;
