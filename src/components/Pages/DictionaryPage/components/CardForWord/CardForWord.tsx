import React, { useEffect, useState } from "react";
import CardStyles from "./CardStyles";
import voiceImg from "../../../../../assets/icons/voiceIcon.svg";
import { RootState } from "../../../../../redux/reducer";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import API_URL from "../../../../Constants/constants";

const BUTTONS = {
    en: {
        difficultBtn: "Difficult",
        removeBtn: "Delete",
        recoveryBtn: "Recovery"
    },
    ru: {
        difficultBtn: "Сложное",
        removeBtn: "Удалить",
        recoveryBtn: "Восстановить"
    }
}

type Props = {
    cardInfo: any,
    lang: string,
    buttonsSettings: any,
    cardSettings: any,
    user: any,
    isMain: boolean
}

function updateListOfUserWords(data:any, metod:string, url:string, authorizationToken:string,  setCheckedWord, setIsDeleted, setIsDifficult, setIsStudied):void {
    fetch(url, {
        method: metod,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authorizationToken}`
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
      })
      .then((response) => {  
        if (!response.ok) {
            throw Error(response.statusText);
        }
        checkWords(url, authorizationToken, setCheckedWord, setIsDeleted, setIsDifficult, setIsStudied);
        return response;
        })
      .catch((error)=> {console.log(error)});
}

function checkWords(url:string, authorizationToken:string, setCheckedWord, setIsDeleted, setIsDifficult, setIsStudied):any {
    fetch(url , {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authorizationToken}`
        }
    })
      .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
      })
      .then((jsonData) => {
        if (jsonData) {
            setCheckedWord(jsonData);
            setIsDeleted(jsonData.optional.deleted);
            setIsDifficult(jsonData.difficulty);
            setIsStudied(jsonData.optional.studying);
        }
      })
      .catch((error)=> {console.log(error)});
}

const CardForWords: React.FC<Props> = ({cardInfo, lang, buttonsSettings, cardSettings, user, isMain}) => {
    const authorizationToken = user.token;
    const userId = user.id;
    const url = API_URL;
    const useStyles = CardStyles();
    const cardId = cardInfo.id || cardInfo._id;
    const urlRequest = `${url}users/${userId}/words/${cardId}`;
    const [checkedWord, setCheckedWord] = useState("");
    const [isDeleted, setIsDeleted] = useState("false");
    const [isStudied, setIsStudied] = useState("false");
    const [isDifficult, setIsDifficult] = useState("false");

    useEffect(() => {
        const check = async () => {
            const checkURL = `${url}users/${userId}/words/${cardId}`;
            await checkWords(checkURL, authorizationToken, setCheckedWord, setIsDeleted, setIsDifficult, setIsStudied);
        }
        check();
    }, []);

    const handlePlay = () => {
        const allAudio = document.getElementsByTagName("audio");

        for (let i = 0; i < allAudio.length; i++) {
            allAudio[i].pause();
        }
        
        const cardAudio:HTMLMediaElement  = document.getElementById(`${cardInfo.word}_audio`) as HTMLMediaElement;
        const audioExample:HTMLMediaElement   = document.getElementById(`${cardInfo.word}_audioExample`) as HTMLMediaElement;
        const audioMeaning:HTMLMediaElement   = document.getElementById(`${cardInfo.word}_audioMeaning`) as HTMLMediaElement;

        cardAudio.play();

        if (cardSettings[2].state) {
            cardAudio.addEventListener("ended", () => {
                audioExample.play();
            });
        }

        if (cardSettings[1].state) {
            audioExample.addEventListener("ended", () => {
                audioMeaning.play();
            });
        }
    }

    const handleSetAsDifficult = async () => {

        const data = {
            "difficulty": "true",
            "optional": {
                "deleted": "false"
            }
        }

        if (checkedWord) {
           updateListOfUserWords(data, "PUT", urlRequest, authorizationToken, setCheckedWord, setIsDeleted, setIsDifficult, setIsStudied);
        } else {
           updateListOfUserWords(data, "POST", urlRequest, authorizationToken, setCheckedWord, setIsDeleted, setIsDifficult, setIsStudied); 
        }
    }

    const handleRemoveWord = (e: React.ChangeEvent<HTMLInputElement>) => {
        const typeBtn = e.target.parentElement.id;
        const data = {
            "difficulty": "false",
            "optional": {
                "deleted": typeBtn === "deleteBtn" ? "true" : "false",
            }
        }

        if (checkedWord) {
           updateListOfUserWords(data, "PUT", urlRequest, authorizationToken, setCheckedWord, setIsDeleted, setIsDifficult, setIsStudied);
        } else {
           updateListOfUserWords(data, "POST", urlRequest, authorizationToken, setCheckedWord, setIsDeleted, setIsDifficult, setIsStudied);
        }
    }
    
    if (isMain && isDeleted === "false" || !isMain && isDeleted === "true" || !isMain && isDifficult === "true" || !isMain && isStudied === "true") {
        return (
            <div className={useStyles.cardContainer}>
                { cardSettings[4].state ? 
                    <div className={useStyles.cardImg} style={{backgroundImage: `url(${url}${cardInfo.image})`}} /> 
                : null}
                <div className={useStyles.cardDescription}>
                    <div className={useStyles.mainWordContainer}>
                        <div className={isDifficult === "true" ? useStyles.mainDifficultWord : useStyles.mainWord}>
                            {cardInfo.word}
                        </div>
                        { cardSettings[3].state ? 
                        <div className={useStyles.wordTranscription}>
                            {cardInfo.transcription}
                        </div> 
                        : null }
                        {
                            cardSettings[0].state ?
                            <div className={useStyles.wordTranslate}>
                                {` - ${cardInfo.wordTranslate}`}
                            </div> : null
                        }
                        <div className={useStyles.wordVoiceActing} onClick={handlePlay}>
                            <img src={voiceImg} alt="Voice acting for word"/>
                            <audio id={`${cardInfo.word}_audio`}>
                                <source src={`${url}${cardInfo.audio}`} type="audio/mpeg" />
                            </audio>
                            <audio id={`${cardInfo.word}_audioExample`}>
                                <source src={`${url}${cardInfo.audioExample}`} type="audio/mpeg" />
                            </audio>
                            <audio id={`${cardInfo.word}_audioMeaning`}>
                                <source src={`${url}${cardInfo.audioMeaning}`} type="audio/mpeg" />
                            </audio>
                        </div>
                    </div>
                    {
                        cardSettings[2].state ? 
                        <div className={useStyles.exampleContainer}>
                            <div className={useStyles.example} dangerouslySetInnerHTML={{__html: `${cardInfo.textExample}`}}></div>
                            <div className={useStyles.exampleTranslate} >
                                {cardInfo.textExampleTranslate}
                            </div>
                        </div> : null
                    }
                    {
                        cardSettings[1].state ? 
                        <div className={useStyles.exampleContainer}>
                            <div className={useStyles.example} dangerouslySetInnerHTML={{__html: `${cardInfo.textMeaning}`}}></div>
                            <div className={useStyles.exampleTranslate} >
                                {cardInfo.textMeaningTranslate}
                            </div>
                        </div> : null
                    }
                    {
                        !isMain && isStudied === "true" ? 
                        <div className={useStyles.cardScore}>
                            <div>{lang === "en" ? "Study result : " : "Результат изучения: "}</div>
                            <div className={useStyles.rightAnswers}>{checkedWord.optional.rightAnswers ? checkedWord.optional.rightAnswers : 0}</div>
                            <div className={useStyles.wrongAnswers}>{checkedWord.optional.wrongAnswers ? checkedWord.optional.wrongAnswers : 0}</div>
                        </div> : null
                    }
                    {
                        user.id && isMain ?
                        <div className={useStyles.cardButtons}>
                        {
                            buttonsSettings[1].state && isDifficult === "false" ?
                            <Button key="difficultBtn" className={useStyles.cardBtn} onClick={handleSetAsDifficult}>{BUTTONS[lang].difficultBtn}</Button>
                            : null
                        }
                        {
                            buttonsSettings[4].state ? 
                            <Button key="removeBtn" id="deleteBtn" className={useStyles.cardBtn} onClick={handleRemoveWord}>{BUTTONS[lang].removeBtn}</Button>
                            : null
                        }
                        </div> : null
                    }
                    {
                         user.id && !isMain && isDeleted === "true" ? 
                         <div className={useStyles.cardButtons}>
                         {
                             buttonsSettings[5].state ? 
                             <Button key="recoveryBtn" id="recoveryBtn" className={useStyles.cardBtn} onClick={handleRemoveWord}>{BUTTONS[lang].recoveryBtn}</Button>
                             : null
                         }
                         </div> : null
                    }
                </div>
            </div>
        )
    } else {
        return (<></>)
    }
}

const mapStateToProps = (state:RootState) => ({
    lang: state.settingsReducer.lang.lang,
    buttonsSettings: state.settingsReducer.buttonsSettings.buttonsSettings,
    cardSettings: state.settingsReducer.cardSettings.cardSettings,
    user: state.user,
  });
  
  export default connect(mapStateToProps)(CardForWords);