import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Product.scss";

const cls = "product-wrapper";

export const Product = ({
  className,
  MainImageUrl: imgUrl,
  Name: name,
  Price: price,
}) => {
  const getName = () => {
    if (name.length > 30) {
      return name.slice(0, 20) + "...";
    }
    return name;
  };

  return (
    <div className="product-wrapper">
      <a className="image-link">
        <img src={imgUrl} alt={name} />
      </a>
      <p className="name">{getName()}</p>
      <p className="price">{price}</p>
    </div>
  );
};

Product.propTypes = {
  className: PropTypes.string,
  MainImageUrl: PropTypes.string,
  Name: PropTypes.string,
  Price: PropTypes.string,
};
