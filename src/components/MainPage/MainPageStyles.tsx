import { makeStyles } from "@material-ui/core/styles";
import bookIcon from "../../assets/icons/textbook.svg";
import dictionaryIcon from "../../assets/icons/language.svg";
import gamesIcon from "../../assets/icons/games.svg";
import statIcon from "../../assets/icons/trend.svg";

const mainStyles = makeStyles({
  wrapper: {
    // background: `no-repeat url(${bgImage}) fixed`,
    // backgroundPosition: "center",
    // backgroundSize: "cover",
    overflow: "hidden",
  },
  title: {
    margin: 0,
    padding: "30px 30px",
    boxSizing: "border-box",
    borderRadius: "4px 4px 0 0",
  },
  card: {
    margin: "30px 0",
    "&:hover": {
      boxShadow: "1px 1px 12px 0px rgba(0,0,0,0.8)",
    },
  },
  cardBlue: {
    backgroundColor: "#59B2EF",
    color: "#fff",
  },
  cardRed: {
    backgroundColor: "#FF0B53",
    color: "#fff",
    "& > a": {
      color: "#732649",
    },
  },
  cardOrange: {
    backgroundColor: "#FD9644",
    color: "#fff",
  },
  cardYellow: {
    backgroundColor: "#FDBD47",
    color: "#fff",
  },
  cardDarkBlue: {
    backgroundColor: "#4B52D1",
    color: "#fff",
    "& > a": {
      color: "#440868",
    },
  },
  icon: {
    display: "inline-block",
    margin: "0 5px",
    width: "25px",
    height: "25px",
  },
  bookIcon: {
    background: `url(${bookIcon})`,
    backgroundSize: "contain",
  },
  dicIcon: {
    background: `url(${dictionaryIcon})`,
    backgroundSize: "contain",
  },
  statIcon: {
    background: `url(${statIcon})`,
    backgroundSize: "contain",
  },
  gamesIcon: {
    background: `url(${gamesIcon})`,
    backgroundSize: "contain",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "10px 7%",
  },
  links: {
    display: "inline-block",
    borderRadius: "5px",
    textDecoration: "none",
    color: "#1639B4",
    fontSize: "20px",
    fontFamily: "sans-serif",
    margin: "20px",
    '&:hover': {
      textDecoration: "underline dotted",
    },
  },

  description: {
    padding: "20px",
    margin: "20px",
    //backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: "10px",
    color: "#1639B4",
  },
});

export default mainStyles;