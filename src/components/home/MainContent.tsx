
import React from "react";
import ContentTabs from "./ContentTabs";
import { ZettleCardProps } from "@/components/zettle/ZettleCard";
import { ContinuityBridge } from "@/types/ContinuityBridge";

interface MainContentProps {
  zettles: ZettleCardProps[];
  graphData: any;
  bridges: ContinuityBridge[];
}

const MainContent = ({ zettles, graphData, bridges }: MainContentProps) => {
  return (
    <div className="md:col-span-2">
      <div className="space-y-6">
        <h1 className="text-3xl font-medium animate-slide-down">Your Thought Stream</h1>
        <ContentTabs zettles={zettles} graphData={graphData} bridges={bridges} />
      </div>
    </div>
  );
};

export default MainContent;
