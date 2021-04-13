import { makeStyles } from "@material-ui/core/styles";

const dictionaryStyles = makeStyles({
  dictionaryContainer: {
    maxWidth: "1200px",
    width: "1200px",
    margin: "0 auto",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    rowGap: "1em",
  },

  dictionaryMenu: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dictionaryMenuItem: {
    border: "none",
    background: "none",
    borderBottom: "3px solid #1665B4",
    fontWeight: "bold",
    color: "#1665B4",
    width: "32%",
    textAlign: "center",
    padding: "20px",
    fontSize: "23px",
    cursor: "pointer",
    outline: "none",

    "&:hover": {
      color: "#3680cb",
      borderBottom: "3px solid #3680cb",
    }
  },

  dictionaryMenuItemActive: {
    color: "rgb(255, 184, 3)",
    borderBottom: "3px solid rgb(255, 184, 3)",

    "&:hover": {
      color: "rgb(255, 184, 3)",
      borderBottom: "3px solid rgb(255, 184, 3)",
    }
  },

  cards: {
    display: "flex",
    flexDirection: "column",
    rowGap: "3em",
  },

  emptyTab: {
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },

  textbookSectionTitle: {
    width: "100%",
    textAlign: "center",
    alignContent: "center",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "60px",
    padding: "0 15px",
    margin: 0,
  },

  textbookSectionBlock: {
    width: "200px",
    display: "flex",
    justifyContent: "flex-end",
  },

  settingsIcon: {
    width: "32px",
    height: "32px",
    marginTop: "3px",
  },

  paginationContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  }
});

export default dictionaryStyles;
