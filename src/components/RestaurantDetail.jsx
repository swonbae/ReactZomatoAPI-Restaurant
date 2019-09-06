import React from "react";

const RestaurantDetail = props => {
  return (
    <div className="container">
      <div
        className="row"
        onClick={props.closeRestaurant}
        style={{ cursor: "pointer", paddingTop: 50, textAlign: "right" }}
      >
        <i className="fa fa-arrow-left"></i>
        <span style={{ marginLeft: 10 }}>Go back</span>
      </div>
      <div className="row">
        <div className="col s12 m6">
          {props.currentRestaurant.featured_image == null ? (
            <img
              src={
                "https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg"
              }
              alt="card image"
              style={{ maxWidth: "100%", maxHeight: 360 }}
            />
          ) : (
            <img
              src={props.currentRestaurant.featured_image}
              alt="card image"
              style={{ maxWidth: "100%", maxHeight: 360 }}
            />
          )}
        </div>
        <div className="col s12 m6">
          <div className="info-container">
            <p>{props.currentRestaurant.name}</p>
            <p>{props.currentRestaurant.address}</p>
            <p>{props.currentRestaurant.phone_numbers}</p>
            <p>{props.currentRestaurant.timings}</p>
            <p>{props.currentRestaurant.average_cost_for_two}</p>
            <p>{props.currentRestaurant.user_rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
