// import React, { useState, useRef } from 'react';
// import { Camera, Upload, X } from 'lucide-react';

// export const ImageUpload = ({
//   currentImage,
//   onImageChange,
//   className = '',
// }) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef(null);

//   const handleFileSelect = (file) => {
//     if (file && file.type.startsWith('image/')) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const result = e.target?.result;
//         onImageChange(result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const file = e.dataTransfer.files[0];
//     if (file) {
//       handleFileSelect(file);
//     }
//   };

//   const handleFileInputChange = (e) => {
//     const file = e.target.files?.[0];
//     console.log(file, 'file');
//     if (file) {
//       handleFileSelect(file);
//     }
//   };

//   const handleRemoveImage = () => {
//     onImageChange('');
//   };

//   const handleUploadImage = () => {
//     fileInputRef.current?.click()
//     // const file = e.target.files?.[0];
//     // console.log(file, 'file!!');
//   }

//   return (
//     <div className={`relative ${className}`}>
//       {currentImage ? (
//         <div className="relative group">
//           <img
//             src={currentImage}
//             alt="Profile"
//             className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
//           />
//           <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//             <button
//               onClick={handleUploadImage}
//               className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition-colors duration-200 mr-2"
//             >
//               <Camera size={20} />
//             </button>
//             <button
//               onClick={handleRemoveImage}
//               className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition-colors duration-200"
//             >
//               <X size={20} />
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//           onClick={() => fileInputRef.current?.click()}
//           className={`w-32 h-32 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center cursor-pointer transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 ${isDragging ? 'border-blue-500 bg-blue-50' : ''
//             }`}
//         >
//           <div className="text-center">
//             <Upload size={24} className="mx-auto text-gray-400 mb-2" />
//             <p className="text-xs text-gray-500">Upload Photo</p>
//           </div>
//         </div>
//       )}
//       <input
//         ref={fileInputRef}
//         type="file"
//         accept="image/*"
//         onChange={(e)=>handleFileInputChange(e)}
//         className="hidden"
//       />
//     </div>
//   );
// };

// // import { useState } from 'react'
// // import Cropper from 'react-easy-crop'
// // import pratyashu from '../../../assets/imgs/advisers/pratyush.jpeg'

// // const ImageUpload = () => {
// //   const [crop, setCrop] = useState({ x: 0, y: 0 })
// //   const [zoom, setZoom] = useState(1)
// //   const onCropComplete = (croppedArea, croppedAreaPixels) => {
// //     console.log(croppedArea, croppedAreaPixels)
// //   }
// //   return (
// //     <div className="App">
// //       <div className="crop-container">
// //         <Cropper
// //           image={pratyashu}
// //           crop={crop}
// //           zoom={zoom}
// //           aspect={4 / 3}
// //           onCropChange={setCrop}
// //           onCropComplete={onCropComplete}
// //           onZoomChange={setZoom}
// //         />
// //       </div>
// //       <div className="controls">
// //         <input
// //           type="range"
// //           value={zoom}
// //           min={1}
// //           max={3}
// //           step={0.1}
// //           aria-labelledby="Zoom"
// //           onChange={(e) => {
// //             setZoom(e.target.value)
// //           }}
// //           className="zoom-range"
// //         />
// //       </div>
// //     </div>
// //   )
// // }

// // export default ImageUpload

import { Camera, X } from "lucide-react";
import { useRef, useState } from "react";

const ImageUpload = ({ currentImage, setFile }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(currentImage);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file,'bhnjkm');
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file)); // 👈 create preview URL
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreview(currentImage);
  };

  return (
    <div className="relative group">
      <img
        src={preview}
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => fileInputRef.current.click()}
          className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition-colors duration-200 mr-2"
        >
          <Camera size={20} />
        </button>
        <button
          onClick={handleRemoveImage}
          className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition-colors duration-200"
        >
          <X size={20} />
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;

