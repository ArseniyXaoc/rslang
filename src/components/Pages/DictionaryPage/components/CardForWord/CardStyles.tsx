import { makeStyles } from "@material-ui/core/styles";

const cardStyles = makeStyles({
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: "3em",
  },

  cardImg: {
    width: "170px",
    height: "170px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  cardDescription: {
    display: "flex",
    flexDirection: "column",
    rowGap: "1em",
    flexWrap: "wrap",
  },

  mainWordContsiner: {
    display: "flex",
    flexDirection: "row",
    columnGap: "0.5em",
    fontSize: "23px",
  },

  mainWord: {
    color: "#1665B4",
    fontWeight: "bold",
  },

  wordTranscription: {
    color: "#828282",
  },

  wordTranslate: {
    color: "#222222",
  },

  wordVoiceActing: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",

    "&:hover img": {
      width: "37px",
    },
  },

  exampleContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: "0.5em",
  },

  example: {
    fontSize: "20px",
  },

  exampleTranslate: {
    fontSize: "18px",
    color: "#828282",
  },

  cardButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    columnGap: "1em",
  },

  cardBtn: {
    backgroundColor: "#1665B4",
    fontWeight: "bold",
    padding: "10px",

    "&:hover": {
      backgroundColor: "#3680cb",
    },
  },
});

export default cardStyles;
