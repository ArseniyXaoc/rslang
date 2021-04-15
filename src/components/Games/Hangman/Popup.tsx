import React, {useEffect, useState} from 'react';
import {checkWin, playSounds} from './helpers';
import { modal, buttons } from "./Constants";
import {RootState} from "../../../redux/reducer";
import {connect} from "react-redux";
import win from "../../../assets/sound/succes.mp3";
import lose from "../../../assets/sound/lose.mp3";;

function Popup ({selectedWordObj,
                  correctLetters,
                  wrongLetters,
                  selectedWord,
                  errors,
                  playAgain,
                  setIsStartGame,
                  lang}) {

  let finalMessage = "";
  let finalMessageRevealWord = "";
  let isStartGame = true;
  const gameResult = checkWin(correctLetters, wrongLetters, selectedWord, errors);

  if (gameResult === 'win') {
    isStartGame = false;
    finalMessage = modal[lang].win;
    finalMessageRevealWord = modal[lang].word + `${selectedWord} - ${selectedWordObj.wordTranslate}`;

    if(selectedWord) {
      const rightObjFromStorage = JSON.parse(localStorage.getItem("rightObj")) || [];
      rightObjFromStorage.push(selectedWordObj);
      localStorage.setItem("rightObj", JSON.stringify(rightObjFromStorage));
    }

     // playSounds(win);
  }

  if (gameResult === 'lose') {
    isStartGame = false;
    finalMessage = modal[lang].lose;
    finalMessageRevealWord = modal[lang].word + ` ${selectedWord} - ${selectedWordObj.wordTranslate}`;

    const wrongObjFromStorage = JSON.parse(localStorage.getItem("wrongObj")) || [];
    wrongObjFromStorage.push(selectedWordObj);
    localStorage.setItem("wrongObj", JSON.stringify(wrongObjFromStorage));

   // playSounds(lose);

  }

  useEffect(() => {setIsStartGame(isStartGame)});

  return(
    <div className="popup-container" style={finalMessage.length ? {display: 'flex'} : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>{buttons[lang].next}</button>
      </div>
    </div>
  )
};


const mapStateToProps = (state: RootState) => ({
  lang: state.settingsReducer.lang.lang,
});

export default connect(mapStateToProps, null)(Popup);



