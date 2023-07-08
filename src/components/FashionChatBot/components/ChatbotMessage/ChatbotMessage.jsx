/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import axios from "axios";

import { SearchTerm, Product } from "./components";
import "./ChatbotMessage.scss";
import logo from "../../../../assets/icons/gfg-icon.png";

const cls = "chatbot-message-wrapper";

export const ChatbotMessage = ({
  className,
  content,
  isLoading,
  show,
  searchTermMap,
  products,
}) => {
  const [selectedTermMap, setSelectedTermMap] = useState({});

  const renderedProducts = useMemo(() => {
    if (
      Object.values(selectedTermMap).filter((selected) => selected).length === 0
    ) {
      return products;
    }

    return Object.keys(selectedTermMap)
      .filter((key) => selectedTermMap[key])
      .map((term) => {
        return searchTermMap[term].products;
      })
      .flat();
  }, [selectedTermMap, products, searchTermMap]);

  const renderProducts = () => {
    if (isLoading || !show || products.length === 0) return null;
    return (
      <div className="product-list">
        {renderedProducts.map((product) => (
          <Product
            key={`${product.ConfigSku}-${product.Name.length}`}
            {...product}
          />
        ))}
      </div>
    );
  };

  const handleClickOnTerm = (term) => {
    setSelectedTermMap((prevTermMap) => ({
      ...prevTermMap,
      [term]: !prevTermMap[term],
    }));
  };

  const renderSearchTerms = () => {
    if (isLoading || !show || Object.keys(searchTermMap) === 0) return null;

    return (
      <div className="search-term-list">
        {Object.keys(searchTermMap).map((term) => (
          <SearchTerm
            key={term}
            term={term}
            onCLickTerm={handleClickOnTerm}
            selected={selectedTermMap[term] || false}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="chatbot-answer-wrapper">
      <div className="avatar-message">
        <div className="avatar">
          {/* <FontAwesomeIcon icon={faRobot} className="icon" /> */}
          <img src={logo} alt="avatar" />
        </div>
        <div className="message">
          {isLoading ? "......" : content}
          <div className="arrow" />
        </div>
      </div>
      {renderSearchTerms()}
      {renderProducts()}
    </div>
  );
};

ChatbotMessage.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string,
  isLoading: PropTypes.bool,
  searchTermMap: PropTypes.object,
  show: PropTypes.bool,
  products: PropTypes.arrayOf(PropTypes.object),
};
