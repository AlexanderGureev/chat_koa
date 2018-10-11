import React, { Component, Fragment } from "react";

const formatDate = date => {
  if (!date) {
    return;
  }

  let diff = new Date() - date;

  if (diff < 1000) {
    return "только что";
  }

  let sec = Math.floor(diff / 1000);

  if (sec < 60) {
    return sec + " сек. назад";
  }

  let min = Math.floor(diff / 60000);
  if (min < 60) {
    return min + " мин. назад";
  }

  let _date = new Date(date);
  let formattedDate = [
    "0" + _date.getDate(),
    "0" + (_date.getMonth() + 1),
    "" + _date.getFullYear(),
    "0" + _date.getHours(),
    "0" + _date.getMinutes()
  ].map(d => d.slice(-2));

  return (
    formattedDate.slice(0, 3).join(".") + " " + formattedDate.slice(3).join(":")
  );
};

const FormattedDate = props => {
  return <div className="date">{formatDate(props.children)}</div>;
};

export default FormattedDate;
