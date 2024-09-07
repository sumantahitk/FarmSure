import React from "react";
import ProfileDetails from "../components/ProfileDetails"; // Import the new ProfileDetails component
import ProfileActions from "../components/ProfileActions";
import ContractsTab from "../components/ContractsTab";

function Profile({ onLogout }) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center justify-between">
        <ProfileDetails /> {/* Use ProfileDetails here */}
        <ProfileActions onLogout={onLogout} />
      </div>
      <ContractsTab />
    </div>
  );
}

export default Profile;
