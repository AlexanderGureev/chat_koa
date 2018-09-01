import React, { Component } from "react";

const ContactInfo = props => {
  return (
    <div className="contact-info">
      <h4 className="title">Contact info</h4>

      <form action="/">
        <div className="form-group">
          <label htmlFor="#emailProfile">Email</label>
          {/* <input type="email" id="#emailProfile" /> */}
          <div className="email">User email</div>
        </div>

        <div className="form-group">
          <label htmlFor="#mobileProfile">Mobile</label>
          {/* <input type="tel" id="#mobileProfile" /> */}
          <div className="mobile">User mobile</div>
        </div>
      </form>
    </div>
  );
};

export default ContactInfo;
