import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateForm = memo(({ className = "" }) => {
  const [cropName, setCropName] = useState("");
  const [finalQuantity, setFinalQuantity] = useState("");
  // const [email, setEmail] = useState("");
  const [finalPricePerUnit, setFinalPricePerUnit] = useState("");
  const [finalDeliveryDate, setFinalDeliveryDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use the navigate hook

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form data
    if (!cropName || !finalQuantity || !finalPricePerUnit || !finalDeliveryDate) {
      setError("All fields except description are required.");
      return;
    }

    const formData = {
      cropName,
      finalQuantity,
      // email,
      finalPricePerUnit,
      finalDeliveryDate,
      description,
    };

    setLoading(true);
    setError("");

    try {
      await axios.post(
        "http://localhost:8800/contract/66d549d0547cebee327ed47f/create",
        formData,
        {
          headers: {
            'Content-Type': 'application/json', // Adjust content type if needed
          },
          withCredentials: true
        }
      );

      // Redirect to home page after successful update
      navigate("/"); // Redirect to the home page
    } catch (err) {
      // Handle error response
      console.error('Update error:', err);
      setError("Failed to update the contract. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`relative bg-[url('/public/divelementorwidgetwrap@3x.png')] bg-cover bg-no-repeat bg-top rounded-xl text-center text-sm text-gray-200 font-manrope ${className} p-4 md:p-6 lg:p-8`}
    >
      <form className="mx-auto max-w-md w-full p-6" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-extrabold text-gray-300 text-left mb-4">
          Update Contract
        </h2>
        <p className="text-lg font-medium text-goldenrod-200 text-left mb-8">
          Time to buy stuff?
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="rounded-xl bg-white border border-primary w-full h-12 flex items-center mb-4">
          <input
            className="w-full bg-transparent text-black-600 outline-none px-4"
            placeholder="Crop Name"
            type="text"
            value={cropName}
            onChange={(e) => setCropName(e.target.value)}
          />
        </div>

        <div className="rounded-xl bg-white border border-primary w-full h-12 flex items-center mb-4">
          <input
            className="w-full bg-transparent text-black-600 outline-none px-4"
            placeholder="Quantity (in kg)"
            type="number"
            value={finalQuantity}
            onChange={(e) => setFinalQuantity(e.target.value)}
          />
        </div>

        {/* <div className="rounded-xl bg-white border border-primary w-full h-12 flex items-center mb-4">
          <input
            className="w-full bg-transparent text-black-600 outline-none px-4"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div> */}

        <div className="rounded-xl bg-white border border-primary w-full h-12 flex items-center mb-4">
          <input
            className="w-full bg-transparent text-black-600 outline-none px-4"
            placeholder="Proposed Price (per unit)"
            type="number"
            value={finalPricePerUnit}
            onChange={(e) => setFinalPricePerUnit(e.target.value)}
          />
        </div>

        <div className="rounded-xl bg-white border border-primary w-full h-12 flex items-center mb-4">
          <input
            className="w-full bg-transparent text-black-600 outline-none px-4"
            placeholder="Delivery Date (dd/mm/yyyy)"
            type="date"
            value={finalDeliveryDate}
            onChange={(e) => setFinalDeliveryDate(e.target.value)}
          />
        </div>

        <div className="rounded-xl bg-white border border-primary w-full h-12 flex items-center mb-4">
          <input
            className="w-full bg-transparent text-black-600 outline-none px-4"
            placeholder="Description (optional)"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-3/5 bg-primary rounded-xl h-10 flex items-center justify-center mb-6 cursor-pointer"
          disabled={loading}
        >
          <div className="text-sm font-medium text-white">
            {loading ? "Updating..." : "Confirm Contract"}
          </div>
        </button>
      </form>
    </div>
  );
});

UpdateForm.propTypes = {
  className: PropTypes.string,
};

export default UpdateForm;
