import { makeStyles } from "@material-ui/core";

const sectionStyles = makeStyles({
  sectionContainer: {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",

  },
  sectionWrapper: {
    padding: "10 0px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    flexWrap: "wrap",
    rowGap: "1em",
  },
  sectionTitle: {
    width: "100%",
    // margin: "10px 0",
    // padding: "10px",
    textAlign: "center",
  },
  sectionTitleText: {
    margin: 0,
    padding: "10px",
  },
  sectionContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    height: "calc(100vh - 150px)",
    width: "100%",
  },
  sectionLink: {
    textDecoration: "none",
    color: "#2980b9",
    fontWeight: 600,
    margin: "15px",
    "&:hover": {
      cursor: "pointer",
      color: "#1010B9",
    },
    "&:visited": {
      textDecoration: "none",
    },
  },

});

export default sectionStyles;
