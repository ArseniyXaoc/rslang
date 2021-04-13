import React from "react";

const userLocalSettings = localStorage.getItem("rsLangSettings") ? JSON.parse(localStorage.getItem("rsLangSettings")) : "";

// Language reducer
const TOGGLE_LANGUAGE = "TOGGLE_LANGUAGE";

export type InitialStateTypeLang = {
    lang: string
}

const initialStateLang: InitialStateTypeLang = {
  lang: userLocalSettings ? userLocalSettings.optional.lang : "ru",
};

export const settingsReducerLang = (state = initialStateLang, action:any): InitialStateTypeLang => {
  switch (action.type) {
    case TOGGLE_LANGUAGE:
      return { ...state, lang: action.value };

    default: return state;
  }
};

export type ToggleLangActionType = {
    type: typeof TOGGLE_LANGUAGE,
    value: any,
    payload: any
}

export const toggleLang = (lang:any):ToggleLangActionType => ({
  type: TOGGLE_LANGUAGE,
  value: lang.target ? lang.target.value : lang,
  payload: lang.target ? lang.target.value : lang,
});

// Automatic voice preview

const TOGGLE_ISAUTOVOICE = "TOGGLE_ISAUTOVOICE";

export type InitialStateTypeIsAutoVoice = {
    isAutoVoice: boolean
}

const initialStateIsAutoVoice: InitialStateTypeIsAutoVoice = {
  isAutoVoice: userLocalSettings ? userLocalSettings.optional.isAutoVoice : true,
};

export const settingsReducerAutoVoice = (state = initialStateIsAutoVoice, action: any): InitialStateTypeIsAutoVoice => {
  switch (action.type) {
    case TOGGLE_ISAUTOVOICE:
      return { ...state, isAutoVoice: action.value };

    default: return state;
  }
};

export type ToggleIsAutoVoiceActionType = {
    type: typeof TOGGLE_ISAUTOVOICE,
    value: any,
    payload: any
}

export const toggleIsAutoVoice = (isAutoVoice: React.ChangeEvent<HTMLInputElement>):ToggleIsAutoVoiceActionType => ({
  type: TOGGLE_ISAUTOVOICE,
  value: isAutoVoice.target ? isAutoVoice.target.checked : isAutoVoice,
  payload: isAutoVoice.target ? isAutoVoice.target.checked : isAutoVoice,
});

// Change count daily learning words

const SET_COUNTNEWWORDS = "SET_COUNTNEWWORDS";

export type InitialStateTypeCountNewWords = {
    countNewWords: number
}

const initialStateCountNewWords: InitialStateTypeCountNewWords = {
  countNewWords: userLocalSettings ? userLocalSettings.wordsPerDay : 10,
};

export const settingsReducerCountNewWords = (state = initialStateCountNewWords, action: any): InitialStateTypeCountNewWords => {
  switch (action.type) {
    case SET_COUNTNEWWORDS:
      return { ...state, countNewWords: action.value };

    default: return state;
  }
};

export type ToggleCountNewWordsActionType = {
    type: typeof SET_COUNTNEWWORDS,
    value: any,
    payload: any
}

export const setCountNewWords = (countNewWords: number):ToggleCountNewWordsActionType => ({
  type: SET_COUNTNEWWORDS,
  value: countNewWords,
  payload: countNewWords,
});

// Change count daily cards

const SET_COUNTDAILYCARDS = "SET_COUNTDAILYCARDS";

export type InitialStateTypeCountMaxDailyCards = {
    countMaxDayCards: number
}

const initialStateCountMaxDailyCards: InitialStateTypeCountMaxDailyCards = {
  countMaxDayCards: userLocalSettings ? userLocalSettings.optional.countMaxDayCards : 10,
};

export const settingsReducerCountMaxDailyCards = (state = initialStateCountMaxDailyCards, action: any): InitialStateTypeCountMaxDailyCards => {
  switch (action.type) {
    case SET_COUNTDAILYCARDS:
      return { ...state, countMaxDayCards: action.value };

    default: return state;
  }
};

export type ToggleCountMaxDailyCardsActionType = {
    type: typeof SET_COUNTDAILYCARDS,
    value: any,
    payload: any
}

export const setCountMaxDailyCards = (countMaxDayCards: number):ToggleCountMaxDailyCardsActionType => ({
  type: SET_COUNTDAILYCARDS,
  value: countMaxDayCards,
  payload: countMaxDayCards,
});
