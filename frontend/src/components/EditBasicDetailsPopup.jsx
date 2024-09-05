import React, { useState, useEffect, useRef } from "react";

const EditBasicDetailsPopup = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [contactNo, setContactNo] = useState("");
  const popupRef = useRef(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleContactNoChange = (e) => {
    setContactNo(e.target.value);
  };

  const handleUpdate = () => {
    // Add update logic here
    // alert("Basic details updated");
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
        <h2 className="text-xl font-semibold mb-4">Edit Basic Details</h2>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Username"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          value={contactNo}
          onChange={handleContactNoChange}
          placeholder="Contact No."
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <button
          onClick={handleUpdate}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Update
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

export default EditBasicDetailsPopup;
