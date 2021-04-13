export const ERROR = "Error";
export const ERROR_WORD = "вечность";
export const RIGHT = "Верно";
export const RIGHT_ARROW = "ArrowRight";
export const LEFT_ARROW = "ArrowLeft";
export const DICTIONARY = "DICTIONARY";
export const GAME_ID = "3";
export interface IButtons {
    en: {
        rightButton: string,
        wrongButton: string,
        start: string,
      },
      ru: {
        rightButton: string,
        wrongButton: string,
        start: string,
      },
}
export const Buttons: IButtons = {
  en: {
    rightButton: "Right",
    wrongButton: "Wrong",
    start: "Get ready!",
  },
  ru: {
    rightButton: "Верно",
    wrongButton: "Неверно",
    start: "Приготовьтесь!",
  },
};
