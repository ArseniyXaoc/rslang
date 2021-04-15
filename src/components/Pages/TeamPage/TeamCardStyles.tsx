import { makeStyles } from "@material-ui/core/styles";

const cardStyles = makeStyles({
  teamPageContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "no-repeat url(/9778757a3aa142f35224f0a19c76fd34.jpg) fixed",
    backgroundSize: "cover"
  },

  teamCardsContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: "3em",
    columnGap: "3em",
  },

  userCardContainer: {
    width: "550px",
    height: "400px",
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: "rgb(242 242 242 / 40%)",
    borderRadius: "10px",
    overflow: "hidden",
  },

  userImg: {
    width: "220px",
    marginRight: "20px",
    objectFit: "cover",
  },

  userDetails: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "space-between",
    rowGap: "1em",
    padding: "10px",
    color: "rgba(0, 0, 0, 0.6)",
  },

  userName: {
    fontWeight: "bold",
    fontSize: "20px",
  },

  userDescription: {
    textAlign: "justify",
  },

  userLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  githubImg: {
    width: "50px",
    height: "50px",
  },

});

export default cardStyles;
