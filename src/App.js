import React from 'react'
import { BrowserRouter as Router,Route,Routes,Navigate } from 'react-router-dom'
import Login from './page/auth/Login'
import Signup from './page/auth/Signup'
import Home from './page/home/Home'
function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" exact element={<Root />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/Signup" exact element={<Signup />} />
        </Routes>
      </Router>
    );
  };
  
  const Root = () => {
    const isAuthenticated =!!localStorage.getItem('token');
  
    return isAuthenticated ? (
      <Navigate to="/dashboard" replace />
    ) : (
      <Navigate to="/login" replace />
    );
  };
  

export default App