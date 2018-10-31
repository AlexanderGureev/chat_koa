import React, { Component } from "react";
// import Fade from "@material-ui/core/Fade";
import withAnimation from "./Fade";
import { Picker } from "emoji-mart";

const AnimatedPicker = withAnimation(Picker);

const EmojiBox = ({ isOpen, onSelect, setRef, openEmojiBox }) => (
  <div className="emoji-box" ref={setRef}>
    <div className="wrap-smile" onClick={openEmojiBox}>
      <a href="#" className="smile" />
    </div>

    <AnimatedPicker
      in={isOpen}
      className="emoji-picker"
      color="#4d73cb"
      onSelect={onSelect}
      showSkinTones={false}
      skin={1}
    />
  </div>
);

export default EmojiBox;
