import React from "react";

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
      state: true,
    },
    {
      id: "difficultBtn",
      state: true,
    },
    {
      id: "goodBtn",
      state: true,
    },
    {
      id: "easyBtn",
      state: true,
    },
    {
      id: "deleteBtn",
      state: true,
    },
    {
      id: "recoveryBtn",
      state: true,
    },
  ],
};

export const settingsReducerButtons = (state = initialStateButtons, action:any): InitialStateTypeButtons => {
  const newButtonSettings = state.buttonsSettings.slice();
  const index = newButtonSettings.findIndex((item) => item.id === action.target);
  switch (action.type) {
    case TOGGLE_BUTTON_SETTINGS:
      newButtonSettings[index].state = action.value;
      return { ...state, buttonsSettings: [...newButtonSettings] };

    default: return state;
  }
};

export type ToggleButtonsActionType = {
    type: typeof TOGGLE_BUTTON_SETTINGS,
    target: any,
    value: any,
    payload: any
}

export const toggleButtonsSettings = (buttonsSettings: React.ChangeEvent<HTMLInputElement>):ToggleButtonsActionType => ({
  type: TOGGLE_BUTTON_SETTINGS,
  target: buttonsSettings.target.name,
  value: buttonsSettings.target.checked,
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
      state: true,
    },
    {
      id: "wordMean",
      state: true,
    },
    {
      id: "wordUsing",
      state: true,
    },
    {
      id: "wordTranscription",
      state: true,
    },
    {
      id: "wordAssociation",
      state: true,
    },
    {
      id: "wordAnswer",
      state: true,
    },
  ],
};

export const settingsReducerCard = (state = initialStateCard, action:any): InitialStateTypeCard => {
  const newCardSettings = state.cardSettings.slice();
  const index = newCardSettings.findIndex((item) => item.id === action.target);
  switch (action.type) {
    case TOGGLE_CARD_SETTINGS:
      newCardSettings[index].state = action.value;
      return { ...state, cardSettings: [...newCardSettings] };

    default: return state;
  }
};

export type ToggleCardSettingsActionType = {
    type: typeof TOGGLE_CARD_SETTINGS,
    target: any,
    value: any,
    payload: any
}

export const toggleCardSetting = (cardSettings: React.ChangeEvent<HTMLInputElement>):ToggleCardSettingsActionType => ({
  type: TOGGLE_CARD_SETTINGS,
  target: cardSettings.target.name,
  value: cardSettings.target.checked,
  payload: cardSettings,
});
