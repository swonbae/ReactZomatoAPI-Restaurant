import React from "react";

const Restaurant = props => {
  return (
    <div>
      <a href="#" onClick={() => props.handleClick(props.r.id)}>
        Name: {props.r.name} | Address: {props.r.address} | user_rating:
        {props.r.user_rating}\
      </a>
    </div>
  );
};

export default Restaurant;
