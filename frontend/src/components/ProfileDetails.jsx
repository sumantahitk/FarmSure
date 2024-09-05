import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileDetails = () => {
  const [profile, setProfile] = useState({
    name: "",
    role: "",
    location: "",
    profileImage: "",
  });

  useEffect(() => {
    // Function to fetch profile data from the backend
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/user/profile"); // Replace with your API endpoint
        setProfile(response.data); // Assuming the response contains the profile details
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex items-center">
      {profile.profileImage ? (
        <img
          src={profile.profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-4xl text-gray-600">
          😊
        </div>
      )}
      <div className="ml-4">
        <h1 className="text-2xl font-bold">{profile.name || "User Name"}</h1>
        <p className="text-black">{profile.role || "Role"}</p>
        <p className="text-black">{profile.location || "Location"}</p>
      </div>
    </div>
  );
};

export default ProfileDetails;
