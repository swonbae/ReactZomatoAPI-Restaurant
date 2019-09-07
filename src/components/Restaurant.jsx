import React from "react";
import Image from "./Image";

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
            />
          ) : (
            <Image src={props.image} alt="card image" />
          )}
        </div>
        <div class="card-stacked">
          <div className="card-content">
            <a
              href="#"
              onClick={() => props.viewRestaurant(props.restaurantId)}
            >
              <div>
                <span className="right">
                  <i className="fa fa-star">{props.userRating}</i>
                </span>
                <span className="card-title">{props.name}</span>
              </div>
              <p className="black-text">{props.cuisines}</p>
              <p className="black-text">{props.locality}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
