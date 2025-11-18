import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SelectedParameters } from "./DemoContainer";
import { CheckCircle2, XCircle, AlertTriangle, RotateCcw } from "lucide-react";

interface InspectionResultsProps {
  masterImage: string;
  testImage: string;
  parameters: SelectedParameters;
  onReset: () => void;
}

export const InspectionResults = ({ 
  masterImage, 
  testImage, 
  parameters,
  onReset 
}: InspectionResultsProps) => {
  // Simulate results - in real app this would come from AI analysis
  const generateResults = () => {
    const results: Array<{
      category: string;
      parameter: string;
      status: "pass" | "fail" | "warning";
      message: string;
    }> = [];

    parameters.absencePresence.forEach((param) => {
      const random = Math.random();
      results.push({
        category: "Absence/Presence",
        parameter: param,
        status: random > 0.3 ? "pass" : random > 0.15 ? "warning" : "fail",
        message: random > 0.3 
          ? `${param} detected correctly`
          : random > 0.15
          ? `${param} partially detected`
          : `${param} missing or misaligned`
      });
    });

    parameters.defectDetection.forEach((param) => {
      const random = Math.random();
      results.push({
        category: "Defect Detection",
        parameter: param,
        status: random > 0.4 ? "pass" : "fail",
        message: random > 0.4 
          ? `No ${param.toLowerCase()} detected`
          : `${param} detected - requires attention`
      });
    });

    return results;
  };

  const results = generateResults();
  const passCount = results.filter(r => r.status === "pass").length;
  const failCount = results.filter(r => r.status === "fail").length;
  const warningCount = results.filter(r => r.status === "warning").length;

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4">
      <Card className="p-4 sm:p-6 bg-card border-border mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-center text-card-foreground">
          Analysis Results
        </h3>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-success flex-shrink-0" />
            <span className="text-sm sm:text-base text-foreground whitespace-nowrap">
              <span className="font-bold">{passCount}</span> Passed
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-warning flex-shrink-0" />
            <span className="text-sm sm:text-base text-foreground whitespace-nowrap">
              <span className="font-bold">{warningCount}</span> Warning
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-destructive flex-shrink-0" />
            <span className="text-sm sm:text-base text-foreground whitespace-nowrap">
              <span className="font-bold">{failCount}</span> Failed
            </span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <Card className="p-4 sm:p-6 bg-card border-border">
          <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-card-foreground">Reference</h4>
          <div className="w-full overflow-hidden rounded-lg border border-border bg-muted">
            <img 
              src={masterImage} 
              alt="Reference" 
              className="w-full h-auto"
            />
          </div>
        </Card>

        <Card className="p-4 sm:p-6 bg-card border-border">
          <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-card-foreground">Inspected</h4>
          <div className="w-full overflow-hidden rounded-lg border border-border bg-muted">
            <img 
              src={testImage} 
              alt="Inspected" 
              className="w-full h-auto"
            />
          </div>
        </Card>
      </div>

      <Card className="p-4 sm:p-6 bg-card border-border mb-4 sm:mb-6">
        <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-card-foreground">Parameter Results</h4>
        <div className="space-y-2 sm:space-y-3">
          {results.map((result, index) => (
            <div 
              key={index}
              className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border border-border bg-muted/50"
            >
              {result.status === "pass" ? (
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-success flex-shrink-0 mt-0.5" />
              ) : result.status === "warning" ? (
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-warning flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-destructive flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                  <Badge variant="outline" className="text-xs flex-shrink-0">
                    {result.category}
                  </Badge>
                  <span className="font-semibold text-sm sm:text-base text-foreground">{result.parameter}</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">{result.message}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-center">
        <Button 
          onClick={onReset}
          variant="gradient"
          className="gap-2 w-full sm:w-auto"
        >
          <RotateCcw className="w-4 h-4" />
          New Inspection
        </Button>
      </div>
    </div>
  );
};
