import React from "react";
import "./SearchTerm.scss";
import classNames from "classnames";

export const SearchTerm = ({ term, onCLickTerm, selected }) => {
  return (
    <div
      className={classNames(selected ? "selected" : "", "search-term")}
      onClick={() => onCLickTerm(term)}
    >
      {term}
    </div>
  );
};
