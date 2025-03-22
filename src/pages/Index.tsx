
import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Container } from "@/components/ui/container";
import ZettleThread from "@/components/zettle/ZettleThread";
import ZettleGraph from "@/components/zettle/ZettleGraph";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZettleCardProps } from "@/components/zettle/ZettleCard";
import { Home, TrendingUp, Zap, Users, Clock } from "lucide-react";

// Sample data for our app
const sampleZettles: ZettleCardProps[] = [
  {
    id: "z1",
    author: {
      name: "Alan Turing",
      username: "aturing",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3"
    },
    content: "Every thought is a connection to another. #zettelkasten #knowledge",
    timestamp: "2h ago",
    tags: ["knowledge", "thinking"],
    connections: 24,
    likes: 156,
    comments: 12
  },
  {
    id: "z2",
    author: {
      name: "Ada Lovelace",
      username: "adalove",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=2522&ixlib=rb-4.0.3"
    },
    content: "Ideas need to be connected to be useful. @aturing what do you think about creating links between separate thoughts? #connections",
    timestamp: "4h ago",
    tags: ["ideas", "connections"],
    connections: 18,
    likes: 94,
    comments: 8,
    isConnected: true
  },
  {
    id: "z3",
    author: {
      name: "Nikola Tesla",
      username: "ntesla",
      avatar: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?auto=format&fit=crop&q=80&w=2576&ixlib=rb-4.0.3"
    },
    content: "The mind is not a vessel to be filled, but a fire to be kindled. #learning #creativity",
    timestamp: "8h ago",
    tags: ["learning", "creativity"],
    connections: 32,
    likes: 211,
    comments: 15
  },
  {
    id: "z4",
    author: {
      name: "Marie Curie",
      username: "mcurie",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3"
    },
    content: "In science, we must be interested in things, not in persons. #science #objectivity",
    timestamp: "12h ago",
    tags: ["science", "research"],
    connections: 15,
    likes: 87,
    comments: 6
  }
];

// Sample graph data
const sampleGraphData = {
  nodes: [
    { id: "z1", label: "Zettelkasten", color: "#0070F3" },
    { id: "z2", label: "Connections", color: "#0070F3" },
    { id: "z3", label: "Creativity", color: "#0070F3" },
    { id: "z4", label: "Science", color: "#0070F3" },
    { id: "z5", label: "Learning", color: "#6B7280" },
    { id: "z6", label: "Teaching", color: "#6B7280" },
    { id: "z7", label: "Writing", color: "#6B7280" },
    { id: "z8", label: "Reading", color: "#6B7280" }
  ],
  edges: [
    { source: "z1", target: "z2" },
    { source: "z1", target: "z3" },
    { source: "z2", target: "z3" },
    { source: "z2", target: "z4" },
    { source: "z3", target: "z4" },
    { source: "z4", target: "z5" },
    { source: "z5", target: "z6" },
    { source: "z6", target: "z7" },
    { source: "z7", target: "z8" },
    { source: "z8", target: "z1" }
  ]
};

const Index = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [graphSize, setGraphSize] = useState({ width: 500, height: 300 });
  const graphRef = React.useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsPageLoaded(true);
    
    // Update graph size based on container dimensions
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
    <div className={`min-h-screen flex flex-col ${isPageLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <Header />
      
      <main className="flex-grow pt-24 pb-8">
        <Container>
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left sidebar */}
              <div className="hidden md:block">
                <Card className="p-4 space-y-4 sticky top-24">
                  <h2 className="text-lg font-medium">Navigation</h2>
                  
                  <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start gap-2" size="sm">
                      <Home className="h-4 w-4" />
                      <span>Home</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2" size="sm">
                      <TrendingUp className="h-4 w-4" />
                      <span>Trending</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2" size="sm">
                      <Zap className="h-4 w-4" />
                      <span>For You</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2" size="sm">
                      <Users className="h-4 w-4" />
                      <span>Following</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2" size="sm">
                      <Clock className="h-4 w-4" />
                      <span>Recent</span>
                    </Button>
                  </div>
                  
                  <div className="pt-4 border-t border-muted">
                    <h3 className="text-sm font-medium mb-2">Popular Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {['zettelkasten', 'knowledge', 'thinking', 'learning', 'connections', 'ideas'].map((tag) => (
                        <Button key={tag} variant="outline" size="sm" className="rounded-full text-xs h-7">
                          #{tag}
                        </Button>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Main content */}
              <div className="md:col-span-2">
                <div className="space-y-6">
                  <h1 className="text-3xl font-medium animate-slide-down">Your Thought Stream</h1>
                  
                  <Tabs defaultValue="feed" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="feed">Feed</TabsTrigger>
                      <TabsTrigger value="network">Network</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="feed" className="focus-visible:outline-none focus-visible:ring-0 animate-fade-in">
                      <ZettleThread zettles={sampleZettles} />
                    </TabsContent>
                    
                    <TabsContent value="network" className="focus-visible:outline-none focus-visible:ring-0 animate-fade-in">
                      <div ref={graphRef}>
                        <ZettleGraph
                          data={sampleGraphData}
                          width={graphSize.width}
                          height={graphSize.height}
                          className="mb-6"
                        />
                      </div>
                      
                      <p className="text-sm text-muted-foreground mt-2">
                        Visual representation of your connected thoughts. Click on any node to explore.
                      </p>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
