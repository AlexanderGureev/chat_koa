import React, { Component } from "react";

const LoadMoreBtn = ({ onClick = () => {} }) => (
  <div className="load-more" onClick={onClick}>
    <span>Загрузить еще?</span>
  </div>
);

export default LoadMoreBtn;
