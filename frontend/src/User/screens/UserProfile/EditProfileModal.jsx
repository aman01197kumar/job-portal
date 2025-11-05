import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  User,
  Mail,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Briefcase,
  Building,
  Calendar,
  Locate,
} from "lucide-react";
import { TechStackDropdown } from "./TechStackDropdown";
import ImageUpload from "./ImageUpload";
import { useGeolocated } from "react-geolocated";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { END_POINTS } from "../../../assets/END_POINTS";

export const EditProfileModal = ({ user, isOpen, onClose, userId, token }) => {
  const [formData, setFormData] = useState(user);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: { enableHighAccuracy: true },
      userDecisionTimeout: 10000,
    });

  const GEO_LOCATION_API_KEY = import.meta.env.VITE_GEO_LOCATION_API_KEY;

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTechStackChange = (techStack) => {
    setFormData((prev) => ({
      ...prev,
      techStack,
    }));
  };

  const handleImageSelect = (file, base64Image) => {
    setFormData((prev) => ({
      ...prev,
      image: file, // actual File object for upload
      imagePreview: base64Image, // optional, for showing preview
    }));
  };

  const handleUseCurrentLocation = async () => {
    if (!isGeolocationAvailable) {
      alert("Your browser does not support Geolocation.");
      return;
    }
    if (!isGeolocationEnabled) {
      alert("Please enable location services.");
      return;
    }

    if (coords) {
      const lat = coords.latitude.toFixed(4);
      const lng = coords.longitude.toFixed(4);

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GEO_LOCATION_API_KEY}`
      );

      const address = response?.data?.results[0]?.formatted_address.split(" ");
      const requiredAddress =
        address && address[6] + "" + address[7] + "," + address[9];

      setFormData((prev) => ({
        ...prev,
        location: requiredAddress,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();

      // append text fields
      formDataToSend.append("bio", formData.bio || "");
      formDataToSend.append("location", formData.location || "");
      formDataToSend.append("website", formData.website || "");
      formDataToSend.append("github", formData.github || "");
      formDataToSend.append("linkedIn", formData.linkedIn || "");
      formDataToSend.append("jobTitle", formData.jobTitle || "");
      formDataToSend.append("company", formData.company || "");
      formDataToSend.append(
        "yearsOfExperience",
        formData.yearsOfExperience || ""
      );
      formDataToSend.append(
        "availabilityStatus",
        formData.availabilityStatus || ""
      );
      for (let i = 0; i < formData.techStack.length; i++) {
        formDataToSend.append(`techStack[${i}]`, formData.techStack[i]);
      }

      // append files (make sure you're setting them in state correctly)
      if (formData.image) formDataToSend.append("image", formData.image);
      if (formData.resume) formDataToSend.append("resume", formData.resume);

      const response = await axios.put(
        `${BASE_URL}/${END_POINTS.UPDATE_USER_PROFILE}/${userId}`,
        formDataToSend
      );

      toast.success(response?.data?.message);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <h3 className="text-2xl font-bold text-gray-900">Edit Profile</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white hover:bg-opacity-50 rounded-full transition-all duration-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Profile Image */}
            <div className="flex justify-center pb-6 border-b border-gray-100">
              <ImageUpload
                currentImage={
                  formData.imagePreview || `${BASE_URL}/${formData.profile_img}`
                }
                onImageSelect={handleImageSelect}
              />
            </div>

            {/* Basic Information */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                <User size={20} className="mr-2 text-blue-500" />
                Basic Information
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={formData.username || ""}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail size={16} className="inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email || ""}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin size={16} className="inline mr-2" />
                    Location
                  </label>

                  <input
                    type="text"
                    value={formData.location || ""}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="Enter location"
                  />

                  <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    className="flex items-center mt-2 text-sm text-blue-500 hover:underline"
                  >
                    <Locate className="w-4 h-4 mr-1" />
                    Use current location
                  </button>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                <Briefcase size={20} className="mr-2 text-blue-500" />
                Professional Information
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={formData.jobTitle || ""}
                    onChange={(e) =>
                      handleInputChange("jobTitle", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="Enter job title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building size={16} className="inline mr-2" />
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company || ""}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar size={16} className="inline mr-2" />
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    value={formData.yearsOfExperience || 0}
                    onChange={(e) =>
                      handleInputChange(
                        "yearsOfExperience",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    min="0"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability Status
                  </label>
                  <select
                    value={formData.availabilityStatus || "available"}
                    onChange={(e) =>
                      handleInputChange("availabilityStatus", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">About</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.bio || ""}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                <Globe size={20} className="mr-2 text-blue-500" />
                Social Links
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.website || ""}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Github size={16} className="inline mr-2" />
                    GitHub
                  </label>
                  <input
                    type="text"
                    value={formData.github || ""}
                    onChange={(e) =>
                      handleInputChange("github", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Linkedin size={16} className="inline mr-2" />
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    value={formData.linkedIn || ""}
                    onChange={(e) =>
                      handleInputChange("linkedin", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="username"
                  />
                </div>
              </div>
            </div>

            {/* Tech Stacks */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">
                Tech Stacks
              </h4>
              <TechStackDropdown
                onSelectionChange={handleTechStackChange}
                profileTechStacks={user.techStack}
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-all duration-200 flex items-center font-medium shadow-lg hover:shadow-xl"
          >
            <Save size={16} className="mr-2" />
            Save Changes
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};
