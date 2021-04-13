import { makeStyles } from "@material-ui/core/styles";

const cardStyles = makeStyles({
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: "3em",
    margin: "20px 10px 50px",
  },

  cardImg: {
    width: "170px",
    height: "170px",
    display: "flex",
    flexShrink: 0,
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

  mainWordContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    columnGap: "0.5em",
    fontSize: "23px",
  },

  mainWord: {
    color: "#1665B4",
    fontWeight: "bold",
  },

  mainDifficultWord: {
    color: "red",
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

  cardScore: {
    display: "flex",
    flexDirection: "row",
    columnGap: "1em",
    fontSize: "20px",
  },

  rightAnswers:{
    fontWeight: "bold",
    color: "green"
  },

  wrongAnswers:{
    fontWeight: "bold",
    color: "red"
}

});

export default cardStyles;
