
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Node {
  id: string;
  label: string;
  x?: number;
  y?: number;
  radius?: number;
  color?: string;
}

interface Edge {
  source: string;
  target: string;
  value?: number;
}

interface GraphData {
  nodes: Node[];
  edges: Edge[];
}

interface ZettleGraphProps {
  data: GraphData;
  width?: number;
  height?: number;
  className?: string;
}

const ZettleGraph = ({
  data,
  width = 500,
  height = 300,
  className,
}: ZettleGraphProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const [scale, setScale] = useState(1);
  
  // Set up the simulation with initial positions
  useEffect(() => {
    if (!canvasRef.current || !data.nodes.length) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear the canvas
    ctx.clearRect(0, 0, width, height);
    
    // Position nodes if they don't have coordinates
    data.nodes.forEach(node => {
      if (!node.x || !node.y) {
        node.x = Math.random() * (width - 100) + 50;
        node.y = Math.random() * (height - 100) + 50;
      }
      
      node.radius = 20 * scale;
      node.color = node.color || '#0070F3';
    });
    
    // Draw edges
    ctx.beginPath();
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1 * scale;
    
    data.edges.forEach(edge => {
      const source = data.nodes.find(n => n.id === edge.source);
      const target = data.nodes.find(n => n.id === edge.target);
      
      if (source && target && source.x && source.y && target.x && target.y) {
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
      }
    });
    
    ctx.stroke();
    
    // Draw nodes
    data.nodes.forEach(node => {
      if (!node.x || !node.y) return;
      
      ctx.beginPath();
      ctx.fillStyle = node.color || '#0070F3';
      ctx.arc(node.x, node.y, node.radius || 20, 0, 2 * Math.PI);
      ctx.fill();
      
      // Node border
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2 * scale;
      ctx.stroke();
      
      // Node label
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `${12 * scale}px SF Pro Display, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.label, node.x, node.y);
    });
    
    // Add click event listener
    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Check if a node was clicked
      const clickedNode = data.nodes.find(node => {
        if (!node.x || !node.y || !node.radius) return false;
        const dx = node.x - x;
        const dy = node.y - y;
        return Math.sqrt(dx * dx + dy * dy) <= node.radius;
      });
      
      if (clickedNode) {
        navigate(`/zettle/${clickedNode.id}`);
      }
    };
    
    canvas.addEventListener('click', handleClick);
    
    return () => {
      canvas.removeEventListener('click', handleClick);
    };
  }, [data, width, height, navigate, scale]);
  
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 2));
  };
  
  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };
  
  const handleReset = () => {
    setScale(1);
  };
  
  return (
    <Card className={cn("p-4 relative overflow-hidden", className)}>
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={handleZoomIn}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={handleZoomOut}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={handleReset}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
      
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full h-full"
      />
      
      <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
        {data.nodes.length} zettles, {data.edges.length} connections
      </div>
    </Card>
  );
};

export default ZettleGraph;
