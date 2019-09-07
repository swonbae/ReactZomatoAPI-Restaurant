import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Image = image => (
  <div>
    <LazyLoadImage
      alt={image.alt}
      height={image.height}
      width={image.width}
      src={image.src}
      effect="black-and-white"
      //   effect="blur"
      placeholderSrc="https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg"
    />
    <span>{image.caption}</span>
  </div>
);

export default Image;
