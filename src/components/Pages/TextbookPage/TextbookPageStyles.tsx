import { makeStyles } from "@material-ui/core";

const textbookStyles = makeStyles({
  textbookSectionContainer: {
    maxWidth: "1200px",
    width: "100%",
  },
  textbookSectionTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "60px",
    padding: "0 15px",
  },
  textbookSectionBlock: {
    width: "200px",
    display: "flex",
    justifyContent: "flex-end",
  },
  textbookSectionTitlePage: {
    display: "flex",
    flexWrap: "wrap",
  },
  textbookTitle: {
    margin: "10px 5px",
    textAlign: "center",
  },
  settingsIcon: {
    width: "32px",
    height: "32px",
    marginTop: "3px",
  },
});

export default textbookStyles;
