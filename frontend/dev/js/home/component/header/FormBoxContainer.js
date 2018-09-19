import React, { Component } from "react";

const FormBoxContainer = ({ children, location: { pathname } }) => {
  const isExact = children.find(({ props }) => props.path === pathname);
  return isExact ? (
    <div className="col-lg-5 offset-lg-1 form-box">
      <div
        className="register-form wow zoomInRight"
        data-wow-duration="1.5s"
        data-wow-delay="1.4s"
      >
        {children}
      </div>
    </div>
  ) : null;
};
export default FormBoxContainer;
