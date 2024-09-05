import React, { useState, useEffect, useRef } from "react";

const EditProfileImagePopup = ({ onClose }) => {
  const [profileImage, setProfileImage] = useState(null);
  const popupRef = useRef(null);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleUpload = () => {
    // Add upload logic here
    // alert("Profile image uploaded");
    onClose();
  };

  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    // Add click event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Clean up event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[3]">
      {/* Background overlay with blur effect */}
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 blur-background"></div>
      
      {/* Popup content */}
      <div ref={popupRef} className="bg-white p-6 rounded shadow-lg z-[4]">
        <h2 className="text-xl font-semibold mb-4">Edit Profile Image</h2>
        <input
          type="file"
          onChange={handleImageChange}
          className="mb-4"
        />
        <button
          onClick={handleUpload}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Upload
        </button>
        <button
          onClick={onClose}
          className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EditProfileImagePopup;
