import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Image = image => (
  <div>
    <LazyLoadImage
      alt={image.alt}
      height={image.height}
      width={image.width}
      src={image.src} // use normal <img> attributes as props
      effect="opacity"
    />
    <span>{image.caption}</span>
  </div>
);

export default Image;
