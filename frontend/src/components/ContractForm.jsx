import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ContractForm = memo(({ className = "" }) => {
  const [cropName, setCropName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form data
    if (!cropName || !quantity || !pricePerUnit || !deliveryDate) {
      setError("All fields except description are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8800/demand/createnew",
        {
          cropName,
          quantity,
          pricePerUnit,
          deliveryDate,
          description
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true
        }
      );

      // Handle successful response
      console.log(response.data);

      // Redirect to home page after successful demand creation
      navigate("/"); // Navigate to home or another desired route
    } catch (err) {
      // Handle error response
      if (err.response) {
        console.error('Error response:', err.response.data);
        setError(err.response.data.message || 'Failed to create contract. Please try again.');
      } else if (err.request) {
        setError("No response received from server.");
      } else {
        setError(`Error: ${err.message}`);
      }
      console.error(err);
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
          Create Contract
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
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="flex">
          <div className="rounded-xl bg-white border border-primary w-full h-12 flex items-center mb-4">
            <input
              className="w-full bg-transparent text-black-600 outline-none px-4"
              placeholder="Price per Unit"
              type="number"
              value={pricePerUnit}
              onChange={(e) => setPricePerUnit(e.target.value)}
            />
          </div>
          <button className="w-20 bg-primary rounded-xl h-10 flex items-center justify-center ml-2 cursor-pointer">
            <div className="text-sm font-medium text-white">Ask AI</div>
          </button>
        </div>

        <div className="rounded-xl bg-white border border-primary w-full h-12 flex items-center mb-4">
          <input
            className="w-full bg-transparent text-black-600 outline-none px-4"
            placeholder="Delivery Date (dd/mm/yyyy)"
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
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
          className="w-2/5 bg-primary rounded-xl h-10 flex items-center justify-center mb-6 cursor-pointer"
          disabled={loading}
        >
          <div className="text-sm font-medium text-white">
            {loading ? "Creating Contract..." : "Create Contract"}
          </div>
        </button>
      </form>
    </div>
  );
});

ContractForm.propTypes = {
  className: PropTypes.string,
};

export default ContractForm;
