let screenWidth;
let lineWidth = 800;
let LinearProgressStyles;

window.addEventListener('resize', () => {
  screenWidth = window.outerWidth;
  
  if(screenWidth >= 800){
    lineWidth = 800;
  } else if(screenWidth < 800){
    lineWidth = 600;
  }

  LinearProgressStyles = {
    width: `${lineWidth}px`,
    height: "5px",
    margin: "0 auto",
  };
})



const SpeakerIconStyles = {
  fontSize: 100,
  color: "rgba(223, 230, 233, .5)",
  cursor: "pointer",
  zIndex: "1",
};

const StartGameButtonStyle = {
  backgroundColor: "#ff0b53",
  color: "white",
}

export {LinearProgressStyles, SpeakerIconStyles, StartGameButtonStyle}
