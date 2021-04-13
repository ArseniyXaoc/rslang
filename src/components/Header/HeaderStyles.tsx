import { makeStyles } from "@material-ui/core/styles";

const headerStyles = makeStyles(
  {
    appBar: (theme) => ({
      backgroundImage: theme.backgroundImage,
      backgroundColor: theme.backgroundColor,
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "#FFFFFF",
      fontWeight: 700,
      padding: "0",
    }),
    toolbar: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "0 15px",

    },
    logo: {
      textAlign: "center",
    },

    drawer: {
      width: "300px",
      "& > div": {
        padding: "10px",
      },
    },
    list: {
      padding: "0",
      color: "#FFFFFF",
    },
    listItemContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    menuIcon: {
      width: "24px",
      margin: "0 10px 10px 0",
    },

    listLinkItem: {
      width: "auto",
      textDecoration: "none",
      color: "#FFFFFF",
      padding: "10px 0",
      marginTop: "5px",
    },
    collapsedList: {
      margin: "0",
      paddingRight: "32px",
    },

    listLinkItemSection: {
      paddingLeft: "36px",
      fontWeight: 700,
      lineHeight: 0.7,
    },
    listLinkItemLearn: {
      paddingTop: "0",
      paddingBottom: "0",
    },
    closeButtonContainer: {
      position: "relative",
      left: "-12px",
    },
    closeButton: {

      color: "#fff",
      // margin: "10px 0",
    },
  },
);

export default headerStyles;
