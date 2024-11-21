import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axiosInstance from '../../utils/axiosInstance';

function Login() {
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
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(""); 

    try {
      const response = await axiosInstance.post("/login", {
        email:email,
        password:password,
      });
      console.log(response);

      // Check if response contains accessToken
      if ( response.data&&response.data.accessToken) {
        // Save token in local storage
        localStorage.setItem("token", response.data.accessToken);
        navigate('/dashboard'); 
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Invalid email or password. Please try again."); 
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return regex.test(email);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>Capture Your Journeys</h1>
        <p>Record your travel experiences and memories in your personal travel journal.</p>
      </div>
      <div className="login-right">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email" // Capitalized placeholder for consistency
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
              className="toggle-password"
              onClick={togglePasswordVisibility}
              role="button"
              aria-label={passwordVisible ? "Hide password" : "Show password"}
            >
              {passwordVisible ? "🙈" : "👁️"}
            </span>
          </div>
          <button type="submit">Login</button>
          <div className="or">Or</div>
          <button type="button" className="create-account" onClick={() => navigate('/Signup')}>Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
