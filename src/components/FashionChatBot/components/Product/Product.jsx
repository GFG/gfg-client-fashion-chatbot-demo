import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const cls = "product-wrapper";

export const Product = ({ className, imgUrl, title, price }) => {
  return (
    <div classname={classNames(cls, className)}>
      <div className={`${cls}__image`}>
        <img src={imgUrl} alt={title} />
      </div>
      <p className={`${cls}__title`}>{title}</p>
      <p className={`${cls}__price`}>{price}</p>
    </div>
  );
};

Product.propTypes = {
  className: PropTypes.string,
  imgUrl: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
};
