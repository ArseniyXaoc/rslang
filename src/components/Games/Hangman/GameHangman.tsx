import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router";
import { RootState } from "../../../redux/reducer";
import Figure from "./Figure";
import WrongLetters from "./WrongLetters";
import Word from "./Word";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";

import API_URL from "../../Constants/constants";
import { showNotification as show, checkWin, playSounds } from "./helpers";
import {connect, useDispatch} from "react-redux";
import Popup from "./Popup";
import SelectLevel from "./SelectLevel";
import ResetGame from "../ResetGame/ResetGame";
import { alert as message, buttons } from "./Constants";
import "./GameHangmanStyles.scss";

const URL = API_URL;

const filters = {
  studying: "{\"$and\":[{\"userWord.optional.studying\":\"true\", \"userWord.optional.deleted\":\"false\"}]}",
  difficult: "{\"$and\":[{\"userWord.difficulty\":\"true\", \"userWord.optional.deleted\":\"false\"}]}",
  deleted: "{\"userWord.optional.deleted\":\"true\"}",
  not_deleted: "{\"userWord.optional.deleted\":\"false\"}",
};

interface IGameHangman {
  game: { gameFrom: string },
  user: { id: any, token: any },
}

interface ICurrentWord {
  word: string,
  checkTranslate: string,
  wordTranslate: string,
  isTrueTranslate: boolean,
  id?: string,
  _id?: string,
  audio: string,
}

interface IGetURL {
  [key: string]: string;
}

function setFullScreen(){
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

function shuffle(array: any) {
  return array.sort(() => Math.random() - 0.5);
}

function GameHangman({ game, user, lang }: IGameHangman) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [wordsData, setWordsData] = useState([]);
  const [resultLength, setResultLength] = useState(0);
  const [wordsCounter, setWordsCounter] = useState(0);
  const [selectedWordObj, setSelectedWordObj] = useState({});
  const [errors, setErrors] = useState("");
  const [selectedWord, setSelectedWord] = useState("");
  const [isStartGame, setIsStartGame] = useState(false);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [canSeeStatistics, setCanSeeStatistics] = useState(false);

  const {difficulty, page} = useParams();
  const dispatch = useDispatch();
  let wordObj, shuffledData;

  function getUrl(numOfPage: number, urlKey: string) {
    const url: IGetURL = {
      All: `${API_URL}words?group=${Number(difficulty) - 1}&page=${numOfPage}`,
      UserAll: `${API_URL}users/${user.id}/aggregatedWords?group=${Number(difficulty) - 1}&page=${numOfPage}&filter=${filters.not_deleted}&wordsPerPage=20`,
      UserDiff: `${API_URL}users/${user.id}/aggregatedWords?group=${Number(difficulty) - 1}&page=0&filter=${filters.difficult}&wordsPerPage=20`,
      UserStudying: `${API_URL}users/${user.id}/aggregatedWords?group=${Number(difficulty) - 1}&page=0&filter=${filters.studying}&wordsPerPage=20`,
    };
    return url[urlKey];
  }

  function getWords(url: string) {
    console.log(url);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (game.gameFrom === "DICTIONARY") {
            if (!result[0].paginatedResults.length) {
              alert("No words received")
              //setNoWords(true);
            }
            setResultLength(result[0].paginatedResults.length);
            console.log("resultLength", resultLength);
            setIsLoaded(true);
            shuffledData = shuffle(result[0].paginatedResults);
            setWordsData(shuffledData);
            wordObj = shuffledData.pop();
            setSelectedWordObj(wordObj);
            setSelectedWord(wordObj.word);
          } else {
            if (!result.length) {
              alert("No words received")
              // setNoWords(true);
            }
            setResultLength(result.length);
            console.log("resultLength", resultLength);
            setIsLoaded(true);
            shuffledData = shuffle(result);
            setWordsData(shuffledData);
            wordObj = shuffledData.pop();
            setSelectedWordObj(wordObj);
            setSelectedWord(wordObj.word);
          }
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
        },
      );
    return function cleanup() {
      setWordsData([]);
    };
  }

  // function getWords() {
  //   fetch(`${URL}words?group=${difficulty - 1}&page=${page}`)
  //     .then((response) => response.json())
  //     .then((result) => {
        // setResultLength(result.length);
        // console.log("resultLength", resultLength);
        // setIsLoaded(true);
        // shuffledData = shuffle(result);
        // setWordsData(shuffledData);
        // wordObj = shuffledData.pop();
        // setSelectedWordObj(wordObj);
        // setSelectedWord(wordObj.word);

  //       console.log(wordObj.word);
  //       console.log(shuffledData);

  //     })
  // }

  useEffect(() => {
    if (game.gameFrom === "DICTIONARY") {
      getWords(getUrl(page, "UserDiff"));
    } else {
      getWords(getUrl(page, "All"));
    }
  }, []);

  function gameInit(errors) {
    if (errors === "") {
      alert(`${message[lang].alert}`);
    } else {
      dispatch({type: "START_GAME"});
      setIsStartGame(true);
      localStorage.removeItem('rightObj');
      localStorage.removeItem('wrongObj');
      if(wordsCounter < resultLength) {
        setWordsCounter(wordsCounter + 1);
      }
    }
    console.log("selectedWordObj", selectedWordObj);
  }

  useEffect(() => {
    const handleKeydown = (event: any) => {
      const {key, keyCode} = event;

      if (isStartGame && selectedWord && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        // isAudioPlaying && playSounds(click);

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter])
          } else {
            show(setShowNotification);
            // isAudioPlaying && playSounds(note);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);

          } else {
            show(setShowNotification);
            // isAudioPlaying && playSounds(note);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, isStartGame]);


  const notification = (showNotification) => {
    return (
      <div className={`notification-container ${showNotification ? 'show' : ''}`}>
        <p>You have already entered this letter</p>
      </div>
    )
  };

  function resetGame() {
    setResultLength(0);
    setWordsCounter(0);
    setIsLoaded(false);
    setWordsData([]);
    setSelectedWordObj({});
    setSelectedWord("");
    setCorrectLetters([]);
    setWrongLetters([]);
    setCanSeeStatistics(false);
    setErrors("");
    if (game.gameFrom === "DICTIONARY") {
      getWords(getUrl(page, "UserDiff"));
    } else {
      getWords(getUrl(page, "All"));
    }
  }

  function playAgain() {
    if (wordsData.length) {
      wordObj = wordsData.pop();
      setSelectedWordObj(wordObj);
      setSelectedWord(wordObj.word);
      setWordsCounter(wordsCounter + 1);
      setIsStartGame(true);
      setCorrectLetters([]);
      setWrongLetters([]);
    } else {
      setIsStartGame(false);
      setCorrectLetters([]);
      setWrongLetters([]);
      setCanSeeStatistics(true);
    }
    //setIsAudioPlaying(false);
    console.log("selectedWordObj", selectedWordObj);
  }


  let rightAnswers, wrongAnswers;

  if (canSeeStatistics) {
    const rightAnswersStore = JSON.parse(localStorage.getItem('rightObj')) || [];
    const wrongAnswersStore = JSON.parse(localStorage.getItem('wrongObj')) || [];

    if (rightAnswersStore.length || wrongAnswersStore.length) {

      const rightSet = new Set();
      rightAnswers = rightAnswersStore.filter(el => {
        const duplicate = rightSet.has(el.id);
        rightSet.add(el.id);
        return !duplicate;
      });

      const wrongSet = new Set();
      wrongAnswers = wrongAnswersStore.filter(el => {
        const duplicate = wrongSet.has(el.id);
        wrongSet.add(el.id);
        return !duplicate;
      });
  }
}

  if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else if (!canSeeStatistics) {
    return (

      <div>
        <div className="hangman-buttons">
          <div className="hangman-counter">{wordsCounter} / {resultLength}</div>
          <div className="hangman-start" onClick={() => gameInit(errors)}>{buttons[lang].start}</div>
          <SelectLevel setErrors={setErrors}/>
        </div>
        <div className="hangman-container">
          <Figure wrongLetters={wrongLetters}/>
          <WrongLetters wrongLetters={wrongLetters}/>
          {isStartGame && <Word selectedWord={selectedWord} correctLetters={correctLetters}/>}

          <div className="hangman-fullscreen-button">
            <AspectRatioIcon
              onClick={setFullScreen}
              className="fullscreen-button-cursor"
              fontSize="large"
              color="primary"
            />
          </div>
          {!!checkWin(correctLetters, wrongLetters, selectedWord, errors).length
          && <Popup
            selectedWordObj={selectedWordObj}
            correctLetters={correctLetters}
            wrongLetters={wrongLetters}
            selectedWord={selectedWord}
            errors={errors}
            playAgain={playAgain}
            setIsStartGame={setIsStartGame}
            // isAudioPlaying={isAudioPlaying}
            // setIsAudioPlaying={setIsAudioPlaying}
          />}
          {notification(showNotification)}
        </div>
      </div>
    )
  } else {
    return (

      <ResetGame
        maxSerie={rightAnswers.length}
        rightAnswers={rightAnswers}
        wrongAnswers={wrongAnswers}
        resetgame={resetGame}
        gameId={"4"}
      />
    )
  }
};

const mapStateToProps = (state: RootState) => ({
  game: state.game,
  user: state.user,
  lang: state.settingsReducer.lang.lang,
});

export default connect(mapStateToProps, null)(GameHangman);
