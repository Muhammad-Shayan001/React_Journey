import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">ContentAI</div>
      <ul className="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><button className="btn-primary-outline">Login</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
