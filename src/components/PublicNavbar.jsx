import { NavLink } from "react-router-dom";

import React from "react";

const PublicNavbar = () => {
  return (
    <nav className="primary-link">
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">SignUp</NavLink>
    </nav>
  );
};

export default PublicNavbar;
