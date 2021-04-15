import React from "react";
import GameMenu from "../GameMenu/GameMenu";

export default function HangmanDescription() {
  const gameName = "виселица";
  const description = "Тренировка Виселица развивает память и навык правописания слов. Чем больше слов ты знаешь, тем больше очков получишь.";
  return (
    <GameMenu gameName={gameName} description={description} />
  );
}
