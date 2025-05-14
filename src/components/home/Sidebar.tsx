
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, TrendingUp, Zap, Users, Clock, BookText } from "lucide-react";

const Sidebar = () => {
  return (
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
  );
};

export default Sidebar;
