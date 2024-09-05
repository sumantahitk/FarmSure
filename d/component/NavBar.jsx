import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State to toggle mobile menu

  const handleMarketplaceClick = async () => {
    try {
      const response = await axios.get("http://localhost:8800/demand/alldemand", { withCredentials: true });

      if (response.status === 200) {
        navigate("/marketplace", { state: { results: response.data.suggestions || response.data.demands } });
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (err) {
      console.error("Error fetching marketplace demands:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8800/user/logout", { withCredentials: true });
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleNotificationsClick = () => {
    navigate("/notifications");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the state for the mobile menu
  };

  return (
    <nav className="top-0 left-0 w-full bg-grey-scale-white text-gray-200 font-manrope z-50 px-4 py-2 md:py-4">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto space-x-4">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <img
            src="/link--logo--logo2xpng@3x.png"
            alt="Logo"
            className="h-10 md:h-12 w-auto"
          />
        </a>

        {/* Hamburger Menu for mobile (visible on small screens) */}
        <div className="md:hidden flex-grow flex justify-end">
          <button
            className="text-gray-200 focus:outline-none focus:text-gray-400"
            aria-label="Toggle menu"
            onClick={toggleMenu} // Toggle the menu on click
          >
            {/* Hamburger Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links for larger screens */}
        <div className="hidden md:flex flex-grow justify-center space-x-4 md:space-x-8">
          <a href="/" className="font-semibold hover:text-green-900">
            Home
          </a>
          <a
            onClick={handleMarketplaceClick}
            className="font-semibold cursor-pointer hover:text-green-900"
          >
            Marketplace
          </a>
          <a href="/profile" className="font-semibold hover:text-green-900">
            Profile
          </a>
          <a href="/about-us" className="font-semibold hover:text-green-900">
            About Us
          </a>
          <a href="#faqs" className="font-semibold hover:text-green-900">
            FAQs
          </a>
        </div>

        {/* Social Icons & Logout Button (Visible on larger screens) */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Notification Button */}
          <button
            onClick={handleNotificationsClick}
            className="relative text-gray-200 hover:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.158c0 .538-.214 1.055-.595 1.437L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
              {/* Number of notifications (example) */}
            </span>
          </button>

          {/* GitHub Button */}
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <img src="/github@2x.png" alt="GitHub" className="w-6 h-6" />
          </a>

          {/* LinkedIn Button */}
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <img src="/linkedin-2@2x.png" alt="LinkedIn" className="w-6 h-6" />
          </a>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile menu (visible when the hamburger is clicked) */}
      {isOpen && (
        <div className="md:hidden mt-4">
          <div className="flex flex-col space-y-4 text-center">
            <a href="/" className="font-semibold hover:text-green-900">
              Home
            </a>
            <a
              onClick={handleMarketplaceClick}
              className="font-semibold cursor-pointer hover:text-green-900"
            >
              Marketplace
            </a>
            <a href="/profile" className="font-semibold hover:text-green-900">
              Profile
            </a>
            <a href="/about-us" className="font-semibold hover:text-green-900">
              About Us
            </a>
            <a href="#faqs" className="font-semibold hover:text-green-900">
              FAQs
            </a>

            {/* Social Icons in mobile menu */}
            <div className="flex justify-center space-x-4">
              {/* Notification Button */}
              <button
                onClick={handleNotificationsClick}
                className="relative text-gray-200 hover:text-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="                     0 24 24"
                     stroke="currentColor"
                     strokeWidth={2}
                   >
                     <path
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.158c0 .538-.214 1.055-.595 1.437L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                     />
                   </svg>
                   <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                     {/* Number of notifications (example) */}
                   </span>
                 </button>

                 {/* GitHub Button */}
                 <a href="https://github.com" target="_blank" rel="noreferrer">
                   <img src="/github@2x.png" alt="GitHub" className="w-6 h-6" />
                 </a>

                 {/* LinkedIn Button */}
                 <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                   <img src="/linkedin-2@2x.png" alt="LinkedIn" className="w-6 h-6" />
                 </a>
               </div>

               {/* Logout Button */}
               <button
                 onClick={handleLogout}
                 className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
               >
                 Logout
               </button>
             </div>
           </div>
         )}
       </nav>
     );
   };

   export default Navbar;

