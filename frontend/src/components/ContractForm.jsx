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
<<<<<<< HEAD
  const [image, setImage] = useState(null); // State for image file
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

=======
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
>>>>>>> 820ced786928888f2c8abd56ea4bab4e835cad61
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form data
    if (!cropName || !quantity || !pricePerUnit || !deliveryDate) {
      setError("All fields except description are required.");
      return;
    }

<<<<<<< HEAD
    // Proceed with form submission
    handleFormSubmit();
  };

  const handleFormSubmit = async () => {
    setLoading(true);
    setError("");

    const formData = new FormData(); // Create FormData for file upload
    formData.append("cropName", cropName);
    formData.append("quantity", quantity);
    formData.append("pricePerUnit", pricePerUnit);
    formData.append("deliveryDate", deliveryDate);
    formData.append("description", description);
    if (image) {
      formData.append("image", image); // Add image to FormData
    }

    try {
      const response = await axios.post(
        "http://localhost:8800/demand/createnew",
        formData, // Send FormData object
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
=======
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
>>>>>>> 820ced786928888f2c8abd56ea4bab4e835cad61
        }
      );

      // Handle successful response
      console.log(response.data);

      // Redirect to home page after successful demand creation
      navigate("/"); // Navigate to home or another desired route
    } catch (err) {
      // Handle error response
      if (err.response) {
<<<<<<< HEAD
        console.error("Error response:", err.response.data);
        setError(
          err.response.data.message ||
            "Failed to create contract. Please try again."
        );
=======
        console.error('Error response:', err.response.data);
        setError(err.response.data.message || 'Failed to create contract. Please try again.');
>>>>>>> 820ced786928888f2c8abd56ea4bab4e835cad61
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
<<<<<<< HEAD
            disabled={loading} // Disable input during loading
=======
>>>>>>> 820ced786928888f2c8abd56ea4bab4e835cad61
          />
        </div>

        <div className="rounded-xl bg-white border border-primary w-full h-12 flex items-center mb-4">
          <input
            className="w-full bg-transparent text-black-600 outline-none px-4"
            placeholder="Quantity (in kg)"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
<<<<<<< HEAD
            disabled={loading} // Disable input during loading
=======
>>>>>>> 820ced786928888f2c8abd56ea4bab4e835cad61
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
<<<<<<< HEAD
              disabled={loading} // Disable input during loading
            />
          </div>
          <button
            className="w-20 bg-primary rounded-xl h-10 flex items-center justify-center ml-2 cursor-pointer"
            type="button"
            disabled={loading} // Disable button during loading
          >
=======
            />
          </div>
          <button className="w-20 bg-primary rounded-xl h-10 flex items-center justify-center ml-2 cursor-pointer">
>>>>>>> 820ced786928888f2c8abd56ea4bab4e835cad61
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
<<<<<<< HEAD
            disabled={loading} // Disable input during loading
          />
        </div>

        {/* Image Upload Input - moved above description */}
        <div className="rounded-xl bg-white border border-primary w-full h-12 flex items-center mb-4">
          <input
            className="w-full bg-transparent text-black-600 outline-none px-4"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])} // Set image file
            disabled={loading} // Disable input during loading
=======
>>>>>>> 820ced786928888f2c8abd56ea4bab4e835cad61
          />
        </div>

        <div className="rounded-xl bg-white border border-primary w-full h-12 flex items-center mb-4">
          <input
            className="w-full bg-transparent text-black-600 outline-none px-4"
            placeholder="Description (optional)"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
<<<<<<< HEAD
            disabled={loading} // Disable input during loading
=======
>>>>>>> 820ced786928888f2c8abd56ea4bab4e835cad61
          />
        </div>

        <button
          type="submit"
          className="w-2/5 bg-primary rounded-xl h-10 flex items-center justify-center mb-6 cursor-pointer"
<<<<<<< HEAD
          disabled={loading} // Disable button during loading
=======
          disabled={loading}
>>>>>>> 820ced786928888f2c8abd56ea4bab4e835cad61
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
