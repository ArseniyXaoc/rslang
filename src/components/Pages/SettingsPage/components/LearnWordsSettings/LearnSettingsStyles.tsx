import { makeStyles } from "@material-ui/core/styles";

const mainSettingsStyles = makeStyles({
  formsContainer: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    columnGap: "5em",
  },
  
  settingsContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    flexWrap: "wrap",
  },
});

export default mainSettingsStyles;
