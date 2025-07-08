import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X, User, Shirt } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  title: string;
  description: string;
  accept: string;
  onImageUpload: (file: File) => void;
  uploadedImage: File | null;
  placeholder: "model" | "saree";
}

const ImageUpload = ({
  title,
  description,
  accept,
  onImageUpload,
  uploadedImage,
  placeholder,
}: ImageUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      onImageUpload(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer hover:border-primary/50",
            dragActive ? "border-primary bg-primary/5" : "border-border",
            preview ? "border-solid" : ""
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
          />

          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
              <Button
                size="sm"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 mb-4 text-muted-foreground">
                {placeholder === "model" ? (
                  <User className="w-full h-full" />
                ) : (
                  <Shirt className="w-full h-full" />
                )}
              </div>
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <div className="text-sm">
                  <span className="font-medium text-primary">Click to upload</span>
                  <span className="text-muted-foreground"> or drag and drop</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, JPEG up to 10MB
                </p>
              </div>
            </div>
          )}
        </div>

        {uploadedImage && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <p className="font-medium truncate">{uploadedImage.name}</p>
                <p className="text-muted-foreground">
                  {(uploadedImage.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageUpload;