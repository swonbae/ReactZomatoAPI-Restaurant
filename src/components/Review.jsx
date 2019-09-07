import React from "react";
import ShowMoreText from "react-show-more-text";

const Review = props => {
  return (
    <div className="col s12 m10 offset-m1">
      <div className="card-panel grey lighten-5 z-depth-1">
        <div className="row valign-wrapper">
          <div className="col s2">
            <div>
              <img
                src={props.review.user.profile_image}
                alt="profile image"
                class="circle responsive-img"
              />
            </div>
            <h6>{props.review.user.name}</h6>
          </div>
          <div className="col s10">
            <ShowMoreText
              lines={5}
              more="Show more"
              less="Show less"
              anchorClass=""
              expanded={false}
            >
              {props.review.review_text}
            </ShowMoreText>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
