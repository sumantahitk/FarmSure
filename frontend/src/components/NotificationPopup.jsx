import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const NotificationPopup = ({ contractId, notificationId, onClose }) => {
  const [contractDetails, setContractDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const popupRef = useRef(null); // Create a ref for the popup container

  useEffect(() => {
    const fetchContractDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/contract/${contractId}`, { withCredentials: true });
        setContractDetails(response.data.contract);
      } catch (err) {
        setError("Failed to fetch contract details.");
      } finally {
        setLoading(false);
      }
    };

    fetchContractDetails();

    // Event listener for closing the popup when clicking outside
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose(); // Close the popup if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [contractId, onClose]);

  const handleAccept = async () => {
    try {
      await axios.put(`http://localhost:8800/notification/response/${notificationId}`, {
        action: 'accept',
      }, { withCredentials: true });

      onClose(); // Close the popup after action
    } catch (err) {
      setError("Failed to accept the contract.");
    }
  };

  const handleReject = async () => {
    try {
      await axios.put(`http://localhost:8800/notification/response/${notificationId}`, {
        action: 'reject',
      }, { withCredentials: true });

      onClose(); // Close the popup after action
    } catch (err) {
      setError("Failed to reject the contract.");
    }
  };

  if (loading) {
    return <div>Loading contract details...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div ref={popupRef} className="bg-white p-6 rounded shadow-lg max-w-md w-full"> {/* Apply the ref to the popup */}
        <h2 className="text-xl font-bold mb-4">Contract Details</h2>
        {contractDetails && (
          <div>
            <p><strong>Crop Name:</strong> {contractDetails.cropName}</p>
            <p><strong>Farmer Name:</strong> {contractDetails.farmerName}</p>
            <p><strong>Buyer Name:</strong> {contractDetails.buyerName}</p>
            <p><strong>Final Quantity:</strong> {contractDetails.finalQuantity}</p>
            <p><strong>Final Price Per Unit:</strong> {contractDetails.finalPricePerUnit}</p>
            <p><strong>Total Price:</strong> {contractDetails.finalPrice}</p>
            <p><strong>Final Delivery Date:</strong> {new Date(contractDetails.finalDeliveryDate).toLocaleDateString()}</p>
          </div>
        )}
        <div className="flex justify-between mt-4">
          <button onClick={handleAccept} className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"> {/* Add cursor-pointer */}
            Accept
          </button>
          <button onClick={handleReject} className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"> {/* Add cursor-pointer */}
            Reject
          </button>
        </div>
        <button onClick={onClose} className="mt-4 bg-slate-400 text-black cursor-pointer px-4 py-2 rounded"> {/* Add cursor-pointer */}
          Close
        </button>
      </div>
    </div>
  );
};

export default NotificationPopup;
