
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Heart, Share2, Bookmark, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export interface ZettleCardProps {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  tags: string[];
  connections: number;
  likes: number;
  comments: number;
  isConnected?: boolean;
  className?: string;
}

const ZettleCard = ({
  id,
  author,
  content,
  timestamp,
  tags,
  connections,
  likes,
  comments,
  isConnected = false,
  className,
}: ZettleCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Format content to make hashtags clickable
  const formatContent = (text: string) => {
    return text.split(/\s+/).map((word, i) => {
      if (word.startsWith('#')) {
        return (
          <Link 
            key={i} 
            to={`/tag/${word.slice(1)}`} 
            className="text-zettle-blue hover:underline"
          >
            {word}{' '}
          </Link>
        );
      }
      if (word.startsWith('@')) {
        return (
          <Link 
            key={i} 
            to={`/user/${word.slice(1)}`} 
            className="text-zettle-blue hover:underline"
          >
            {word}{' '}
          </Link>
        );
      }
      return word + ' ';
    });
  };

  return (
    <Card 
      className={cn(
        "border overflow-hidden transition-all duration-300",
        "hover:shadow-card hover:border-muted",
        isConnected && "border-zettle-blue/50 bg-zettle-blue/[0.02]",
        className
      )}
    >
      <CardHeader className="pb-0 pt-4 px-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="font-medium">{author.name}</span>
                <span className="text-sm text-muted-foreground">@{author.username}</span>
              </div>
              <span className="text-xs text-muted-foreground">{timestamp}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 rounded-full hover:bg-zettle-blue/10 hover:text-zettle-blue"
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <p className="text-sm leading-relaxed mb-3">{formatContent(content)}</p>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="px-2 py-0 text-xs bg-zettle-lightGray hover:bg-zettle-gray/80 transition-colors rounded-full"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="px-4 py-2 flex justify-between border-t border-muted/50">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-muted-foreground hover:text-zettle-blue h-8 px-2 text-xs"
        >
          <MessageSquare className="h-3.5 w-3.5 mr-1" />
          {comments}
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "h-8 px-2 text-xs",
            isLiked ? "text-zettle-blue" : "text-muted-foreground hover:text-zettle-blue"
          )}
          onClick={toggleLike}
        >
          <Heart className={cn("h-3.5 w-3.5 mr-1", isLiked && "fill-zettle-blue")} />
          {currentLikes}
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-muted-foreground hover:text-zettle-blue h-8 px-2 text-xs"
        >
          <Share2 className="h-3.5 w-3.5 mr-1" />
          Share
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "h-8 px-2 text-xs",
            isBookmarked ? "text-zettle-blue" : "text-muted-foreground hover:text-zettle-blue"
          )}
          onClick={toggleBookmark}
        >
          <Bookmark className={cn("h-3.5 w-3.5 mr-1", isBookmarked && "fill-zettle-blue")} />
          Save
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ZettleCard;
