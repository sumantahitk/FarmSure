import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Add useNavigate hook

const ContractPop = ({ crop, onClose }) => {
  const [contactVisible, setContactVisible] = useState(false);
  const popupRef = useRef();
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleNegotiateClick = () => {
    setContactVisible(!contactVisible);
  };

  // Format address into a single line
  const formattedAddress = [
    crop.buyerAddress?.addressLine1,
    crop.buyerAddress?.addressLine2,
    crop.buyerAddress?.city,
    crop.buyerAddress?.state,
    crop.buyerAddress?.country
  ].filter(Boolean).join(", ");

  const handleSignDeal = () => {
    navigate("/updateContract", { state: { crop } }); // Navigate to update-contract with crop data
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
      <div
        ref={popupRef}
        className="relative bg-gray-100 rounded-lg p-8 w-4/5 max-w-4xl flex border-4 border-green-600 shadow-xl"
      >
        <button
          className="absolute top-4 right-4 text-gray-900 hover:text-gray-900 cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="w-1/3 pr-6">
          <img
            src={crop.image}
            alt={crop.cropName}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="w-2/3 flex flex-col">
          <h1 className="text-3xl font-extrabold text-gray-900 m-0">
            {crop.cropName}
          </h1>
          <p className="text-black mb-4 text-lg">
            <strong className="text-black">Quantity:</strong> {crop.quantity}
            <br />
            <strong className="text-black">Price per Unit:</strong> $
            {crop.pricePerUnit}
            <br />
            <strong className="text-black">Delivery Date:</strong>{" "}
            {new Date(crop.expectedDate).toLocaleDateString()}
            <br />
            <strong className="text-black">Description:</strong>{" "}
            {crop.description}
            <br />
            <strong className="text-black">Buyer:</strong> {crop.buyerId?.username || "N/A"}
            <br />
            <strong className="text-black">Location:</strong>{" "}
            {crop.buyerLocation}
            <br />
            <strong className="text-black">Address:</strong> {formattedAddress || "N/A"}
          </p>
          <div className="flex space-x-4 mt-6">
            {!contactVisible ? (
              <button
                className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg border-2 border-yellow-600 shadow-lg transform hover:scale-105 hover:bg-yellow-400 hover:border-yellow-500 transition ease-in-out duration-300"
                onClick={handleNegotiateClick}
              >
                Negotiate
              </button>

            ) : (
              <div
                className="bg-yellow-100 text-yellow-900 p-4 rounded-lg border-2 border-yellow-500 shadow-md flex items-center justify-center cursor-pointer hover:bg-yellow-200 transition ease-in-out duration-300"
                onClick={handleNegotiateClick}
              >
                <span className="font-semibold text-lg">Contact No: </span>
                <span className="text-lg ml-2">{crop.buyerContactNo || "N/A"}</span>
              </div>
            )}
            <button
              className="bg-green-600 text-white px-6 py-3 rounded-lg border-2 border-green-700 shadow-lg transform hover:scale-105 hover:bg-green-500 hover:border-green-600 transition ease-in-out duration-300"
              onClick={handleSignDeal} // Call handleSignDeal
            >
              Sign Deal
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractPop;
