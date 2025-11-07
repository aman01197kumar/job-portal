import React, { useRef, useState, useCallback } from "react";
import { Camera, X } from "lucide-react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop({ unit: "%", width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  );
}

const ImageUpload = ({ currentImage, onImageSelect }) => {
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  const [preview, setPreview] = useState(currentImage || null);
  const [hovered, setHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [showCrop, setShowCrop] = useState(false);

  const handleFileSelect = (e) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
      setShowCrop(true);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1)); // square aspect
  };

  const finalizeCrop = useCallback(() => {
    if (!completedCrop || !imgRef.current || !canvasRef.current) return;

    const image = imgRef.current;
    const canvas = canvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio || 1;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL("image/jpeg");
    setPreview(base64Image);
    setShowCrop(false);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const croppedFile = new File([blob], "cropped.jpg", {
        type: "image/jpeg",
      });
      if (onImageSelect) onImageSelect(croppedFile, base64Image);
    }, "image/jpeg");
  }, [completedCrop, onImageSelect]);

  const handleRemove = (e) => {
    e.preventDefault();
    setPreview(null);
    if (onImageSelect) onImageSelect(null, null);
  };

  return (
    <>
      <div
        className="relative w-32 h-32 group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={preview || "/default-avatar.png"}
          alt="Profile"
          className="w-full h-full rounded-full object-cover border border-gray-300"
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileSelect}
        />

        {hovered && (
          <div className="absolute inset-0 bg-black/70 rounded-full flex items-center justify-center gap-4 transition-all">
            <button
              type="button"
              onClick={(e) => {
                // e.preventDefault();
                fileInputRef.current.click();
              }}
              className="flex items-center gap-1 text-white text-2xl rounded-full shadow cursor-pointer hover:bg-white/80 hover:p-2 transition-all"
            >
              <Camera size={30} />
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center text-red-600 rounded-full shadow cursor-pointer hover:bg-white/80 hover:p-2 transition-all"
            >
              <X size={30} />
            </button>
          </div>
        )}
      </div>

      {/* Crop Modal */}
      {showCrop && (
        <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50 p-4">
          <div className="bg-white p-auto rounded-xl shadow-lg flex flex-col items-center overflow-auto max-h-[90vh] max-w-[65vw]">
            <h3 className="mb-3 font-semibold text-gray-700">
              Crop your image
            </h3>

            {selectedImage && (
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1}
              >
                <img
                  ref={imgRef}
                  alt="Crop target"
                  src={selectedImage}
                  onLoad={onImageLoad}
                  className="max-w-[90vw] max-h-[70vh] object-contain"
                />
              </ReactCrop>
            )}

            <div className="flex gap-4 mt-4 fixed bottom-10 z-index-5000">
              <button
                type="button"
                onClick={() => setShowCrop(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 rounded-2xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  finalizeCrop();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700  cursor-pointer"
              >
                Finalize Crop
              </button>
            </div>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
    </>
  );
};

export default ImageUpload;
