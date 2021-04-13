import bgImage from "../../assets/images/main/bg.svg";

const themes = {
  normal: {
    backgroundImage: `url(${bgImage})`,
    backgroundColor: "rgba(0,0,0,0)",
  },
  transparent: {
    backgroundImage: "",
    backgroundColor: "rgba(0,0,0,0)",
  },
};

export default themes;
