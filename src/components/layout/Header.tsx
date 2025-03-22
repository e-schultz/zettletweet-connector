
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 backdrop-blur-lg",
        isScrolled 
          ? "bg-white/80 shadow-subtle" 
          : "bg-white/0"
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-xl font-medium tracking-tight flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <span className="text-zettle-blue">#</span>
            <span>ZettleTweet</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search notes..." 
                className="pl-10 bg-transparent border-muted"
              />
            </div>
            
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-sm font-medium hover:text-zettle-blue transition-colors">
                Home
              </Link>
              <Link to="/graph" className="text-sm font-medium hover:text-zettle-blue transition-colors">
                Graph
              </Link>
              <Link to="/explore" className="text-sm font-medium hover:text-zettle-blue transition-colors">
                Explore
              </Link>
            </nav>
            
            <Button size="sm" className="rounded-full">
              <Plus className="h-4 w-4 mr-2" />
              New Zettle
            </Button>
          </div>
          
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </Container>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-muted animate-slide-down md:hidden">
          <Container className="py-4 space-y-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search notes..." 
                className="pl-10 bg-transparent w-full"
              />
            </div>
            
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-sm font-medium hover:text-zettle-blue transition-colors">
                Home
              </Link>
              <Link to="/graph" className="text-sm font-medium hover:text-zettle-blue transition-colors">
                Graph
              </Link>
              <Link to="/explore" className="text-sm font-medium hover:text-zettle-blue transition-colors">
                Explore
              </Link>
            </nav>
            
            <Button size="sm" className="w-full rounded-full">
              <Plus className="h-4 w-4 mr-2" />
              New Zettle
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
};

export default Header;
