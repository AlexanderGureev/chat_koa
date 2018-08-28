import React, { Component } from "react";

export default function Copyright() {
  return (
    <div className="copyright">
      <div className="box">
        <p>
          2018 <i className="far fa-copyright" /> CHATER.RU{" "}
        </p>
        <div className="soc">
          <a href="#">
            <i className="fab fa-twitter" />
          </a>
          <a href="#">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#">
            <i className="fab fa-instagram" />
          </a>
        </div>
      </div>
    </div>
  );
}
