import { Check } from "lucide-react";
import { InspectionStep } from "./DemoContainer";

interface StepIndicatorProps {
  currentStep: InspectionStep;
}

const steps = [
  { id: "upload", label: "Upload", shortLabel: "Upload", number: 1 },
  { id: "parameters", label: "Parameters", shortLabel: "Select", number: 2 },
  { id: "capture", label: "Capture", shortLabel: "Capture", number: 3 },
  { id: "results", label: "Results", shortLabel: "Results", number: 4 },
];

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="flex items-center justify-center overflow-x-auto pb-2">
      <div className="flex items-center min-w-max px-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold transition-colors text-sm sm:text-base ${
                  index < currentStepIndex
                    ? "bg-success text-success-foreground"
                    : index === currentStepIndex
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {index < currentStepIndex ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                ) : (
                  step.number
                )}
              </div>
              <span className="text-xs sm:text-sm mt-1.5 sm:mt-2 text-center text-foreground/80 whitespace-nowrap">
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-12 sm:w-16 md:w-24 h-0.5 sm:h-1 mx-1 sm:mx-2 mb-4 sm:mb-6 transition-colors ${
                  index < currentStepIndex ? "bg-success" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
