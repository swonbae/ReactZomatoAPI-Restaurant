import React from "react";

const Restaurant = props => {
  return (
    <div className="col s12 m8 offset-m2">
      <div className="card horizontal">
        <div className="card-image waves-effect waves-block waves-light">
          {props.image == null ? (
            <img
              src={
                "https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg"
              }
              alt="card image"
              // style={{ width: "100%", height: 360 }}
            />
          ) : (
            <img src={props.image} alt="card image" />
          )}
        </div>
        <div className="card-content">
          <a href="#" onClick={() => props.viewRestaurant(props.restaurantId)}>
            <span className="card-title">{props.name}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
