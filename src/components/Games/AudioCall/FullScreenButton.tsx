import React from "react";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";

const FullScreenButton = (props) => {
  const toggleFulscreen = () => {
    const elem = document.querySelector(".games-container");

    if (document.fullscreenElement === null) {
      // document.documentElement.requestFullscreen();
      elem.requestFullscreen();
    } else if (document.fullscreenEnabled) {
      document.exitFullscreen();
    }
  };

  const styleButton = {
    position: "absolute",
    left: "50%",
    top: "70px",
    cursor: "pointer",
    zIndex: "1",
  };

  return (
    <AspectRatioIcon
      style={{ ...styleButton }}
      onClick={toggleFulscreen}
      className="fullscreen-button-cursor"
      fontSize="large"
      color="primary"
    />
  );
};

export default FullScreenButton;
