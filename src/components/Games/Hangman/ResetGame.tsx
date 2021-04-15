import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import EmojiEmotionsTwoToneIcon from "@material-ui/icons/EmojiEmotionsTwoTone";
import API_URL from "../../Constants/constants";
import "./resetGame.css";

const ResetGame = (props: any) => {
  const herokuUrl = API_URL;

  const [trueWords, setTrueWords] = useState([]);
  const [falseWords, setFalseWords] = useState([]);

  useEffect(() => {
    const res = props.rightAnswers.map((elem: any, index: number) => (
        <div key={index} className="true-words">
          <div className="play-sound" onClick={() => playAudio(index, true)}>
            <VolumeUpIcon />
          </div>

          <div className="word-answer en">{elem.word}</div>
          <span className="separator"></span>
          <div className="word-answer ru">{elem.wordTranslate}</div>
        </div>
    ));

    setTrueWords(res);
  }, []);

  useEffect(() => {
    const res = props.wrongAnswers.map((elem: any, index: number) => (
        <div key={index} className="false-words">
          <div className="play-sound" onClick={() => playAudio(index, false)}>
            <VolumeUpIcon />
          </div>

          <div className="word-answer en">{elem.word}</div>
          <span className="separator"></span>
          <div className="word-answer ru">{elem.wordTranslate}</div>
        </div>
    ));

    setFalseWords(res);
  }, []);

  function playAudio(id: number, bool: boolean) {
    let audioUrl = "";

    if (bool) {
      audioUrl = props.rightAnswers[id].audio;
    } else {
      audioUrl = props.wrongAnswers[id].audio;
    }

    const audio = new Audio(herokuUrl + audioUrl);
    audio.play();
  }

  return (
    <div className="reset-game">
      <div className="end-game-emotion">это конец <EmojiEmotionsTwoToneIcon color="primary"/></div>
      <div className="right-answers-counter">
        <div className="answers">Знаю: </div>
        <div className="right-counter">{props.rightAnswersCounter}</div>
      </div>
      <div className="right-answers">
        {trueWords}
      </div>
      <div className="answers-separator"></div>
      <div className="wrong-answers-counter">
        <div className="answers">Ошибок: </div>
        <div className="wrong-counter">{props.wrongAnswersCounter}</div>
      </div>
      <div className="wrong-answers">
        {falseWords}
      </div>
      <Button variant="contained" color="primary" onClick={props.resetgame}>
        попробовать ещё раз
      </Button>
    </div>
  );
};

export default ResetGame;
