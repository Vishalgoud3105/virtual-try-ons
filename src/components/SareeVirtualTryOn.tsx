import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, Sparkles, Download, RefreshCw } from "lucide-react";
import ImageUpload from "./ImageUpload";
import ProcessingSteps from "./ProcessingSteps";
import ResultDisplay from "./ResultDisplay";

export type ProcessingStep = "idle" | "uploading" | "segmenting" | "pose-detection" | "garment-extraction" | "alignment" | "blending" | "complete";

interface UploadedImages {
  modelImage: File | null;
  sareeImage: File | null;
}

const SareeVirtualTryOn = () => {
  const [step, setStep] = useState<ProcessingStep>("idle");
  const [progress, setProgress] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<UploadedImages>({
    modelImage: null,
    sareeImage: null,
  });
  const [resultImage, setResultImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (type: "model" | "saree", file: File) => {
    setUploadedImages(prev => ({
      ...prev,
      [type === "model" ? "modelImage" : "sareeImage"]: file,
    }));
    
    toast({
      title: "Image uploaded",
      description: `${type === "model" ? "Model" : "Saree"} image uploaded successfully`,
    });
  };

  const canStartProcessing = uploadedImages.modelImage && uploadedImages.sareeImage;

  const startVirtualTryOn = async () => {
    if (!canStartProcessing) return;

    const steps: ProcessingStep[] = [
      "uploading", "segmenting", "pose-detection", 
      "garment-extraction", "alignment", "blending", "complete"
    ];

    for (let i = 0; i < steps.length; i++) {
      setStep(steps[i]);
      setProgress(((i + 1) / steps.length) * 100);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Simulate result - in real implementation, this would come from ML backend
    setResultImage("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23f0f0f0'/%3E%3Ctext x='200' y='300' text-anchor='middle' font-family='Arial' font-size='16' fill='%23666'%3EVirtual Try-On Result%3C/text%3E%3C/svg%3E");
    
    toast({
      title: "Virtual try-on complete!",
      description: "Your saree has been virtually fitted to your model",
    });
  };

  const resetProcess = () => {
    setStep("idle");
    setProgress(0);
    setResultImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Saree Virtual Try-On
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the perfect fit with AI-powered virtual try-on technology. 
            Upload your photo and a saree image to see how you'd look wearing it.
          </p>
        </div>

        {step === "idle" && (
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            <ImageUpload
              title="Upload Your Photo"
              description="Upload a clear front-facing photo of yourself"
              accept="image/*"
              onImageUpload={(file) => handleImageUpload("model", file)}
              uploadedImage={uploadedImages.modelImage}
              placeholder="model"
            />
            
            <ImageUpload
              title="Choose Saree Design"
              description="Upload an image of the saree you want to try on"
              accept="image/*"
              onImageUpload={(file) => handleImageUpload("saree", file)}
              uploadedImage={uploadedImages.sareeImage}
              placeholder="saree"
            />
          </div>
        )}

        {step !== "idle" && step !== "complete" && (
          <div className="max-w-2xl mx-auto mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  Processing Virtual Try-On
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={progress} className="w-full" />
                <ProcessingSteps currentStep={step} />
              </CardContent>
            </Card>
          </div>
        )}

        {step === "complete" && resultImage && (
          <ResultDisplay
            resultImage={resultImage}
            modelImage={uploadedImages.modelImage}
            sareeImage={uploadedImages.sareeImage}
            onReset={resetProcess}
          />
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          {step === "idle" && (
            <Button
              onClick={startVirtualTryOn}
              disabled={!canStartProcessing}
              size="lg"
              className="w-full sm:w-auto"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Start Virtual Try-On
            </Button>
          )}
          
          {step === "complete" && (
            <>
              <Button onClick={resetProcess} variant="outline" size="lg">
                Try Another Saree
              </Button>
              <Button size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download Result
              </Button>
            </>
          )}
        </div>

        {/* Features */}
        {step === "idle" && (
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
            <Card>
              <CardContent className="pt-6 text-center">
                <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Easy Upload</h3>
                <p className="text-sm text-muted-foreground">
                  Simply upload your photo and saree image to get started
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 text-center">
                <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">AI-Powered</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced machine learning ensures realistic fitting and draping
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 text-center">
                <Download className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Instant Results</h3>
                <p className="text-sm text-muted-foreground">
                  Get your virtual try-on result in seconds and download it
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SareeVirtualTryOn;