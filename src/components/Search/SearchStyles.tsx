import { makeStyles } from "@material-ui/core";
import searchIcon from "../../assets/icons/search.svg"

const searchStyles = makeStyles({
  container: {
    maxWidth: "1200px",
    marginTop: "50px",
    width: "100%",
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
  icon: {
    display: "inline-block",
    margin: "0 15px 0 5px",
    width: "55px",
    height: "55px",
  },
  searchIcon: {
    background: `url(${searchIcon})`,
    backgroundSize: "contain",
    filter: "invert(100%)",
  },
  searchBlock: {
    display: "flex",
    padding: "30px",
    justifyContent: "center",
    background: "#59B2EF",
  },
  searchString: {
    width: "50%",
    minWidth: "100px",
    "& > label": {
      color:"white",
    },
    "& > input": {
      color: "white",
    },
  },
});

export default searchStyles;
