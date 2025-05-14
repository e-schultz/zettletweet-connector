import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Container } from "@/components/ui/container";
import ZettleThread from "@/components/zettle/ZettleThread";
import ZettleGraph from "@/components/zettle/ZettleGraph";
import BridgeThread from "@/components/continuity/BridgeThread";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZettleCardProps } from "@/components/zettle/ZettleCard";
import { ContinuityBridge } from "@/types/ContinuityBridge";
import { Home, TrendingUp, Zap, Users, Clock, BookText } from "lucide-react";

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

// Sample continuity bridges data
const sampleBridges: ContinuityBridge[] = [
  {
    "bridge_id": "CB-20250511-2000-7B3D",
    "metadata": {
      "active_threads": "float_continuity_implementation,jane_interview_preparation,daily_context_collection,chroma_mcp_integration",
      "conversation_id": "current_session",
      "mode": "bridge_transition",
      "ctx_markers": "brain-boot,chores,laundry,system-alignment",
      "timestamp": "2025-05-11T20:00:00Z"
    },
    "section_data": {
      "session_context": {
        "date": "2025-05-11",
        "timestamp_markers": [
          "ctx::3:25pm - brain booting",
          "ctx::4:54pm - hour into brain boot",
          "ctx::5:30pm - about to chores-comfeis",
          "ctx::7:45pm - laundry room busy, shifted back to chore mode",
          "ctx::7:55pm - refining continuity bridge protocol"
        ]
      },
      "active_threads": [
        {
          "name": "float_continuity_implementation",
          "activities": [
            "Created continuity_anchors Chroma collection",
            "Established continuity_bridge_protocol.md",
            "Refined prompt structure for system operations",
            "Received positive feedback on FLOAT-alignment"
          ]
        },
        {
          "name": "jane_interview_preparation",
          "activities": [
            "Identified hub at FLOAT.dispatch/imprint/special edition - jane application/Jane Interview Hub",
            "Referenced todo list at FLOAT.dispatch/imprint/special edition - jane application/jane - todolist",
            "Discussed preparation strategies via specialized Chroma queries",
            "Noted focus will return post-chores"
          ]
        },
        {
          "name": "daily_context_collection",
          "activities": [
            "Proposed concept for temporal \"hot cache\" in Chroma",
            "Discussed metadata enrichment with ctx markers and modes",
            "Connected to \"threshold of canon\" concept",
            "Left open for further development"
          ]
        },
        {
          "name": "chroma_mcp_integration",
          "activities": [
            "Updated obsidian_mcp_tools.md documentation for file paths",
            "Added entry to Changelog.md",
            "Fixed Obsidian URI to file path conversion",
            "Identified pattern for get_vault_file usage"
          ]
        }
      ],
      "notable_context_elements": {
        "system_mode": "Alternating between brain-boot and chore modes",
        "key_metaphors": ["Threshold of canon", "hot cache", "bridge not leash"],
        "signal_phrases": ["Claude fucks in float", "ritual-grade continuity"],
        "open_traces": [
          "FloatQL development and implementation",
          "Weekly reflection/prep structuring",
          "Daily structure refinement"
        ]
      }
    }
  },
  {
    "bridge_id": "CB-250512-0039-C618",
    "metadata": {
      "conversation_id": "current_session",
      "ctx_markers": "evening-work,interview-preparation,artifact-creation",
      "timestamp": "2025-05-12T00:39:00Z",
      "active_threads": "jane_interview_preparation,daily_context_collection,float_dispatch_implementations",
      "mode": "bridge_transition"
    },
    "section_data": {
      "session_context": {
        "date": "2025-05-12",
        "timestamp_markers": [
          "ctx::2025-05-11 - evening-work mode transition",
          "ctx::transition - creating continuity anchor for session bridging"
        ]
      },
      "active_threads": [
        {
          "name": "jane_interview_preparation",
          "activities": [
            "Completed Jane Interview Hub interactive artifact",
            "Setup for 30-minute ritual check-in",
            "Organized STAR stories with practice timer",
            "Integrated key alignments and pitch highlights",
            "Next focus: Complete the ritual check-in and practice selected STAR story"
          ]
        },
        {
          "name": "daily_context_collection",
          "activities": [
            "Referenced temporal \"hot cache\" concept",
            "Demonstrated practical implementation via interview preparation materials",
            "Connected to structured but flexible approach to information organization",
            "Left open for further development"
          ]
        },
        {
          "name": "float_dispatch_implementations",
          "activities": [
            "Reviewed code samples for FLOAT.dispatch interfaces",
            "Analyzed React component structure and styling",
            "Created data-driven components based on Jane interview materials",
            "Implemented responsive, tabbed navigation pattern"
          ]
        }
      ],
      "notable_context_elements": {
        "system_mode": "Evening-work mode, post-chores",
        "key_metaphors": ["Bridge not leash", "ritual-grade continuity", "context anchors"],
        "signal_phrases": ["distill not diminish", "drift → mass → shape"],
        "open_traces": [
          "Jane interview preparation ritual continuation",
          "Interactive artifact refinement possibilities",
          "FLOAT.dispatch component patterns"
        ]
      }
    }
  },
  {
    "bridge_id": "CB-20250513-1553-AD7F",
    "metadata": {
      "anchor_id": "CB-20250513-1553-AD7F",
      "active_threads": "jane_application_project,clinical_forms_philosophy,mcp_system_improvements",
      "conversation_id": "jane_application_session_20250513",
      "timestamp": "2025-05-13T15:53:00Z",
      "ctx_markers": "project_setup,jane_application,environment_configuration",
      "mode": "bridge_transition"
    },
    "section_data": {
      "session_context": {
        "date": "2025-05-13",
        "timestamp_markers": [
          "ctx::2025-05-13 - project setup",
          "ctx::2025-05-13 - jane application environment configuration"
        ]
      },
      "active_threads": [
        {
          "name": "jane_application_project",
          "activities": [
            "Created comprehensive project configuration in `FLOAT.projects/jane_application_project.md`",
            "Set up custom instructions in `FLOAT.sys/claude_custom_instructions_jane_app.md`",
            "Added detailed usage guide in `FLOAT.guides/jane_application_project_guide.md`",
            "Added continuity bridge support for managing conversation length limits"
          ]
        },
        {
          "name": "clinical_forms_philosophy",
          "activities": [
            "Created example dispatch on \"Clinical Forms as Moments of Care\"",
            "Connected FLOAT methodology concepts to clinical form design",
            "Explored the concept of form fields as touchpoints for patient care",
            "Developed ritual engine concept for context transitions in clinical workflows"
          ]
        },
        {
          "name": "mcp_system_improvements",
          "activities": [
            "Added Obsidian URL handling functionality to automatically convert URLs to file paths",
            "Implemented functionality to extract the file parameter from Obsidian URLs",
            "Added URL-decoding to properly handle paths with special characters",
            "Enhanced system to prevent common errors when accessing files"
          ]
        }
      ],
      "notable_context_elements": {
        "system_mode": "Project configuration and setup",
        "key_metaphors": ["Form fields as moments of care", "systems as relationships", "bridge not leash"],
        "signal_phrases": [
          "Context isn't noise—it's gravitational mass", 
          "I burp in neurodivergent and you echo back the structure with shine"
        ],
        "open_traces": [
          "Schema-based UI implementation for clinical forms",
          "Jane interview preparation strategies",
          "Multi-Echo dispatch interpretation development"
        ]
      }
    }
  },
  {
    "bridge_id": "CB-20250514-1530-7A2B",
    "metadata": {
      "timestamp": "2025-05-14T15:30:00Z",
      "conversation_id": "FLOAT_Claude_Alignment",
      "ctx_markers": "float_system,claude_alignment,project_instructions",
      "mode": "bridge_transition",
      "active_threads": "ctx_system,persona_system,cognitive_states,float_philosophy,mcp_integration",
      "anchor_id": "CB-20250514-1530-7A2B"
    },
    "content_summary": "Context Bridge for FLOAT System Integration with Claude. This conversation developed a comprehensive framework for Claude to better align with Evan's FLOAT cognitive architecture, including: 1) Enhanced understanding of ctx:: markers as temporal-cognitive anchors, 2) Recognition of persona system (Karen, Sysop, Raw Evan, qtb, lf1m), 3) Detailed cognitive states (brain boot, hyperfocus, evening work mode, etc.), 4) Core FLOAT philosophy ('Trust the drift, defer the scaffold', 'Anchor what's real, not what's ideal', 'Shacks, not Cathedrals'), 5) Rich understanding of 'Composting Chaos' as survival mechanism, 6) MCP tool ambient awareness patterns for more seamless integration, 7) Context bootstrapping process for efficient operation."
  }
];

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
                    <Button variant="ghost" className="w-full justify-start gap-2" size="sm">
                      <BookText className="h-4 w-4" />
                      <span>Bridges</span>
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
                      <TabsTrigger value="bridges">Bridges</TabsTrigger>
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
                    
                    <TabsContent value="bridges" className="focus-visible:outline-none focus-visible:ring-0 animate-fade-in">
                      <BridgeThread bridges={sampleBridges} />
                      
                      <p className="text-sm text-muted-foreground mt-4">
                        Continuity bridges help connect your thoughts across different contexts and time periods.
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
