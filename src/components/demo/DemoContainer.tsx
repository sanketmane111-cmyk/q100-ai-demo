import { useState } from "react";
import { StepIndicator } from "./StepIndicator";
import { MasterImageUpload } from "./MasterImageUpload";
import { ParameterSelection } from "./ParameterSelection";
import { InspectionCapture } from "./InspectionCapture";
import { InspectionResults } from "./InspectionResults";

export type InspectionStep = "upload" | "parameters" | "capture" | "results";

export interface SelectedParameters {
  absencePresence: string[];
  defectDetection: string[];
}

export const DemoContainer = () => {
  const [currentStep, setCurrentStep] = useState<InspectionStep>("upload");
  const [masterImage, setMasterImage] = useState<string | null>(null);
  const [testImage, setTestImage] = useState<string | null>(null);
  const [selectedParameters, setSelectedParameters] = useState<SelectedParameters>({
    absencePresence: [],
    defectDetection: []
  });

  const handleMasterImageUpload = (imageUrl: string) => {
    setMasterImage(imageUrl);
    setCurrentStep("parameters");
  };

  const handleParametersSelected = (params: SelectedParameters) => {
    setSelectedParameters(params);
    setCurrentStep("capture");
  };

  const handleTestImageCapture = (imageUrl: string) => {
    setTestImage(imageUrl);
    setCurrentStep("results");
  };

  const handleReset = () => {
    setCurrentStep("upload");
    setMasterImage(null);
    setTestImage(null);
    setSelectedParameters({
      absencePresence: [],
      defectDetection: []
    });
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          Interactive Product Demo
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Experience Q100.AI in action - upload a master image, select inspection parameters, 
          and see real-time quality analysis
        </p>

        <StepIndicator currentStep={currentStep} />

        <div className="mt-12">
          {currentStep === "upload" && (
            <MasterImageUpload onUpload={handleMasterImageUpload} />
          )}

          {currentStep === "parameters" && masterImage && (
            <ParameterSelection 
              masterImage={masterImage}
              onNext={handleParametersSelected}
              onBack={() => setCurrentStep("upload")}
            />
          )}

          {currentStep === "capture" && masterImage && (
            <InspectionCapture
              masterImage={masterImage}
              onCapture={handleTestImageCapture}
              onBack={() => setCurrentStep("parameters")}
            />
          )}

          {currentStep === "results" && masterImage && testImage && (
            <InspectionResults
              masterImage={masterImage}
              testImage={testImage}
              parameters={selectedParameters}
              onReset={handleReset}
            />
          )}
        </div>
      </div>
    </section>
  );
};
