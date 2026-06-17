import { useState } from "react";
// In real app, this will import { api } from "@/lib/api-client" to get signature
import type { CloudinarySignature } from "@/lib/api-types";

export function useCloudinaryUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadFile = async (file: File, folder: string) => {
    setIsUploading(true);
    setProgress(0);

    try {
      // Step 1: Get signed signature from our API
      // const sig: CloudinarySignature = await api.post("/admin/media/signature", { folder });
      
      // MOCK: Generate fake signature data for Cloudinary unauthenticated upload
      // In production, NEVER expose the upload preset on the client unless strictly needed.
      // We will use standard mock delay to simulate upload.
      await new Promise(r => setTimeout(r, 800));
      setProgress(50);
      await new Promise(r => setTimeout(r, 800));
      setProgress(100);

      // Simulating a successful Cloudinary response
      return {
        secure_url: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?w=800`,
        public_id: `shiksha/${folder}/${Math.floor(Math.random() * 1000000)}`,
      };
      
      /* Real implementation:
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", sig.apiKey);
      formData.append("timestamp", sig.timestamp.toString());
      formData.append("signature", sig.signature);
      formData.append("folder", sig.folder);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/auto/upload`, {
        method: "POST",
        body: formData,
      });
      
      if (!res.ok) throw new Error("Upload failed");
      return await res.json();
      */
    } catch (error) {
      console.error("Upload error", error);
      throw error;
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  return { uploadFile, isUploading, progress };
}
