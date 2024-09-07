import React, { useState } from "react";
import EditProfileImagePopup from "./EditProfileImagePopup";
import EditAddressPopup from "./EditAddressPopup";
import EditBasicDetailsPopup from "./EditBasicDetailsPopup";

const EditProfileDropdown = () => {
  const [popup, setPopup] = useState(null);
  const [isDropdownVisible, setDropdownVisible] = useState(true);

  const handleOpenPopup = (type) => {
    setPopup(type);
    setDropdownVisible(false); // Hide the dropdown when a button is clicked
  };

  const handleClosePopup = () => {
    setPopup(null);
    setDropdownVisible(true); // Show the dropdown when the popup is closed
  };

  return (
    <>
      {isDropdownVisible && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 shadow-lg rounded-md w-48 z-[2]">
          <ul className="py-2">
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleOpenPopup("image")}
              >
                Edit Profile Image
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleOpenPopup("address")}
              >
                Edit Address
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleOpenPopup("details")}
              >
                Edit Basic Details
              </button>
            </li>
          </ul>
        </div>
      )}
      
      {/* Render popups */}
      {popup === "image" && (
        <EditProfileImagePopup onClose={handleClosePopup} />
      )}
      {popup === "address" && (
        <EditAddressPopup onClose={handleClosePopup} />
      )}
      {popup === "details" && (
        <EditBasicDetailsPopup onClose={handleClosePopup} />
      )}
    </>
  );
};

export default EditProfileDropdown;
