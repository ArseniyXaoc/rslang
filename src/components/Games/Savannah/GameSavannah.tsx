import React, { useState, useEffect, useRef } from "react";
import {
  useParams,
} from "react-router-dom";
import { connect } from "react-redux";
import ResetGame from "../ResetGame/ResetGame";
import LifeCounterGame from "./LifeCounterGame";
import "./gameSavannah.scss";
import useSound from "use-sound";
import succes from "../../../assets/sound/succes.mp3";
import error from "../../../assets/sound/error.mp3";
import bacground from "../../../assets/images/games/Savannah/b-savannah1.jpg";

import FullScreenButton from "./FullScreenButton";
import API_URL from "../../Constants/constants";

import { RootState } from "../../../redux/reducer";

const URL = API_URL;
// console.log(bacground)

function GameSavannah({ game, user }: { game: { gameFrom: string }, user: {id: any, token: any } }) {
  const { difficulty, page }: {difficulty: string, page: string} = useParams();
  const pageCounter: number = Number(page);

  const [counter, setCounter] = useState(0);
  const [data, setData] = useState([]);
  const [word, setWord] = useState({});
  const [displayWords, setDisplayWords] = useState([]);
  let [gravityCounter, setGravityCounter] = useState(0);
  const [lifeCounter, setLifeCounter] = useState(3);

  const [rightAnswers, setRightAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const [endGame, setEndGame] = useState(false);
  const [wordsDisplayedOnTheScreen, setWordsDisplayedOnTheScreen] = useState("");

  const [playError] = useSound(error);

  const filters = {
    studying: "{\"$and\":[{\"userWord.optional.studying\":\"true\", \"userWord.optional.deleted\":\"false\"}]}",
    difficult: "{\"$and\":[{\"userWord.difficulty\":\"true\", \"userWord.optional.deleted\":\"false\"}]}",
    deleted: "{\"userWord.optional.deleted\":\"true\"}",
    not_deleted: "{\"userWord.optional.deleted\":\"false\"}",
  };

  interface IGetURL {
    [key: string]: string;
  }

  function getUrl(numOfPage: number, urlKey: string) {
    const url:IGetURL = {
      All: `${API_URL}words?group=${Number(difficulty) - 1}&page=${numOfPage}`,
      UserAll: `${API_URL}users/${user.id}/aggregatedWords?group=${Number(difficulty) - 1}&page=${numOfPage}&filter=${filters.not_deleted}&wordsPerPage=20`,
      UserDiff: `${API_URL}users/${user.id}/aggregatedWords?group=${Number(difficulty) - 1}&page=0&filter=${filters.difficult}&wordsPerPage=20`,
      UserStudying: `${API_URL}users/${user.id}/aggregatedWords?group=${Number(difficulty) - 1}&page=0&filter=${filters.studying}&wordsPerPage=20`,
    };
    return url[urlKey];
  }

  function fetchingData(url: string) {
    // console.log(url);
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
            initGame(result[0].paginatedResults);
          } else {
            // console.log(result)
            initGame(result);
          }
        },
        (error) => {
          console.log(error);
        },
      );
  }

  function initGame(data: any) {
    if (data.length < 20) {
      addData(data);
    }

    const dataShuffle = shuffle(data);

    setWord(dataShuffle.pop());
    setData(dataShuffle);
  }

  function getData() {
    if (game.gameFrom === "DICTIONARY") {
      fetchingData(getUrl(pageCounter, "UserDiff"));
    } else {
      fetchingData(getUrl(pageCounter, "All"));
    }
  }

  useEffect(() => {
    getData();
  }, [difficulty]);

  function addData(data: any) {
    let data3;
    fetch(`${API_URL}words?group=${Number(difficulty - 1)}&page=${Number(page - 1)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => res.json())
    .then(resData => {
      data3 = [...data, ...resData];
      data3 = data3.splice(0, 20);
      data3 = shuffle(data3);

      setWord(data3.pop());
      setData(data3);
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    if (counter === 0) return;

    setWord(data.pop());
    setData(data);
  }, [counter]);

  // запушить новую пачку слов в стейт для отображения на экране
  useEffect(() => {
    let res: any = data.filter((elem, index) => {
      if (index > 2) return;
      return elem;
    });

    res = shuffle(res);
    res.push(word);
    res = shuffle(res);
    setDisplayWords(res);
  }, [data, word]);

  // запрос следующей партии слов и слова при бездействии пользователя
  useEffect(() => {
    if (gravityCounter < 170) return;

    setGravityCounter(0);
    setCounter((prev) => prev + 1);
    setLifeCounter((prev) => prev - 1);
    addAnswers(word, setWrongAnswers, wrongAnswers);
    // playError();
  }, [gravityCounter]);

  //  проверка ответа
  function checkWord(e: any) {
    const selectElemValue = e.target.dataset.value;
    const selectElem = e.target;
    const currentElem = document.querySelector(`[data-value="${word.word}"]`);

    const resetWorld = (time: number) => {
      setTimeout(() => {
        setGravityCounter(0);
        setCounter((prev) => prev + 1);
      }, time);
    };

    if (selectElemValue === word.word) {
      selectElem.classList.add("guess");
      audioPlay(succes);
      resetWorld(500);
      // передаём слово, стейт правильных или не правильных ответов, состояние
      addAnswers(word, setRightAnswers, rightAnswers);
    } else {
      selectElem.classList.add("not-guess");
      currentElem.classList.add("guess");
      audioPlay(error);
      resetWorld(1500);
      setLifeCounter((prev) => prev - 1);
      addAnswers(word, setWrongAnswers, wrongAnswers);
    }
  }

  function addAnswers(word: any, state: any, elems: any) {
    if (elems.length === 0) {
      state([word]);
    } else {
      const copy = elems;
      copy.push(word);
      state(copy);
    }
  }

  function audioPlay(src: string) {
    const audio = new Audio(src);
    audio.play();
  }

  // сброс стилей угадал / не угадал
  useEffect(() => {
    if (counter === 0) return;
    document.querySelectorAll(".word-display").forEach((elem, index) => {
      elem.classList.remove("guess");
      elem.classList.remove("not-guess");
    });
  }, [counter]);

  // движение слова вниз
  useEffect(() => {
    if (endGame === true) return;

    const elem : any = document.querySelector(".word-absolute");

    const intervalId = setInterval(() => {
      gravityCounter++;
      setGravityCounter(gravityCounter);

      if(elem) {
        elem.style.top = `${gravityCounter}px`;
      }
      
    }, 50);

    return () => clearInterval(intervalId);
  }, [gravityCounter, endGame]);

  function shuffle(array: any) {
    return array.sort(() => Math.random() - 0.5);
  }

  // конец игры
  useEffect(() => {
    if (lifeCounter <= 0 || counter >= 10) {
      setEndGame(true);
    }
  }, [lifeCounter, counter]);

  useEffect(() => {
  
    const res = displayWords.map((elem: any, index: number) => {
      if(elem === undefined) return;
      return (
          <div
          data-value={elem.word}
          className="word-display"
          key={index}
          onClick={(e) => checkWord(e)}
        >
          {elem.wordTranslate}
        </div>
      )
    })

    setWordsDisplayedOnTheScreen(res);
  }, [displayWords]);

  function resetgame() {
    setLifeCounter(3);
    setGravityCounter(0);
    setCounter(0);
    setEndGame(false);
    setRightAnswers([]);
    setWrongAnswers([]);
    getData();
  }

  if (endGame) {
    return (
      <ResetGame
        maxSerie={rightAnswers.length}
        rightAnswers={rightAnswers}
        wrongAnswers={wrongAnswers}
        resetgame={resetgame}
        gameId={"1"}
      />
    );
  }

  return (
    <div className="words-container">
      <div className="savannah-background-gradient"></div>
      <div className="words-display">
        <LifeCounterGame lifeCounter={lifeCounter} />

        {word ? <div className="word-absolute">{word.word}</div> : ""}
        
        {wordsDisplayedOnTheScreen}
      </div>

      <FullScreenButton />
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  game: state.game,
  user: state.user,
  lang: state.settingsReducer.lang.lang,
});

export default connect(mapStateToProps)(GameSavannah);
