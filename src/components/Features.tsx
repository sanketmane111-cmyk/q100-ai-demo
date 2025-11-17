import { CheckCircle2, Scan, AlertTriangle, Palette } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: CheckCircle2,
    title: "Component Detection",
    description: "Verify nuts, bolts, holes, screws, and wirings instantly.",
    color: "text-success"
  },
  {
    icon: AlertTriangle,
    title: "Defect Detection",
    description: "Identify scratches, peeling, and surface defects.",
    color: "text-destructive"
  },
  {
    icon: Palette,
    title: "Finish Verification",
    description: "Ensure consistent color and surface finish.",
    color: "text-secondary"
  },
  {
    icon: Scan,
    title: "QR Code Check",
    description: "Validate QR codes and product identification.",
    color: "text-primary"
  }
];

export const Features = () => {
  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          Complete Quality Control
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-[var(--shadow-elevated)] transition-shadow duration-300 border-border bg-card"
            >
              <feature.icon className={`w-12 h-12 mb-4 ${feature.color}`} />
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
