
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, ChevronDown, ChevronUp, Clock, Activity, BookText } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContinuityBridge } from "@/types/ContinuityBridge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface BridgeNoteProps {
  bridge: ContinuityBridge;
  className?: string;
}

const BridgeNote = ({ bridge, className }: BridgeNoteProps) => {
  const [expanded, setExpanded] = useState(false);
  
  // Format the timestamp to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <Card 
      className={cn(
        "border overflow-hidden transition-all duration-300 hover:shadow-md",
        expanded ? "shadow-md bg-slate-50/50" : "",
        className
      )}
    >
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border bg-zettle-lightGray">
              <AvatarImage src="/placeholder.svg" alt="Bridge" />
              <AvatarFallback>
                <FileText className="h-5 w-5 text-zettle-blue" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="font-medium">Bridge {bridge.bridge_id.substring(3, 11)}</span>
                <span className="text-sm text-muted-foreground">#{bridge.metadata.conversation_id}</span>
              </div>
              <span className="text-xs text-muted-foreground">{formatDate(bridge.metadata.timestamp)}</span>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 rounded-full hover:bg-zettle-blue/10 hover:text-zettle-blue"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="px-4 pt-0">
        <div className="flex flex-wrap gap-2 mb-3">
          {bridge.metadata.ctx_markers.split(',').map((marker, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="px-2 py-0.5 text-xs bg-zettle-lightGray hover:bg-zettle-gray/80 transition-colors rounded-full"
            >
              {marker.trim()}
            </Badge>
          ))}
        </div>
        
        <p className="text-sm leading-relaxed mb-3">
          {bridge.content_summary || `Continuity bridge for ${bridge.metadata.mode}`}
        </p>
        
        {expanded && bridge.section_data && (
          <div className="mt-4 space-y-3 text-sm border-t pt-3">
            <div className="flex items-center gap-2 text-zettle-blue font-medium">
              <Clock className="h-4 w-4" />
              <h3>Session Context - {bridge.section_data.session_context.date}</h3>
            </div>
            
            <ul className="space-y-1 pl-6 text-xs">
              {bridge.section_data.session_context.timestamp_markers.map((marker, idx) => (
                <li key={idx} className="list-disc text-muted-foreground">{marker}</li>
              ))}
            </ul>
            
            <div className="mt-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="active-threads" className="border-0">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <div className="flex items-center gap-2 text-zettle-blue font-medium">
                      <Activity className="h-4 w-4" />
                      <h3>Active Threads</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {bridge.section_data.active_threads.map((thread, idx) => (
                      <div key={idx} className="mb-3">
                        <h4 className="font-medium text-xs">{thread.name}</h4>
                        <ul className="space-y-1 pl-6 text-xs mt-1">
                          {thread.activities.map((activity, actIdx) => (
                            <li key={actIdx} className="list-disc text-muted-foreground">{activity}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="context-elements" className="border-0">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <div className="flex items-center gap-2 text-zettle-blue font-medium">
                      <BookText className="h-4 w-4" />
                      <h3>Context Elements</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-xs">
                      <div>
                        <h4 className="font-medium">System Mode</h4>
                        <p className="text-muted-foreground">{bridge.section_data.notable_context_elements.system_mode}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">Key Metaphors</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {bridge.section_data.notable_context_elements.key_metaphors.map((metaphor, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">{metaphor}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">Signal Phrases</h4>
                        <ul className="space-y-1 pl-6">
                          {bridge.section_data.notable_context_elements.signal_phrases.map((phrase, idx) => (
                            <li key={idx} className="list-disc text-muted-foreground">{phrase}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">Open Traces</h4>
                        <ul className="space-y-1 pl-6">
                          {bridge.section_data.notable_context_elements.open_traces.map((trace, idx) => (
                            <li key={idx} className="list-disc text-muted-foreground">{trace}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="px-4 py-2 flex justify-between border-t border-muted/50">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-muted-foreground hover:text-zettle-blue h-8 px-2 text-xs"
        >
          <Clock className="h-3.5 w-3.5 mr-1" />
          {bridge.metadata.mode}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BridgeNote;
