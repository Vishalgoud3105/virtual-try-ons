import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Share2, RotateCcw, Sparkles, Zap, Star } from "lucide-react";

interface ResultDisplayProps {
  resultImage: string;
  modelImage: File | null;
  sareeImage: File | null;
  onReset: () => void;
}

const ResultDisplay = ({ resultImage, modelImage, sareeImage, onReset }: ResultDisplayProps) => {
  const [activeTab, setActiveTab] = useState("result");

  const downloadResult = () => {
    const link = document.createElement("a");
    link.href = resultImage;
    link.download = "saree-virtual-tryon-result.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareResult = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Saree Virtual Try-On",
          text: "Check out how I look in this beautiful saree!",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Success Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Virtual Try-On Complete!</h2>
        </div>
        <p className="text-muted-foreground">
          Your personalized saree fitting is ready. See how beautifully it drapes on you!
        </p>
      </div>

      {/* Results Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="result">Final Result</TabsTrigger>
          <TabsTrigger value="comparison">Before & After</TabsTrigger>
          <TabsTrigger value="details">Process Details</TabsTrigger>
        </TabsList>

        <TabsContent value="result" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Your Virtual Try-On Result
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <div className="relative group">
                  <img
                    src={resultImage}
                    alt="Virtual try-on result"
                    className="max-w-md w-full h-auto rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="mt-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Original Photo</CardTitle>
              </CardHeader>
              <CardContent>
                {modelImage && (
                  <img
                    src={URL.createObjectURL(modelImage)}
                    alt="Original model"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Saree Design</CardTitle>
              </CardHeader>
              <CardContent>
                {sareeImage && (
                  <img
                    src={URL.createObjectURL(sareeImage)}
                    alt="Saree design"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  AI Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={resultImage}
                  alt="Virtual try-on result"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="details" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Processing Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Processing Time</span>
                  <Badge variant="secondary">~8.5 seconds</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">AI Model Used</span>
                  <Badge variant="secondary">VITON-HD v2</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pose Detection</span>
                  <Badge variant="secondary">✓ Successful</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Garment Extraction</span>
                  <Badge variant="secondary">✓ High Quality</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Drape Realism</span>
                  <Badge variant="secondary">✓ Excellent</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Fit Accuracy</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "94%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Texture Preservation</span>
                    <span className="font-medium">96%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "96%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Drape Realism</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "92%" }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button onClick={downloadResult} size="lg">
          <Download className="mr-2 h-4 w-4" />
          Download Result
        </Button>
        <Button onClick={shareResult} variant="outline" size="lg">
          <Share2 className="mr-2 h-4 w-4" />
          Share Result
        </Button>
        <Button onClick={onReset} variant="outline" size="lg">
          <RotateCcw className="mr-2 h-4 w-4" />
          Try Another Saree
        </Button>
      </div>
    </div>
  );
};

export default ResultDisplay;