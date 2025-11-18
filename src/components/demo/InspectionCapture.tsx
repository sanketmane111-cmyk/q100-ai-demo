import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, ArrowLeft, Camera } from "lucide-react";
import { CameraCapture } from "./CameraCapture";

interface InspectionCaptureProps {
  masterImage: string;
  onCapture: (imageUrl: string) => void;
  onBack: () => void;
}

export const InspectionCapture = ({ masterImage, onCapture, onBack }: InspectionCaptureProps) => {
  const [testImage, setTestImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);

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
    <>
      {showCamera && (
        <CameraCapture
          onCapture={(imageUrl) => {
            setTestImage(imageUrl);
            setShowCamera(false);
          }}
          onClose={() => setShowCamera(false)}
          overlayImage={masterImage}
        />
      )}
      
      <div className="max-w-5xl mx-auto px-2 sm:px-4">
        <Card className="p-4 sm:p-6 bg-card border-border mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-center text-card-foreground">
            Compare with Master Image
          </h3>
          <p className="text-center text-muted-foreground text-sm sm:text-base">
            Keep the master image visible while capturing your test image for accurate comparison
          </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <Card className="p-4 sm:p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-card-foreground">Master Image</h3>
              <span className="px-2 sm:px-3 py-1 bg-success/10 text-success text-xs sm:text-sm rounded-full font-medium">
                Reference
              </span>
            </div>
            <div className="w-full overflow-hidden rounded-lg border border-border bg-muted">
              <img 
                src={masterImage} 
                alt="Master reference" 
                className="w-full h-auto"
              />
            </div>
          </Card>

          <Card className="p-4 sm:p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-card-foreground">Test Image</h3>
              <span className="px-2 sm:px-3 py-1 bg-primary/10 text-primary text-xs sm:text-sm rounded-full font-medium">
                Capture
              </span>
            </div>
            
            {testImage ? (
              <div className="space-y-3 sm:space-y-4">
                <div className="w-full overflow-hidden rounded-lg border-2 border-primary bg-muted">
                  <img 
                    src={testImage} 
                    alt="Test capture" 
                    className="w-full h-auto"
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
              <div className="space-y-3 sm:space-y-4">
                <label className="block">
                  <div className="min-h-[200px] sm:min-h-[300px] border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors bg-muted/50 p-4">
                    <Upload className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-muted-foreground" />
                    <p className="text-sm sm:text-base text-foreground mb-2">Upload Test Image</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">or</span>
                </div>
                
                <Button
                  onClick={() => setShowCamera(true)}
                  variant="outline"
                  className="w-full gap-2"
                >
                  <Camera className="w-4 h-4" />
                  Capture with Camera
                </Button>
              </div>
            )}
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 justify-center">
          <Button onClick={onBack} variant="outline" className="gap-2 w-full sm:w-auto">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button 
            onClick={handleCapture} 
            disabled={!testImage}
            variant="gradient"
            className="gap-2 w-full sm:w-auto"
          >
            <Upload className="w-4 h-4" />
            Analyze Images
          </Button>
        </div>
      </div>
    </>
  );
};
