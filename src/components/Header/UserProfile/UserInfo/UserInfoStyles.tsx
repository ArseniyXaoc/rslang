import { makeStyles } from "@material-ui/core/styles";

const userInfoStyles = makeStyles(
  {
    userInfo: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",

      "& > span": {
        marginRight: "10px",
      },

      "& > img": {
        width: "24px",
      },

      "& > a": {
        color: "white",
        marginRight: "10px",
      },
    },
  },
);

export default userInfoStyles;
