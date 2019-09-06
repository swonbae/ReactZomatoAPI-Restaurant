import React from "react";
import Restaurant from "./Restaurant";

const RestaurantList = props => {
  return (
    <div className="container">
      <div className="row">
        {/* <ul>
          {props.restaurants.map(r => (
            <li key={r.id}>
              <a href="#" onClick={() => props.handleClick(r.id)}>
                Name: {r.name} | Address: {r.address} | user_rating:
                {r.user_rating}
              </a>
            </li>
          ))}
        </ul> */}
        <div className="col s12">
          {props.restaurants.map((r, i) => {
            return (
              <Restaurant
                key={i}
                name={r.name}
                viewRestaurant={props.viewRestaurant}
                restaurantId={r.res_id}
                image={r.thumb}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RestaurantList;
