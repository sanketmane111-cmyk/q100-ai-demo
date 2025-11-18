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
    <div className="max-w-5xl mx-auto px-2 sm:px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6 bg-card border-border">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 text-card-foreground">Reference Image</h3>
          <div className="w-full overflow-hidden rounded-lg border border-border bg-muted">
            <img 
              src={masterImage} 
              alt="Reference" 
              className="w-full h-auto"
            />
          </div>
        </Card>

        <Card className="p-4 sm:p-6 bg-card border-border">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 text-card-foreground">Select Parameters</h3>
          
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-foreground flex items-center gap-2">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-success flex-shrink-0"></span>
                Component Check
              </h4>
              <div className="space-y-1.5 sm:space-y-2 pl-3 sm:pl-4">
                {absencePresenceOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`ap-${option}`}
                      checked={selected.absencePresence.includes(option)}
                      onCheckedChange={() => toggleParameter("absencePresence", option)}
                      className="h-4 w-4 sm:h-5 sm:w-5"
                    />
                    <Label 
                      htmlFor={`ap-${option}`}
                      className="cursor-pointer text-sm sm:text-base text-foreground"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-foreground flex items-center gap-2">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-destructive flex-shrink-0"></span>
                Defect Check
              </h4>
              <div className="space-y-1.5 sm:space-y-2 pl-3 sm:pl-4">
                {defectDetectionOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`dd-${option}`}
                      checked={selected.defectDetection.includes(option)}
                      onCheckedChange={() => toggleParameter("defectDetection", option)}
                      className="h-4 w-4 sm:h-5 sm:w-5"
                    />
                    <Label 
                      htmlFor={`dd-${option}`}
                      className="cursor-pointer text-sm sm:text-base text-foreground"
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

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 justify-center">
        <Button onClick={onBack} variant="outline" className="gap-2 w-full sm:w-auto order-2 sm:order-1">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!hasSelection}
          variant="gradient"
          className="gap-2 w-full sm:w-auto order-1 sm:order-2"
        >
          <span className="hidden sm:inline">Start Inspection</span>
          <span className="sm:hidden">Continue</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
