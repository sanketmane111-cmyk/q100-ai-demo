import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const Hero = ({ onStartDemo }: { onStartDemo: () => void }) => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-[var(--shadow-card)] border border-border">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">AI-Powered Quality Inspection</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6 text-foreground">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Q100.AI
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto font-medium">
          AI-Powered Quality Inspection for Manufacturing
        </p>

        <div className="flex justify-center">
          <Button 
            onClick={onStartDemo}
            size="lg"
            variant="gradient"
            className="text-lg px-8 py-6"
          >
            Try Interactive Demo
          </Button>
        </div>
      </div>
    </section>
  );
};
