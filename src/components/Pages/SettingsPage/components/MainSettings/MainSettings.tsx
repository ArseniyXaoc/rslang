import React, { useState } from "react";
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
  toggleLang, toggleIsAutoVoice, incrementCountNewWords, decrimentCountNewWords, decrimentCountMaxDailyCards, incrementCountMaxDailyCards,
} from "../../../../../redux/main-settings_reducer";
import { RootState } from "../../../../../redux/reducer";
import MainSettingsStyles from "./MainSettingsStyles";

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
    incrementCountNewWords: (value: number) => void,
    decrimentCountNewWords: (value: number) => void,
    countMaxDayCards: number,
    incrementCountMaxDailyCards: (value: number) => void,
    decrimentCountMaxDailyCards: (value: number) => void,
}

const MainSettings: React.FC<Props> = ({
  lang, toggleLang, isAutoVoice, toggleIsAutoVoice, countNewWords, incrementCountNewWords, decrimentCountNewWords, countMaxDayCards, incrementCountMaxDailyCards, decrimentCountMaxDailyCards,
}) => {
  const useStyles = MainSettingsStyles();
  const [countNewdaylyWords, setCountNewdaylyWords] = useState<number>(countNewWords);
  const [countMaxCards, setCountMaxCards] = useState<number>(countMaxDayCards);

  const handleChangeSubstractCount = () => {
    setCountNewdaylyWords(countNewdaylyWords - 1);
    decrimentCountNewWords(countNewdaylyWords);
  };

  const handleChangeAddCount = () => {
    setCountNewdaylyWords(countNewdaylyWords + 1);
    incrementCountNewWords(countNewdaylyWords);
  };

  const handleChangeSubstractCountMaxDayCards = () => {
    setCountMaxCards(countMaxCards - 1);
    decrimentCountMaxDailyCards(countMaxCards);
  };

  const handleChangeAddCountMaxDayCards = () => {
    setCountMaxCards(countMaxCards + 1);
    incrementCountMaxDailyCards(countMaxCards);
  };

  return (
    <div className={useStyles.settingsContainer}>
      <h1>Настройки</h1>
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
                                <Button className={useStyles.daylySettingsBtn} onClick={handleChangeAddCount}>+</Button>
                                <div>{countNewWords}</div>
                                <Button className={useStyles.daylySettingsBtn} onClick={handleChangeSubstractCount}>-</Button>
                            </div>
                        </div>
                        <div className={useStyles.dailySettings}>
                            <span>{TEXTS[lang].maxNumberOfCards}</span>
                            <div className={useStyles.dailySettingsBtnGroup}>
                                <Button className={useStyles.daylySettingsBtn} onClick={handleChangeAddCountMaxDayCards}>+</Button>
                                <div>{countMaxDayCards}</div>
                                <Button className={useStyles.daylySettingsBtn} onClick={handleChangeSubstractCountMaxDayCards}>-</Button>
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
  lang: state.settingsReducer.lang.lang,
  isAutoVoice: state.settingsReducer.isAutoVoice.isAutoVoice,
  countNewWords: state.settingsReducer.countNewWords.countNewWords,
  countMaxDayCards: state.settingsReducer.countMaxDayCards.countMaxDayCards,
});

const mapDispatchToProps = {
  toggleLang,
  toggleIsAutoVoice,
  decrimentCountNewWords,
  incrementCountNewWords,
  incrementCountMaxDailyCards,
  decrimentCountMaxDailyCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainSettings);
