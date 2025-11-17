import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SelectedParameters } from "./DemoContainer";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ParameterSelectionProps {
  masterImage: string;
  onNext: (parameters: SelectedParameters) => void;
  onBack: () => void;
}

const absencePresenceOptions = [
  "Nuts", "Bolts", "Holes", "Grommets", "Zip Ties", "Screws", "Wirings"
];

const defectDetectionOptions = [
  "Scratches", "Peeling"
];

export const ParameterSelection = ({ masterImage, onNext, onBack }: ParameterSelectionProps) => {
  const [selected, setSelected] = useState<SelectedParameters>({
    absencePresence: [],
    defectDetection: []
  });

  const toggleParameter = (category: keyof SelectedParameters, value: string) => {
    setSelected(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleNext = () => {
    if (selected.absencePresence.length > 0 || selected.defectDetection.length > 0) {
      onNext(selected);
    }
  };

  const hasSelection = selected.absencePresence.length > 0 || selected.defectDetection.length > 0;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border">
          <h3 className="text-xl font-semibold mb-4 text-card-foreground">Master Image Reference</h3>
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
            <img 
              src={masterImage} 
              alt="Master reference" 
              className="w-full h-full object-contain"
            />
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-xl font-semibold mb-4 text-card-foreground">Select Inspection Parameters</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success"></span>
                Absence/Presence Detection
              </h4>
              <div className="space-y-2 pl-4">
                {absencePresenceOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`ap-${option}`}
                      checked={selected.absencePresence.includes(option)}
                      onCheckedChange={() => toggleParameter("absencePresence", option)}
                    />
                    <Label 
                      htmlFor={`ap-${option}`}
                      className="cursor-pointer text-foreground"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-destructive"></span>
                Defect Detection
              </h4>
              <div className="space-y-2 pl-4">
                {defectDetectionOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`dd-${option}`}
                      checked={selected.defectDetection.includes(option)}
                      onCheckedChange={() => toggleParameter("defectDetection", option)}
                    />
                    <Label 
                      htmlFor={`dd-${option}`}
                      className="cursor-pointer text-foreground"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex gap-4 mt-6 justify-center">
        <Button onClick={onBack} variant="outline" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!hasSelection}
          className="gap-2 bg-[var(--gradient-primary)]"
        >
          Start Inspection
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
