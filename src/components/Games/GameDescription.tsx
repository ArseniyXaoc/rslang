import React from "react";
import {
  Link,
  Route,
} from "react-router-dom";
import GameMenu from "./GameMenu/GameMenu";

interface IGameMenu {
  gameName: string,
  description: string,
  game: React.FC,
  gameSelected: string,
}

export default function AudioCallDescription({
  gameName, description, game, gameSelected,
}: IGameMenu) {
  return (

    <Route path="/games">
      <GameMenu gameName={gameName} description={description} game={game} gameSelected={gameSelected} />
    </Route>
  );
}
