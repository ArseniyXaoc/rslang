import React, { useEffect, useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import {
  FormControlLabel, FormGroup, FormLabel, withStyles,
} from "@material-ui/core";
import {
  toggleLang, toggleIsAutoVoice, setCountNewWords, setCountMaxDailyCards,
} from "../../../../../redux/main-settings_reducer";
import { RootState } from "../../../../../redux/reducer";
import MainSettingsStyles from "./MainSettingsStyles";
import API_URL from "../../../../Constants/constants";

const StyledLabel = withStyles({
  root: {
    marginBottom: "1em",
  },
})(FormLabel);

const LANGUAGES = {
  en: {
    ru: "Russian",
    en: "English",
  },
  ru: {
    ru: "Русский",
    en: "Английский",
  },
};

const TEXTS = {
  en: {
    mainTitle: "MAIN SETTINGS",
    appSettings: "APP SETTINGS",
    lang: "Language",
    voiceSettings: "VOICE SETTINGS",
    autoVoicePrewiew: "Automatic voice preview",
    dayLearningSettings: "DAY LEARNING SETTINGS",
    numbersNewWords: "Number of new words to learn per day",
    maxNumberOfCards: "Maximum number of cards to learn per day",
  },
  ru: {
    mainTitle: "ОСНОВНЫЕ ПАРАМЕТРЫ",
    appSettings: "НАСТРОЙКИ ПРИЛОЖЕНИЯ",
    lang: "Язык",
    voiceSettings: "НАСТРОЙКИ ЗВУКА",
    autoVoicePrewiew: "Автоматическая озвучка",
    dayLearningSettings: "НАСТРОЙКИ ЕЖЕДНЕВНОГО ОБУЧЕНИЯ",
    numbersNewWords: "Количество новых слов в день для изучения",
    maxNumberOfCards: "Максимальное количество карточек для изучения в день",
  },
};

type Props = {
    lang: string,
    toggleLang: (value: React.ChangeEvent<HTMLInputElement>) => void,
    isAutoVoice: boolean,
    toggleIsAutoVoice: (value: React.ChangeEvent<HTMLInputElement>) => void,
    countNewWords: number,
    setCountNewWords: (value: number) => void,
    countMaxDayCards: number,
    setCountMaxDailyCards: (value: number) => void,
    user: any,
    mainSettings: any
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

const MainSettings: React.FC<Props> = ({
  lang, toggleLang, isAutoVoice, toggleIsAutoVoice, countNewWords, setCountNewWords, countMaxDayCards, setCountMaxDailyCards, user, mainSettings,
}) => {
  const useStyles = MainSettingsStyles();

  useEffect(() => {
    const data = {
      wordsPerDay: countNewWords,
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
  }, [lang, isAutoVoice, countNewWords, countMaxDayCards]);

  return (
    <div className={useStyles.settingsContainer}>
        <h2>{TEXTS[lang].mainTitle}</h2>
        <div className={useStyles.mainSettingsContainer}>
            <FormControl component="fieldset">
                <StyledLabel component="legend" classes={useStyles.formLabel}>{TEXTS[lang].appSettings}</StyledLabel>
                <FormGroup>
                    <FormControl variant="outlined" className={useStyles.formControlLang}>
                        <InputLabel id="demo-simple-select-outlined-label">{TEXTS[lang].lang}</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={lang}
                        onChange={toggleLang}
                        label="Language"
                        >
                            {
                                Object.keys(LANGUAGES[lang]).map((item) => <MenuItem key={item} value={item}>{LANGUAGES[lang][item]}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </FormGroup>
            </FormControl>
            <FormControl component="fieldset">
                <StyledLabel component="legend">{TEXTS[lang].voiceSettings}</StyledLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={isAutoVoice}
                                    onChange={toggleIsAutoVoice}
                                    color="primary"
                                    classes={{ switchBase: useStyles.switchBase }}
                                />
                            }
                            label={TEXTS[lang].autoVoicePrewiew}
                        />
                    </FormGroup>
                </FormControl>
            <div>
                <FormControl component="fieldset">
                    <FormLabel component="legend">{TEXTS[lang].dayLearningSettings}</FormLabel>
                    <FormGroup>
                        <div className={useStyles.dailySettings}>
                            <span>{TEXTS[lang].numbersNewWords}</span>
                            <div className={useStyles.dailySettingsBtnGroup}>
                                <Button className={useStyles.daylySettingsBtn} onClick={() => { setCountNewWords(countNewWords - 1); }}>-</Button>
                                <div>{countNewWords}</div>
                                <Button className={useStyles.daylySettingsBtn} onClick={() => { setCountNewWords(countNewWords + 1); }}>+</Button>
                            </div>
                        </div>
                        <div className={useStyles.dailySettings}>
                            <span>{TEXTS[lang].maxNumberOfCards}</span>
                            <div className={useStyles.dailySettingsBtnGroup}>
                                <Button className={useStyles.daylySettingsBtn} onClick={() => { setCountMaxDailyCards(countMaxDayCards - 1); }}>-</Button>
                                <div>{countMaxDayCards}</div>
                                <Button className={useStyles.daylySettingsBtn} onClick={() => { setCountMaxDailyCards(countMaxDayCards + 1); }}>+</Button>
                            </div>
                        </div>
                    </FormGroup>
                </FormControl>
        </div>
        </div>
    </div>
  );
};

const mapStateToProps = (state:RootState) => ({
  mainSettings: state.settingsReducer,
  lang: state.settingsReducer.lang.lang,
  isAutoVoice: state.settingsReducer.isAutoVoice.isAutoVoice,
  countNewWords: state.settingsReducer.countNewWords.countNewWords,
  countMaxDayCards: state.settingsReducer.countMaxDayCards.countMaxDayCards,
  user: state.user,
});

const mapDispatchToProps = {
  toggleLang,
  toggleIsAutoVoice,
  setCountNewWords,
  setCountMaxDailyCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainSettings);
