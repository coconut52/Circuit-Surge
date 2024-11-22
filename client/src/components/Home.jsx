import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <h1>Circuit-Surge</h1>
      <p>Welcome to Circuit-Surge! Empowering efficient web solutions.</p>
      <div>
        <Link to="/register" className="btn">Register</Link>
        <Link to="/login" className="btn">Login</Link>
      </div>
    </div>
  );
}

export default Home;