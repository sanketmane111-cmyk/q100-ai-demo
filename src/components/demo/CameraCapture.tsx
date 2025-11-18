import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, X, Repeat } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CameraCaptureProps {
  onCapture: (imageUrl: string) => void;
  onClose: () => void;
  overlayImage?: string;
}

export const CameraCapture = ({ onCapture, onClose, overlayImage }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState(!!overlayImage);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const imageUrl = canvas.toDataURL("image/jpeg", 1.0);
        setCapturedImage(imageUrl);
      }
    }
  };

  const handleConfirm = () => {
    if (capturedImage) {
      stopCamera();
      onCapture(capturedImage);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  return (
    <div className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-4xl p-3 sm:p-6 bg-card border-border max-h-[95vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl font-semibold text-card-foreground">
            {capturedImage ? "Review Capture" : "Capture Image"}
          </h3>
          <Button onClick={onClose} variant="ghost" size="icon">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="relative w-full bg-muted rounded-lg overflow-hidden mb-3 sm:mb-4">
          {!capturedImage ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-auto"
              />
              {overlayImage && showOverlay && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <img
                    src={overlayImage}
                    alt="Master overlay"
                    className="max-w-full max-h-full opacity-40"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              )}
              <canvas ref={canvasRef} className="hidden" />
            </>
          ) : (
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full h-auto"
            />
          )}
        </div>

        {overlayImage && !capturedImage && (
          <div className="flex justify-center mb-3 sm:mb-4">
            <Button
              onClick={() => setShowOverlay(!showOverlay)}
              variant="outline"
              size="sm"
            >
              {showOverlay ? "Hide" : "Show"} Master Overlay
            </Button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
          {!capturedImage ? (
            <Button onClick={capturePhoto} variant="gradient" className="gap-2 w-full sm:w-auto">
              <Camera className="w-4 h-4" />
              Capture Photo
            </Button>
          ) : (
            <>
              <Button onClick={handleRetake} variant="outline" className="gap-2 w-full sm:w-auto">
                <Repeat className="w-4 h-4" />
                Retake
              </Button>
              <Button onClick={handleConfirm} variant="gradient" className="gap-2 w-full sm:w-auto">
                Confirm & Use
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};
