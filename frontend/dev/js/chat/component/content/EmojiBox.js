import React, { Component } from "react";
import Fade from "@material-ui/core/Fade";
import { Picker, Emoji } from "emoji-mart";
const EmojiBox = ({ isOpen, onSelect, setRef, openEmojiBox }) => {
  const styles = {
    display: isOpen ? "block" : "none"
  };

  return (
    <div className="emoji-box" ref={setRef}>
      <a href="#" className="smile" onClick={openEmojiBox} />
      <Fade in={isOpen}>
        <Picker onSelect={onSelect} style={styles}/>
      </Fade>
    </div>
  );
};

export default EmojiBox;
