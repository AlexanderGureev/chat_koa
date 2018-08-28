import React, { Component } from "react";
import FormBox from "./FormBox";

export default function HeaderCenter() {
  return (
    <div className="header-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="header-composition">
              <h2>Конфиденциально. Удобно. Быстро.</h2>
              <p>
                Lorem ipsum dolor sit amet adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ad minim
                veniam, quis nostrud exercitation ullamco nisi commodo
                consequat.
              </p>
            </div>
          </div>
          <FormBox />
        </div>
      </div>
    </div>
  );
}
