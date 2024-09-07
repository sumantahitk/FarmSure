import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpForm = memo(({ className = "" }) => {
  const [userType, setUserType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [username, setUsername] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use the navigate hook

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validate form data
    if (!userType || !username || !contactNo || !email || !password) {
      setError("All fields are required.");
      return;
    }
  
    // Log form data
    const formData = new FormData();
    formData.append("userType", userType);
    formData.append("companyName", userType === "buyer" ? companyName : "");
    formData.append("username", username);
    formData.append("contactNumber", contactNo);
    formData.append("email", email);
    formData.append("password", password);
  
    setLoading(true);
    setError("");
  
    try {
      const response = await axios.post(
        "http://localhost:8800/user/register",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true
        }
      );
  
      // Handle successful response
      console.log(response.data);
  
      // Clear all fields after successful signup
      setUserType("");
      setCompanyName("");
      setUsername("");
      setContactNo("");
      setEmail("");
      setPassword("");
  
      // Redirect to home page after successful sign-up
      navigate("/");
    } catch (err) {
      // Handle error response
      if (err.response) {
        console.error('Error response:', err.response.data);
        if (err.response.status === 401) {
          setError("Unauthorized: Please check your credentials.");
        } else {
          setError(`Error: ${err.response.data.message || 'Failed to sign up. Please try again.'}`);
        }
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
        <h1 className="text-3xl font-extrabold text-gray-300 text-left mb-4">
          Sign Up
        </h1>
        <p className="text-lg font-medium text-goldenrod-200 text-left mb-8">
          Whoss.. let's go
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="rounded-xl bg-white border border-primary w-full h-12 flex items-center mb-4">
          <select
            className="w-full bg-transparent text-black-600 outline-none px-4"
            value={userType}
            onChange={handleUserTypeChange}
          >
            <option value="">Select your role</option>
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>

        {userType === "buyer" && (
          <div className="rounded-xl bg-white border border-primary w-full h-12 flex items-center mb-4">
            <input
              className="w-full bg-transparent text-black-600 outline-none px-4"
              placeholder="Company Name"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
        )}

        <div className="rounded-xl bg-white border border-primary w-full h-12 flex items-center mb-4">
          <input
            className="w-full bg-transparent text-black-600 outline-none px-4"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="rounded-xl bg-white border border-primary w-full h-12 flex items-center mb-4">
          <input
            className="w-full bg-transparent text-black-600 outline-none px-4"
            placeholder="Contact No."
            type="tel"
            pattern="[0-9]{10}"
            maxLength="10"
            title="Please enter a 10-digit phone number"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
          />
        </div>

        <div className="rounded-xl bg-white border border-primary w-full h-12 flex items-center mb-4">
          <input
            className="w-full bg-transparent text-black-600 outline-none px-4"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="rounded-xl bg-white border border-primary w-full h-12 flex items-center mb-4">
          <input
            className="w-full bg-transparent text-black-600 outline-none px-4"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-2/5 bg-primary rounded-xl h-10 flex items-center justify-center mb-6 cursor-pointer"
          disabled={loading}
        >
          <div className="text-sm font-medium text-white">
            {loading ? "Signing Up..." : "Sign Up"}
          </div>
        </button>
      </form>
      <span className="text-center text-black">
        Already have an account?{" "}
        <span>
          <a className="text-blue-600" href="/login">
            Log In
          </a>
        </span>
      </span>
    </div>
  );
});

SignUpForm.propTypes = {
  className: PropTypes.string,
};

export default SignUpForm;
