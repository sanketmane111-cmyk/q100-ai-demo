import { useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface MasterImageUploadProps {
  onUpload: (imageUrl: string) => void;
}

export const MasterImageUpload = ({ onUpload }: MasterImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (preview) {
      onUpload(preview);
    }
  };

  return (
    <Card className="p-8 max-w-2xl mx-auto bg-card border-border">
      <div className="text-center mb-6">
        <ImageIcon className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h3 className="text-2xl font-semibold mb-2 text-card-foreground">Upload Master Image</h3>
        <p className="text-muted-foreground">
          Upload a reference image of the perfect product for comparison
        </p>
      </div>

      <div className="space-y-6">
        {preview ? (
          <div className="space-y-4">
            <div className="aspect-video w-full overflow-hidden rounded-lg border-2 border-border bg-muted">
              <img 
                src={preview} 
                alt="Master preview" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => setPreview(null)}
                variant="outline"
                className="flex-1"
              >
                Change Image
              </Button>
              <Button
                onClick={handleUpload}
                className="flex-1 bg-[var(--gradient-primary)]"
              >
                Proceed to Parameters
              </Button>
            </div>
          </div>
        ) : (
          <label className="block">
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:border-primary transition-colors bg-muted/50">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-foreground mb-2">Click to upload or drag and drop</p>
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
      </div>
    </Card>
  );
};
