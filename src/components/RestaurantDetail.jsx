import React from "react";
import Review from "./Review";
// import Image from "./Image";
import ModalImage from "react-modal-image";

const RestaurantDetail = props => {
  // let modalIsOpen = true;

  return (
    <div className="container">
      <div
        className="row"
        onClick={props.closeRestaurant}
        style={{
          cursor: "pointer",
          paddingTop: 30,
          textAlign: "right"
        }}
      >
        <i className="fa fa-arrow-left" style={{ fontSize: 20 }} />
        <span> Go back</span>
      </div>
      <div className="row">
        <div className="col s12 m6 center">
          {props.restaurant.featured_image == null ? (
            <img
              src={
                "https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg"
              }
              alt="card image"
              style={{ maxWidth: "100%", maxHeight: 360 }}
            />
          ) : (
            <img
              src={props.restaurant.featured_image}
              alt="card image"
              style={{ maxWidth: "100%", maxHeight: 360 }}
            />
          )}
        </div>
        <div className="col s12 m6">
          <div className="info-container">
            <div className="col s8">
              <h4>{props.restaurant.name}</h4>
            </div>
            <div className="col s4 right-align">
              <h5>
                <i className="fa fa-star" />
                {props.restaurant.user_rating}
              </h5>
              <p>({props.restaurant.votes} votes)</p>
            </div>
            <table>
              <tbody>
                <tr>
                  <th>Address:</th>
                  <td>{props.restaurant.address}</td>
                </tr>
                <tr>
                  <th>Phone:</th>
                  <td>{props.restaurant.phone_numbers}</td>
                </tr>
                <tr>
                  <th>Hours:</th>
                  <td>{props.restaurant.timings}</td>
                </tr>
                <tr>
                  <th>Cost For Two:</th>
                  <td>
                    {props.restaurant.currency}
                    {props.restaurant.average_cost_for_two}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col s7 m10">
          {props.restaurant.reviews.map(rv => {
            return <Review review={rv.review} />;
          })}
        </div>
        <div className="col s5 m2">
          {props.restaurant.photos.map(p => {
            // return <Image src={p.photo.thumb_url} alt="photos" />;
            return (
              <ModalImage
                small={p.photo.thumb_url}
                large={p.photo.url}
                alt="photo image"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
