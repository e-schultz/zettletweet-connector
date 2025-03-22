
import React from "react";
import { Container } from "@/components/ui/container";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-muted mt-20">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <Link 
              to="/" 
              className="text-lg font-medium tracking-tight flex items-center gap-2 mb-2"
            >
              <span className="text-zettle-blue">#</span>
              <span>ZettleTweet</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Connect your ideas like never before
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-4 text-sm">
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors">
              Help
            </Link>
            <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-muted flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ZettleTweet. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4">
            <Link to="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Twitter
            </Link>
            <Link to="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              GitHub
            </Link>
            <Link to="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Discord
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
