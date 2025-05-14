
import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Container } from "@/components/ui/container";
import Sidebar from "@/components/home/Sidebar";
import MainContent from "@/components/home/MainContent";
import { sampleZettles, sampleGraphData, sampleBridges } from "@/data/sampleData";

const Index = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);
  
  return (
    <div className={`min-h-screen flex flex-col ${isPageLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <Header />
      
      <main className="flex-grow pt-24 pb-8">
        <Container>
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left sidebar */}
              <Sidebar />
              
              {/* Main content */}
              <MainContent 
                zettles={sampleZettles} 
                graphData={sampleGraphData} 
                bridges={sampleBridges} 
              />
            </div>
          </div>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
