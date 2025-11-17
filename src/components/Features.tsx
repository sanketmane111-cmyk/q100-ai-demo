import { CheckCircle2, Scan, AlertTriangle, Palette } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: CheckCircle2,
    title: "Absence/Presence Detection",
    description: "Verify the presence of critical components like nuts, bolts, holes, grommets, zip ties, screws, and wirings.",
    color: "text-success"
  },
  {
    icon: AlertTriangle,
    title: "Defect Detection",
    description: "Identify surface defects including scratches, peeling, and other imperfections automatically.",
    color: "text-destructive"
  },
  {
    icon: Palette,
    title: "Color & Finish Verification",
    description: "Ensure consistent color and surface finish across all manufactured products.",
    color: "text-secondary"
  },
  {
    icon: Scan,
    title: "QR Code Verification",
    description: "Validate QR codes and barcodes to ensure proper product identification and traceability.",
    color: "text-primary"
  }
];

export const Features = () => {
  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          Comprehensive Quality Inspection
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Powered by advanced AI, Q100.AI provides multiple inspection categories to ensure 
          complete quality control across your manufacturing line.
        </p>

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
