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
    <div className="max-w-6xl mx-auto">
      <Card className="p-6 bg-card border-border mb-6">
        <h3 className="text-2xl font-semibold mb-4 text-center text-card-foreground">
          Inspection Results
        </h3>
        <div className="flex justify-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <span className="text-foreground"><span className="font-bold">{passCount}</span> Passed</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <span className="text-foreground"><span className="font-bold">{warningCount}</span> Warnings</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-destructive" />
            <span className="text-foreground"><span className="font-bold">{failCount}</span> Failed</span>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card className="p-6 bg-card border-border">
          <h4 className="text-lg font-semibold mb-4 text-card-foreground">Master Image</h4>
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
            <img 
              src={masterImage} 
              alt="Master" 
              className="w-full h-full object-contain"
            />
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h4 className="text-lg font-semibold mb-4 text-card-foreground">Test Image</h4>
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
            <img 
              src={testImage} 
              alt="Test" 
              className="w-full h-full object-contain"
            />
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-card border-border mb-6">
        <h4 className="text-lg font-semibold mb-4 text-card-foreground">Detailed Analysis</h4>
        <div className="space-y-3">
          {results.map((result, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/50"
            >
              <div className="flex items-center gap-4">
                {result.status === "pass" && <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />}
                {result.status === "warning" && <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />}
                {result.status === "fail" && <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground">{result.parameter}</span>
                    <Badge 
                      variant="outline"
                      className="text-xs"
                    >
                      {result.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{result.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-center">
        <Button 
          onClick={onReset}
          size="lg"
          className="gap-2 bg-[var(--gradient-primary)]"
        >
          <RotateCcw className="w-4 h-4" />
          Start New Inspection
        </Button>
      </div>
    </div>
  );
};
