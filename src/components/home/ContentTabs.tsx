
import React, { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ZettleThread from "@/components/zettle/ZettleThread";
import ZettleGraph from "@/components/zettle/ZettleGraph";
import BridgeThread from "@/components/continuity/BridgeThread";
import { ZettleCardProps } from "@/components/zettle/ZettleCard";
import { ContinuityBridge } from "@/types/ContinuityBridge";

interface ContentTabsProps {
  zettles: ZettleCardProps[];
  graphData: any;
  bridges: ContinuityBridge[];
}

const ContentTabs = ({ zettles, graphData, bridges }: ContentTabsProps) => {
  const [graphSize, setGraphSize] = useState({ width: 500, height: 300 });
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateGraphSize = () => {
      if (graphRef.current) {
        setGraphSize({
          width: graphRef.current.offsetWidth,
          height: 300
        });
      }
    };
    
    updateGraphSize();
    window.addEventListener('resize', updateGraphSize);
    
    return () => {
      window.removeEventListener('resize', updateGraphSize);
    };
  }, []);

  return (
    <Tabs defaultValue="feed" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="feed">Feed</TabsTrigger>
        <TabsTrigger value="network">Network</TabsTrigger>
        <TabsTrigger value="bridges">Bridges</TabsTrigger>
      </TabsList>
      
      <TabsContent value="feed" className="focus-visible:outline-none focus-visible:ring-0 animate-fade-in">
        <ZettleThread zettles={zettles} />
      </TabsContent>
      
      <TabsContent value="network" className="focus-visible:outline-none focus-visible:ring-0 animate-fade-in">
        <div ref={graphRef}>
          <ZettleGraph
            data={graphData}
            width={graphSize.width}
            height={graphSize.height}
            className="mb-6"
          />
        </div>
        
        <p className="text-sm text-muted-foreground mt-2">
          Visual representation of your connected thoughts. Click on any node to explore.
        </p>
      </TabsContent>
      
      <TabsContent value="bridges" className="focus-visible:outline-none focus-visible:ring-0 animate-fade-in">
        <BridgeThread bridges={bridges} />
        
        <p className="text-sm text-muted-foreground mt-4">
          Continuity bridges help connect your thoughts across different contexts and time periods.
        </p>
      </TabsContent>
    </Tabs>
  );
};

export default ContentTabs;
