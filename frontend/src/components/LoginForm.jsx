import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = memo(({ className = "" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use the navigate hook

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form data
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8800/user/login", // Replace with your backend login URL
        {
          email,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true // If you need to send cookies
        }
      );

      // Handle successful response
      console.log(response.data);
      
      // Redirect to home page after successful login
      navigate("/"); // Redirect to home page or any other page you want
    } catch (err) {
      // Handle error response
      if (err.response) {
        console.error('Error response:', err.response.data);
        setError(err.response.data.message || 'Failed to log in. Please try again.');
      } else if (err.request) {
        // Request was made but no response received
        setError("No response received from server.");
      } else {
        // Something happened in setting up the request
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
          Log in
        </h1>
        <p className="text-lg font-medium text-goldenrod-200 text-left mb-8">
          To access
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

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
            {loading ? "Logging In..." : "Log In"}
          </div>
        </button>
      </form>
      <span className="text-center text-black">
        Don't have an account?{" "}
        <span>
          <a className="text-blue-600" href="/signup">
            Signup
          </a>
        </span>
      </span>
    </div>
  );
});

LoginForm.propTypes = {
  className: PropTypes.string,
};

export default LoginForm;
