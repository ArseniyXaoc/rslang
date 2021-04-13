import { makeStyles } from "@material-ui/core/styles";

const cardStyles = makeStyles({
  teamCardsContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: "3em",
  },

  userCardContainer: {
    width: "500px",
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: "10px",
    overflow: "hidden",
  },

  userImg: {
    width: "250px",
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
