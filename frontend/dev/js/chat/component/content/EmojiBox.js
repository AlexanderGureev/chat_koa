import React, { Component } from "react";
import Fade from "@material-ui/core/Fade";
import { Picker } from "emoji-mart";

const EmojiBox = ({ isOpen, onSelect, setRef, openEmojiBox }) => {
  const styles = {
    display: isOpen ? "block" : "none"
  };

  return (
    <div className="emoji-box" ref={setRef}>
      <div className="wrap-smile" onClick={openEmojiBox}>
        <a href="#" className="smile" />
      </div>
      <Fade in={isOpen}>
        <Picker
          className="emoji-picker"
          color="#4d73cb"
          onSelect={onSelect}
          style={styles}
          showSkinTones={false}
          skin={1}
        />
      </Fade>
    </div>
  );
};

export default EmojiBox;
