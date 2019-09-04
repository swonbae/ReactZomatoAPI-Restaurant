import React from "react";
import Restaurant from "./Restaurant";

const RestaurantList = props => {
  return (
    <div className="container">
      <div className="row">
        <ul>
          {props.restaurants.map(r => (
            <li key={r.id}>
              <a href="#" onClick={() => props.handleClick(r.id)}>
                Name: {r.name} | Address: {r.address} | user_rating:
                {r.user_rating}
              </a>
              {/* <Restaurant r={r} /> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantList;
