import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import EditProfileDropdown from "./EditProfileDropdown";

const ProfileActions = ({ onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  const handleCreateContract = () => {
    navigate("/newContract"); // Use navigate for routing
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="relative flex space-x-4">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
        onClick={handleCreateContract}
      >
        Create Contract
      </button>
      <div className="relative">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 flex items-center"
          onClick={handleToggleDropdown}
        >
          Edit Profile
          <svg
            className="ml-2 w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isDropdownOpen && <EditProfileDropdown />}
      </div>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

ProfileActions.propTypes = {
  onLogout: PropTypes.func,
};

export default ProfileActions;
