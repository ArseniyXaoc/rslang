import React, { useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import { connect } from "react-redux";
import {
  FormControlLabel, FormGroup, FormLabel, withStyles,
} from "@material-ui/core";
import { RootState } from "../../../../../redux/reducer";
import { toggleButtonsSettings, toggleCardSetting } from "../../../../../redux/learning-settings_reducer";
import LearnSettingsStyles from "./LearnSettingsStyles";
import API_URL from "../../../../Constants/constants";

const BlueCheckbox = withStyles({
  root: {
    color: "#1665B4",
    "&$checked": {
      color: "#1665B4",
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const StyledLabel = withStyles({
  root: {
    marginBottom: "1em",
  },
})(FormLabel);

const TEXTS = {
  en: {
    mainTitle: "CARDS VIEW SETTINGS",
    buttonSettings: "BUTTON DISPLAY SETTINGS",
    cardSettings: "CARD DISPLAY SETTINGS",
  },
  ru: {
    mainTitle: "НАСТРОЙКИ ИЗУЧЕНИЯ СЛОВ",
    buttonSettings: "НАСТРОЙКИ ОТОБРАЖЕНИЯ КНОПОК",
    cardSettings: "НАСТРОЙКИ ОТОБРАЖЕНИЯ КАРТОЧКИ",
  },
};

const BUTTON_NAME = {
  en: {
    repeateBtn: "«Repeat» button",
    difficultBtn: "«Difficult» button",
    goodBtn: "«Good» button",
    easyBtn: "«Easy» button",
    deleteBtn: "«Delete» button",
    recoveryBtn: "Recovery button",
  },
  ru: {
    repeateBtn: "Кнопка «Повторить»",
    difficultBtn: "Кнопка «Сложно»",
    goodBtn: "Кнопка «Хорошо»",
    easyBtn: "Кнопка «Легко»",
    deleteBtn: "Кнопка «Удалить»",
    recoveryBtn: "Кнопка «Восстановить»",
  },
};

const CARD_SETTINGS = {
  en: {
    wordTranslate: "Word translation",
    wordMean: "Meaning of the word",
    wordUsing: "An example of using the word",
    wordTranscription: "Word transcription",
    wordAssociation: "Picture association",
    wordAnswer: "Show answer button",
  },
  ru: {
    wordTranslate: "Перевод слова",
    wordMean: "Смысл слова",
    wordUsing: "Пример использования слова",
    wordTranscription: "Транскрипция слова",
    wordAssociation: "Картинка-ассоциация",
    wordAnswer: "Кнопка «Показать ответ»",
  },
};

type Props = {
    lang: string,
    toggleButtonsSettings: (value: React.ChangeEvent<HTMLInputElement>) => void,
    buttonsSettings: any,
    toggleCardSetting: (value: React.ChangeEvent<HTMLInputElement>) => void,
    cardSettings: any,
    mainSettings: any,
    user: any
}

function setUserSettings(url:string, token:string, data:any) {
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
    })
    .catch((error) => { console.log(error); });
}

function createCheckboxSettings(checkbox:any, name:string, toggleFunction: (value: React.ChangeEvent<HTMLInputElement>) => void) {
  return (
      <FormControlLabel
          key={checkbox.id}
          control={<BlueCheckbox checked={checkbox.state} onChange={toggleFunction} name={checkbox.id} />}
          label={name}
      />
  );
}

const LearnWordSettings: React.FC<Props> = ({
  lang, buttonsSettings, toggleButtonsSettings, cardSettings, toggleCardSetting, mainSettings, user,
}) => {
  const useStyles = LearnSettingsStyles();

  useEffect(() => {
    const data = {
      wordsPerDay: mainSettings.countNewWords.countNewWords,
      optional: {
        buttonsSettings: mainSettings.buttonsSettings,
        cardSettings: mainSettings.cardSettings,
        lang: mainSettings.lang.lang,
        countMaxDayCards: mainSettings.countMaxDayCards.countMaxDayCards,
        isAutoVoice: mainSettings.isAutoVoice.isAutoVoice,
      },
    };

    localStorage.setItem("rsLangSettings", JSON.stringify(data));
    const settingsUrl = `${API_URL}users/${user.id}/settings`;
    setUserSettings(settingsUrl, user.token, data);
  }, [buttonsSettings, cardSettings]);

  return (
    <div className={useStyles.settingsContainer}>
        <h2>{TEXTS[lang].mainTitle}</h2>
        <div className={useStyles.formsContainer}>
        <FormControl component="fieldset" className={useStyles.formControl}>
            <StyledLabel component="legend">{TEXTS[lang].buttonSettings}</StyledLabel>
            <FormGroup>
            {buttonsSettings.map((checkbox: any) => {
              const buttonName = BUTTON_NAME[lang][checkbox.id] || undefined;
              return createCheckboxSettings(checkbox, buttonName, toggleButtonsSettings);
            })}
            </FormGroup>
       </FormControl>
       <FormControl component="fieldset" className={useStyles.formControl}>
            <StyledLabel component="legend">{TEXTS[lang].cardSettings}</StyledLabel>
            <FormGroup>
            {cardSettings.map((checkbox: any) => {
              const cardName = CARD_SETTINGS[lang][checkbox.id] || undefined;
              return createCheckboxSettings(checkbox, cardName, toggleCardSetting);
            })}
            </FormGroup>
       </FormControl>
       </div>
    </div>
  );
};

const mapStateToProps = (state:RootState) => ({
  lang: state.settingsReducer.lang.lang,
  buttonsSettings: state.settingsReducer.buttonsSettings.buttonsSettings,
  cardSettings: state.settingsReducer.cardSettings.cardSettings,
  mainSettings: state.settingsReducer,
  user: state.user,
});

const mapDispatchToProps = {
  toggleButtonsSettings,
  toggleCardSetting,
};

export default connect(mapStateToProps, mapDispatchToProps)(LearnWordSettings);
