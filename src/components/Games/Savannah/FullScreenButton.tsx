import React from "react";
import "./gameSavannah.scss";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";

const FullScreenButton = (props) => {
  const toggleFulscreen = () => {
    const elem = document.querySelector(".words-container");

    if (document.fullscreenElement === null) {
      // document.documentElement.requestFullscreen();
      elem.requestFullscreen();
    } else if (document.fullscreenEnabled) {
      document.exitFullscreen();
    }
  };

  let fullscreenButtonStyles11 = {
    color: "#fdcb6e",
    zIndex: "1",
    fontSize: "30px",
    cursor: "pointer",
    marginTop: "50px"
  }

  return (
    <AspectRatioIcon
      onClick={toggleFulscreen}
      style={{...fullscreenButtonStyles11}}
    />
  );
};

export default FullScreenButton;
