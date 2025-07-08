import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProcessingStep } from "./SareeVirtualTryOn";

interface ProcessingStepsProps {
  currentStep: ProcessingStep;
}

const steps = [
  { key: "uploading", label: "Uploading Images", description: "Preparing your images for processing" },
  { key: "segmenting", label: "Person Segmentation", description: "Isolating person from background" },
  { key: "pose-detection", label: "Pose Detection", description: "Analyzing body keypoints and posture" },
  { key: "garment-extraction", label: "Saree Extraction", description: "Extracting saree design and texture" },
  { key: "alignment", label: "Pose Alignment", description: "Aligning saree to your body pose" },
  { key: "blending", label: "Final Blending", description: "Creating realistic draping and fit" },
] as const;

const ProcessingSteps = ({ currentStep }: ProcessingStepsProps) => {
  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.key === currentStep);
  };

  const isStepComplete = (stepIndex: number) => {
    return stepIndex < getCurrentStepIndex();
  };

  const isStepCurrent = (stepIndex: number) => {
    return stepIndex === getCurrentStepIndex();
  };

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div
          key={step.key}
          className={cn(
            "flex items-start gap-3 p-3 rounded-lg transition-all",
            isStepCurrent(index) && "bg-primary/5 border border-primary/20",
            isStepComplete(index) && "bg-muted/50"
          )}
        >
          <div className={cn(
            "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5",
            isStepComplete(index) && "bg-primary text-primary-foreground",
            isStepCurrent(index) && "bg-primary/20 text-primary",
            !isStepComplete(index) && !isStepCurrent(index) && "bg-muted text-muted-foreground"
          )}>
            {isStepComplete(index) ? (
              <Check className="h-4 w-4" />
            ) : isStepCurrent(index) ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <span className="text-xs font-medium">{index + 1}</span>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className={cn(
              "font-medium text-sm",
              isStepCurrent(index) && "text-primary",
              isStepComplete(index) && "text-foreground",
              !isStepComplete(index) && !isStepCurrent(index) && "text-muted-foreground"
            )}>
              {step.label}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcessingSteps;