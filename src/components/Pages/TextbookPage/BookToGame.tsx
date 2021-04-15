import React, { useState, useEffect, useCallback } from "react";
import { connect, useDispatch } from "react-redux";
import {
  Link,
} from "react-router-dom";
import { RootState } from "../../../redux/reducer";
import {
  GAME,
} from "../../Games/gameSettings";

function BookToGame({
  difficulty, page, from, lang,
}) {
  const dispatch = useDispatch();
  const handleGame = useCallback(() => {
    if (from === "TEXTBOOK") {
      dispatch({ type: "GAME_SET_TEXTBOOK" });
    } else if (from === "DICTIONARY") {
      dispatch({ type: "GAME_SET_DICTIONARY" });
    }
  }, []);
  handleGame();
  return (
    <div className="game-links">
      <Link className="link-navigation" to={`/games/audiocall/level/${difficulty}/${page}`}>
        {GAME[lang].AUDIOCALL.NAME}</Link>
      <Link className="link-navigation" to={`/games/sprint/level/${difficulty}/${page}`}>{
      GAME[lang].SPRINT.NAME}</Link>
      <Link className="link-navigation" to={`/games/savannah/level/${difficulty}/${page}`}>{
      GAME[lang].SAVANNA.NAME}</Link>
      <Link className="link-navigation" to={`/games/hangman/level/${difficulty}/${page}`}>{
      GAME[lang].HANGMAN.NAME}</Link>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  lang: state.settingsReducer.lang.lang,
});

export default connect(mapStateToProps, null)(BookToGame);
