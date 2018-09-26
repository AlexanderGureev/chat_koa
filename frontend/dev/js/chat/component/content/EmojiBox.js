import React, { Component } from "react";
import Fade from "@material-ui/core/Fade";
import { Picker, Emoji } from "emoji-mart";

const EmojiBox = ({ isOpen, onSelect, setRef, openEmojiBox }) => {
  return (
    <div className="emoji-box" ref={setRef}>
      <a href="#" className="smile" onClick={openEmojiBox} />
      <Fade in={isOpen}>
        <Picker onSelect={onSelect} />
      </Fade>
    </div>
  );
};

export default EmojiBox;
