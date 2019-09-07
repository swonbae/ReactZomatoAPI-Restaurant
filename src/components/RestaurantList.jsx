import React from "react";
import Restaurant from "./Restaurant";

const RestaurantList = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          {props.restaurants.map((r, i) => {
            return (
              <Restaurant
                key={i}
                name={r.name}
                userRating={r.user_rating}
                locality={r.locality}
                cuisines={r.cuisines}
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
