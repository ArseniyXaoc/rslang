import { combineReducers } from "redux";
import {
  settingsReducerLang,
  settingsReducerAutoVoice,
  settingsReducerCountNewWords,
  settingsReducerCountMaxDailyCards,
} from "./main-settings_reducer";
import { settingsReducerButtons, settingsReducerCard } from "./learning-settings_reducer";
import { userReducer } from "./user_reducer";
import gameReducer from "./game_reducer";
import { hangmanReducer } from "./hangman_reducer";


const settingsReducer = combineReducers({
  lang: settingsReducerLang,
  isAutoVoice: settingsReducerAutoVoice,
  countNewWords: settingsReducerCountNewWords,
  countMaxDayCards: settingsReducerCountMaxDailyCards,
  buttonsSettings: settingsReducerButtons,
  cardSettings: settingsReducerCard,
});

const rootReducer = combineReducers({
  settingsReducer,
  user: userReducer,
  game: gameReducer,
  hangman: hangmanReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
