import React, { useState, useEffect, useRef } from "react";

const EditAddressPopup = ({ onClose }) => {
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const popupRef = useRef(null);

  const handleUpdate = () => {
    // Add update logic here
    // alert("Address updated");
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
        <h2 className="text-xl font-semibold mb-4">Edit Address</h2>
        <input
          type="text"
          value={addressLine1}
          onChange={(e) => setAddressLine1(e.target.value)}
          placeholder="Address Line 1"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          value={addressLine2}
          onChange={(e) => setAddressLine2(e.target.value)}
          placeholder="Address Line 2"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
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

export default EditAddressPopup;
