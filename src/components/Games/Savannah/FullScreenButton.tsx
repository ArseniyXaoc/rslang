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

  const fullscreenButtonStyles11 = {
    position: "absolute",
    top: "100px",
    left: "50%",
    transform: "translate(-50%)",
    color: "#fdcb6e",
    zIndex: "1",
    fontSize: "30px",
    cursor: "pointer",
  };

  return (
    <AspectRatioIcon
      onClick={toggleFulscreen}
      style={{ ...fullscreenButtonStyles11 }}
    />
  );
};

export default FullScreenButton;
