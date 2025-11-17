import { Check } from "lucide-react";
import { InspectionStep } from "./DemoContainer";

interface StepIndicatorProps {
  currentStep: InspectionStep;
}

const steps = [
  { id: "upload", label: "Upload Master", number: 1 },
  { id: "parameters", label: "Select Parameters", number: 2 },
  { id: "capture", label: "Capture Image", number: 3 },
  { id: "results", label: "View Results", number: 4 },
];

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-colors ${
                index < currentStepIndex
                  ? "bg-success text-success-foreground"
                  : index === currentStepIndex
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {index < currentStepIndex ? (
                <Check className="w-6 h-6" />
              ) : (
                step.number
              )}
            </div>
            <span className="text-sm mt-2 text-center text-foreground/80">{step.label}</span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-24 h-1 mx-2 mb-6 transition-colors ${
                index < currentStepIndex ? "bg-success" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};
