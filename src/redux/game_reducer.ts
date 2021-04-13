interface IinitialGameState {
  currentGame: string,
  gameFrom: string
}
const initialGameState: IinitialGameState = {
  currentGame: "",
  gameFrom: "",
};
const GAME_SET_TEXTBOOK = "GAME_SET_TEXTBOOK";
const GAME_SET_DICTIONARY = "GAME_SET_DICTIONARY";
const GAME_SET_DEFAULT = "GAME_SET_DEFAULT";

const gameReducer = (state = initialGameState, action: any) => {
  switch (action.type) {
    case GAME_SET_TEXTBOOK:
      return ({ ...state, gameFrom: "TEXTBOOK" });
    case GAME_SET_DICTIONARY:
      return ({ ...state, gameFrom: "DICTIONARY" });
    case GAME_SET_DEFAULT:
      return ({ ...state, gameFrom: "" });
    default:
      return state;
  }
};

export default gameReducer;
