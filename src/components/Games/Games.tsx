import React, { useState, useEffect } from "react";
import {
  Route, Link, useLocation,
  // BrowserRouter, Switch,HashRouter,
} from "react-router-dom";
import { connect } from "react-redux";
import Sprint from "./Sprint/Sprint";
import GameAudioCall from "./AudioCall/GameAudioCall";
import GameSavannah from "./Savannah/GameSavannah";
import GameHangman from "./Hangman/GameHangman";
import "./games.scss";

import GameDescription from "./GameDescription";
import {
  GAME, SELECT_AUDIOCALL, SELECT_SPRINT, SELECT_SAVANNAH, SELECT_HANGMAN,
} from "./gameSettings";

import { RootState } from "../../redux/reducer";

function Games({ lang }: {lang:string}) {
  console.log('--- games', lang);
  const audioCall = () => (<GameAudioCall />);
  const sprint = () => (<Sprint />);
  const savannah = () => (<GameSavannah />);
  const hangman = () => (<GameHangman />);

  const [hideMenu, setHideMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const locationPath = location.pathname;
    const test: any = locationPath.split("/").reverse()[0];

    if (!isNaN(test)) {
      setHideMenu(true);
    } else {
      setHideMenu(false);
    }
  }, [location]);

  return (
    <div className="games-container">

      <div className={hideMenu ? "games-routes hide" : "games-routes"}>
        <div className="games-description">Мини-игры</div>
        <div className="games-links">
        <Link className="links" to="/games/audiocall">{GAME[lang].AUDIOCALL.NAME}</Link>
        <Link className="links" to="/games/sprint">{GAME[lang].SPRINT.NAME}</Link>
        <Link className="links" to="/games/savannah">{GAME[lang].SAVANNA.NAME}</Link>
        <Link className="links" to="/games/hangman">{GAME[lang].HANGMAN.NAME}</Link>
        </div>
      </div>

      <Route path="/games/audiocall">
        <GameDescription gameName={GAME[lang].AUDIOCALL.NAME} description={GAME[lang].AUDIOCALL.DESCRIPTION()}
        game={audioCall} gameSelected ={SELECT_AUDIOCALL} />
      </Route>
      <Route path="/games/sprint">
        <GameDescription gameName={GAME[lang].SPRINT.NAME} description={GAME[lang].SPRINT.DESCRIPTION()}
        game={sprint} gameSelected ={SELECT_SPRINT} />
      </Route>
      <Route path="/games/savannah">
        <GameDescription gameName={GAME[lang].SAVANNA.NAME} description={GAME[lang].SAVANNA.DESCRIPTION()}
        game={savannah} gameSelected ={SELECT_SAVANNAH} />
      </Route>
      <Route path="/games/hangman">
        <GameDescription gameName={GAME[lang].HANGMAN.NAME} description={GAME[lang].HANGMAN.DESCRIPTION()}
        game={hangman} gameSelected ={SELECT_HANGMAN} />
      </Route>

    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  lang: state.settingsReducer.lang.lang,
});

export default connect(mapStateToProps, null)(Games);
