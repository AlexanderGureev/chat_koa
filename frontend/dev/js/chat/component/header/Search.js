import React, { Component } from "react";

const Search = props => (
  <div className="search">
    <input type="text" name="search" id="searchInput" placeholder="Search" />
    <span className="find">
      <i className="fas fa-search" />
    </span>
  </div>
);

export default Search;
