import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Ensure this is the correct path
import axiosInstance from '../../utils/axiosInstance';

function SignUp() {
  const [FullName, setFullName] = useState(''); // Full name state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!FullName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(""); // Clear any previous errors

    try {
      // Send sign-up data to backend
      const response = await axiosInstance.post("/create-account", {
        FullName: FullName,
        email: email,
        password: password,
      });
      console.log(response);

      // Navigate to the login page after successful sign-up
      navigate('/login'); 
    } catch (error) {
      console.error("Sign Up Error:", error);
      setError("An error occurred. Please try again."); 
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return regex.test(email);
  };

  return (
    <div className="signup-container">
      <div className="signup-left"> {/* New left section for sign-up */}
        <h1>Capture Your Journeys</h1>
        <p>Record your travel experiences and memories in your personal travel journal.</p>
      </div>
      <div className="signup-right"> {/* Updated to match the layout */}
        <h2>Create an Account</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Full Name" // Updated placeholder for full name
            value={FullName}
            onChange={(e) => setFullName(e.target.value)}
            required 
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <span
              className="toggle-password btn"
              onClick={togglePasswordVisibility}
              role="button"
              aria-label={passwordVisible ? "Hide password" : "Show password"}
            >
              {passwordVisible ? "🙈" : "👁️"}
            </span>
          </div>
          <button type="submit" className='btn'>Sign Up</button>
          <div className="or">Or</div>
          <button  style={{ backgroundColor: '#00bcd4' }} type="button" className="login-account btn" onClick={() => navigate('/login')}>
            Already have an account? Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
