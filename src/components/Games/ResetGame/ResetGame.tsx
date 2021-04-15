import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import EmojiEmotionsTwoToneIcon from "@material-ui/icons/EmojiEmotionsTwoTone";
import "./resetGame.css";
import { connect } from "react-redux";
import WordUpdate from "../WordUpdate/WordUpdate";

import { RootState } from "../../../redux/reducer";
import API_URL from "../../Constants/constants";
import { Link, NavLink } from "react-router-dom";

function ResetGame({
  user, game, maxSerie, rightAnswers, wrongAnswers, resetgame, gameId, lang
}) {

  let emojiStyles = {
    cursor: "pointer",
    color: "red"
  };

  let [emojiEmotionsTwoToneIconStyles, setEmojiEmotionsTwoToneIconStyles] = useState(emojiStyles);
  
  let arrStylesEmotion = ["red", "blue", "green", "silver", "orange", "black", "white", "gray", "pink", "mint"];

  const buttonStyles = {
    backgroundColor: "#3498db",
    color: "white",
    cursor: "pointer",
    margin: "0 auto",
  };

  

  function func() {
    setEmojiEmotionsTwoToneIconStyles(
      prev => {
        return {
          ...prev,
          color: arrStylesEmotion[Math.trunc(Math.random() * 10)]
        }
      }
    )
  }

  const herokuUrl = API_URL;

  const [trueWords, setTrueWords] = useState([]);
  const [falseWords, setFalseWords] = useState([]);

  const [gameStatistics, setGameStatistics] = useState(0);

  useEffect(() => {
    const res = rightAnswers.map((elem: any, index: number) => (
        <div key={index} className="true-words">
          <div className="play-sound" onClick={() => playAudio(index, rightAnswers)}>
            <VolumeUpIcon />
          </div>

          <div className="word-answer en">{elem.word}</div>
          <span className="separator"/>
          <div className="word-answer ru">{elem.wordTranslate}</div>
        </div>
    ));

    setTrueWords(res);
  }, []);

  useEffect(() => {
    const res = wrongAnswers.map((elem: any, index: number) => (
        <div key={index} className="false-words">
          <div className="play-sound" onClick={() => playAudio(index, wrongAnswers)}>
            <VolumeUpIcon />
          </div>

          <div className="word-answer en">{elem.word}</div>
          <span className="separator"/>
          <div className="word-answer ru">{elem.wordTranslate}</div>
        </div>
    ));

    setFalseWords(res);
  }, []);

  function playAudio(id: number, answers: any) {
    const audioUrl = answers[id].audio;
    const audio = new Audio(herokuUrl + audioUrl);
    audio.play();
  }

  type StatType = {
    learnedWords: Number,
    date: Number, //  (current time in UTCmiliseconds)
    gameId: String,
    rightAnswers: Array<{}>,
    wrongAnswers: Array<{}>,
    maxSerie: Number
  }

  useEffect(() => {
    const res = {
      learnedWords: rightAnswers.length,
      date: Date.now(), // (current time in UTCmiliseconds)
      gameId,
      rightAnswers: rightAnswers.length,
      wrongAnswers: wrongAnswers.length,
      maxSerie,
    };
    setGameStatistics(res);
  }, []);

  useEffect(() => {
    if (gameStatistics === 0 || user.id === null) return;

    fetch(`${API_URL}users/${user.id}/statistics`, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameStatistics),
    })
    // .then(response => response.json())
    // .then(data => console.log(data))
      .catch((error) => {
        console.log(error);
      });
  }, [gameStatistics]);

  function endGame() {
    if (game && user.id) {
      rightAnswers.forEach((element: any) => {
        element.id = element.id ? element.id : element._id;
        WordUpdate(user, element.id, true, game);
      });
      wrongAnswers.forEach((element: any) => {
        element.id = element.id ? element.id : element._id;
        WordUpdate(user, element.id, false, game);
      });
    }
  }

  // useEffect(() => {
  //   if (game && user.id) {
  //     rightAnswers.forEach((element: any) => {
  //       element.id = element.id ? element.id : element._id;
  //       WordUpdate(user, element.id, true, game);
  //     });
  //     wrongAnswers.forEach((element: any) => {
  //       element.id = element.id ? element.id : element._id;
  //       WordUpdate(user, element.id, false, game);
  //     });
  //   }
  // }, []);

  return (
    <div className="reset-game">
      <div className="end-game-emotion">это конец <EmojiEmotionsTwoToneIcon style={{...emojiEmotionsTwoToneIconStyles}} onClick={func}/></div>
      <div className="right-answers-counter">
        <div className="answers">{lang === "ru" ? "Знаю:" : "Know:"} </div>
        <div className="right-counter">{rightAnswers.length}</div>
      </div>
      <div className="right-answers">
        {trueWords}
      </div>
      <div className="answers-separator"/>
      <div className="wrong-answers-counter">
        <div className="answers">{lang === "ru" ? "Ошибок:" : "Mistakes:"} </div>
        <div className="wrong-counter">{wrongAnswers.length}</div>
      </div>
      <div className="wrong-answers">
        {falseWords}
      </div>
      <Button style={{ ...buttonStyles }} variant="contained" onClick={resetgame}>
      {lang === "ru" ? "Попробовать ещё раз" : "Try Again"}
      </Button>
      <NavLink activeClassName="word-link" to="/"><Button style={{ ...buttonStyles }} variant="contained" onClick={endGame}>
      {lang === "ru" ? "Завершить" : "End Game"}
      </Button></NavLink>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  user: state.user,
  game: state.game.gameFrom,
  lang: state.settingsReducer.lang.lang,
});

export default connect(mapStateToProps)(ResetGame);
