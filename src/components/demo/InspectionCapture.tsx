import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, ArrowLeft, Camera } from "lucide-react";

interface InspectionCaptureProps {
  masterImage: string;
  onCapture: (imageUrl: string) => void;
  onBack: () => void;
}

export const InspectionCapture = ({ masterImage, onCapture, onBack }: InspectionCaptureProps) => {
  const [testImage, setTestImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTestImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = () => {
    if (testImage) {
      onCapture(testImage);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="p-6 bg-card border-border mb-6">
        <h3 className="text-xl font-semibold mb-4 text-center text-card-foreground">
          Compare with Master Image
        </h3>
        <p className="text-center text-muted-foreground mb-6">
          Keep the master image visible while capturing your test image for accurate comparison
        </p>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">Master Image</h3>
            <span className="px-3 py-1 bg-success/10 text-success text-sm rounded-full font-medium">
              Reference
            </span>
          </div>
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
            <img 
              src={masterImage} 
              alt="Master reference" 
              className="w-full h-full object-contain"
            />
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">Test Image</h3>
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">
              Capture
            </span>
          </div>
          
          {testImage ? (
            <div className="space-y-4">
              <div className="aspect-video w-full overflow-hidden rounded-lg border-2 border-primary bg-muted">
                <img 
                  src={testImage} 
                  alt="Test capture" 
                  className="w-full h-full object-contain"
                />
              </div>
              <Button
                onClick={() => setTestImage(null)}
                variant="outline"
                className="w-full"
              >
                Capture Different Image
              </Button>
            </div>
          ) : (
            <label className="block">
              <div className="aspect-video border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors bg-muted/50">
                <Camera className="w-12 h-12 mb-4 text-muted-foreground" />
                <p className="text-foreground mb-2">Upload Test Image</p>
                <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}
        </Card>
      </div>

      <div className="flex gap-4 mt-6 justify-center">
        <Button onClick={onBack} variant="outline" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Button 
          onClick={handleCapture} 
          disabled={!testImage}
          className="gap-2 bg-[var(--gradient-primary)]"
        >
          <Upload className="w-4 h-4" />
          Analyze Images
        </Button>
      </div>
    </div>
  );
};
