// ./components/EditProfileButton.jsx

import React, { useState } from "react";
import PropTypes from "prop-types";

function EditProfileButton() {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div>
      <button
        onClick={handleEditClick}
        className="bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        Edit Profile
      </button>

      {isEditing && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <div className="mt-4">
            <label className="block text-gray-700">Profile Picture</label>
            <input
              type="file"
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              placeholder="Update Location"
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Contact No.</label>
            <input
              type="text"
              placeholder="Contact No."
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfileButton;
