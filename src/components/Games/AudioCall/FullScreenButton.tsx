import React from "react";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";

const FullScreenButton = (props) => {

  const toggleFulscreen = () => {
    let elem = document.querySelector(".game-body-container");
    
    if(document.fullscreenElement === null) {
      // document.documentElement.requestFullscreen();
      elem.requestFullscreen();
    } else {
      if(document.fullscreenEnabled){
        document.exitFullscreen();
      }
    }
  }

  let fullscreenButtonStyles = {
    marginTop: "20px",
  }

  return (
    <AspectRatioIcon 
      style={{...fullscreenButtonStyles}}
      onClick={toggleFulscreen} 
      className="fullscreen-button-cursor" 
      fontSize="large" 
      color="primary" 
    /> 
  )
}

export default FullScreenButton;