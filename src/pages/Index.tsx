import { useState, useRef } from "react";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { DemoContainer } from "@/components/demo/DemoContainer";

const Index = () => {
  const [showDemo, setShowDemo] = useState(false);
  const demoRef = useRef<HTMLDivElement>(null);

  const handleStartDemo = () => {
    setShowDemo(true);
    setTimeout(() => {
      demoRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero onStartDemo={handleStartDemo} />
      <Features />
      {showDemo && (
        <div ref={demoRef}>
          <DemoContainer />
        </div>
      )}
      
      <footer className="py-8 px-4 border-t border-border bg-muted/30">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-muted-foreground">
            © 2024 Q100.AI - Powered by Advanced AI Technology
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
