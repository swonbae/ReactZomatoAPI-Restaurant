import React from "react";

const Nav = props => {
  return (
    <nav>
      <div className="nav-wrapper container">
        <a href="" className="brand-logo center">
          <span>{props.title}</span>
        </a>
      </div>
    </nav>
  );
};

export default Nav;
