import React from "react";

const userLocalSettings = localStorage.getItem("rsLangSettings") ? JSON.parse(localStorage.getItem("rsLangSettings")) : "";
const localButtonSettings = userLocalSettings ? userLocalSettings.optional.buttonsSettings.buttonsSettings : "";
const localCardSettings = userLocalSettings ? userLocalSettings.optional.cardSettings.cardSettings : "";

const TOGGLE_BUTTON_SETTINGS = "TOGGLE_BUTTON_SETTINGS";

export type InitialStateTypeButtons = {
    buttonsSettings: [
        {
            id: string,
            state: boolean
        },
        {
            id: string,
            state: boolean
        },
        {
            id: string,
            state: boolean
        },
        {
            id: string,
            state: boolean
        },
        {
            id: string,
            state: boolean
        },
        {
          id: string,
          state: boolean
      },
    ]
}

const initialStateButtons: InitialStateTypeButtons = {
  buttonsSettings: [
    {
      id: "repeateBtn",
      state: localButtonSettings ? localButtonSettings[0].state : true,
    },
    {
      id: "difficultBtn",
      state: localButtonSettings ? localButtonSettings[1].state : true,
    },
    {
      id: "goodBtn",
      state: localButtonSettings ? localButtonSettings[2].state : true,
    },
    {
      id: "easyBtn",
      state: localButtonSettings ? localButtonSettings[3].state : true,
    },
    {
      id: "deleteBtn",
      state: localButtonSettings ? localButtonSettings[4].state : true,
    },
    {
      id: "recoveryBtn",
      state: localButtonSettings ? localButtonSettings[5].state : true,
    },
  ],
};

export const settingsReducerButtons = (state = initialStateButtons, action:any): InitialStateTypeButtons => {
  const newButtonSettings = state.buttonsSettings.slice();
  const index = action.target ? newButtonSettings.findIndex((item) => item.id === action.target) : -1;

  switch (action.type) {
    case TOGGLE_BUTTON_SETTINGS:
      if (action.target) {
        newButtonSettings[index].state = action.value;
      }
      return { ...state, buttonsSettings: action.target ? [...newButtonSettings] : action.value };

    default: return state;
  }
};

export type ToggleButtonsActionType = {
    type: typeof TOGGLE_BUTTON_SETTINGS,
    target: any,
    value: any,
    payload: any
}

export const toggleButtonsSettings = (buttonsSettings:any):ToggleButtonsActionType => ({
  type: TOGGLE_BUTTON_SETTINGS,
  target: buttonsSettings.target ? buttonsSettings.target.name : null,
  value: buttonsSettings.target ? buttonsSettings.target.checked : buttonsSettings,
  payload: buttonsSettings,
});

// CARD DISPLAY SETTINGS

const TOGGLE_CARD_SETTINGS = "TOGGLE_CARD_SETTINGS";

export type InitialStateTypeCard = {
    cardSettings: [
        {
            id: string,
            state: boolean
        },
        {
            id: string,
            state: boolean
        },
        {
            id: string,
            state: boolean
        },
        {
            id: string,
            state: boolean
        },
        {
            id: string,
            state: boolean
        },
        {
            id: string,
            state: boolean
        },
    ]
}

const initialStateCard: InitialStateTypeCard = {
  cardSettings: [
    {
      id: "wordTranslate",
      state: localCardSettings ? localCardSettings[0].state : true,
    },
    {
      id: "wordMean",
      state: localCardSettings ? localCardSettings[1].state : true,
    },
    {
      id: "wordUsing",
      state: localCardSettings ? localCardSettings[2].state : true,
    },
    {
      id: "wordTranscription",
      state: localCardSettings ? localCardSettings[3].state : true,
    },
    {
      id: "wordAssociation",
      state: localCardSettings ? localCardSettings[4].state : true,
    },
    {
      id: "wordAnswer",
      state: localCardSettings ? localCardSettings[5].state : true,
    },
  ],
};

export const settingsReducerCard = (state = initialStateCard, action:any): InitialStateTypeCard => {
  const newCardSettings = state.cardSettings.slice();
  const index = action.target ? newCardSettings.findIndex((item) => item.id === action.target) : -1;

  switch (action.type) {
    case TOGGLE_CARD_SETTINGS:
      if (action.target) {
        newCardSettings[index].state = action.value;
      }
      return { ...state, cardSettings: action.target ? [...newCardSettings] : action.value };
    default: return state;
  }
};

export type ToggleCardSettingsActionType = {
  type: typeof TOGGLE_CARD_SETTINGS,
  target: any,
  value: any,
  payload: any
}

export const toggleCardSetting = (cardSettings:any):ToggleCardSettingsActionType => ({
  type: TOGGLE_CARD_SETTINGS,
  target: cardSettings.target ? cardSettings.target.name : null,
  value: cardSettings.target ? cardSettings.target.checked : cardSettings,
  payload: cardSettings,
});
