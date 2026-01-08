"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

interface FeaturedImageUploadProps {
  value?: string;
  alt?: string;
  onChange: (url: string) => void;
  onAltChange: (alt: string) => void;
}

export default function FeaturedImageUpload({
  value,
  alt,
  onChange,
  onAltChange,
}: FeaturedImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = useCallback(
    async (file: File) => {
      setIsUploading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/admin/blog/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          alert(error.error || "Failed to upload image");
          return;
        }

        const data = await response.json();
        onChange(data.url);
      } catch {
        alert("Failed to upload image");
      } finally {
        setIsUploading(false);
      }
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        handleUpload(file);
      }
    },
    [handleUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleUpload(file);
      }
    },
    [handleUpload]
  );

  const handleDelete = useCallback(async () => {
    if (!value) return;

    setIsDeleting(true);

    try {
      const response = await fetch("/api/admin/blog/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: value }),
      });

      if (!response.ok) {
        console.error("Failed to delete image from Cloudinary");
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      onChange("");
      setIsDeleting(false);
    }
  }, [value, onChange]);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-slate-700">
        Featured Image
      </label>

      {value ? (
        <div className="space-y-4">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100">
            <Image
              src={value}
              alt={alt || "Featured image"}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="absolute top-2 right-2 p-2 bg-white/90 rounded-lg hover:bg-white transition-colors disabled:opacity-50"
            >
              {isDeleting ? (
                <div className="w-4 h-4 border-2 border-slate-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg
                  className="w-4 h-4 text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Alt Text
            </label>
            <input
              type="text"
              value={alt || ""}
              onChange={(e) => onAltChange(e.target.value)}
              placeholder="Describe the image..."
              className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-[#5b21b6] focus:ring-2 focus:ring-[#5b21b6]/20 outline-none transition-all"
            />
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            isDragging
              ? "border-[#5b21b6] bg-[#5b21b6]/5"
              : "border-slate-300 hover:border-slate-400"
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-[#5b21b6] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-slate-600">Uploading...</p>
            </div>
          ) : (
            <>
              <svg
                className="w-12 h-12 text-slate-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm text-slate-600 mb-2">
                Drag and drop an image, or{" "}
                <label className="text-[#5b21b6] cursor-pointer hover:underline">
                  browse
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </p>
              <p className="text-xs text-slate-500">
                JPEG, PNG, GIF, WebP up to 5MB
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
