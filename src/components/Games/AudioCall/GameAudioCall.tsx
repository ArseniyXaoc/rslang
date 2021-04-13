import React, { useState, useEffect } from "react";
import SpeakerIcon from "@material-ui/icons/Speaker";
import LinearProgress from "@material-ui/core/LinearProgress";

import {LinearProgressStyles, SpeakerIconStyles} from './stylesUI';

import { connect } from "react-redux";
import {
  useParams,
} from "react-router-dom";
import { RootState } from "../../../redux/reducer";

import DisplayWordsComponent from "./DisplayWordsComponent";
import ResetGame from "../ResetGame/ResetGame";
import FullScreenButton from "./FullScreenButton";

import "./game.css";
import API_URL from "../../Constants/constants";

const URL = API_URL;

function GameAudioCall({ game, user, lang }) {
  const { difficulty, page }: { difficulty: string, page: string } = useParams();
  let pageCounter: number = Number(page);

  const [counter, setCounter] = useState(0);
  const [data, setData] = useState([]);
  const [word, setWord] = useState({});
  const [showImage, setShowImage] = useState(false);

  const [displayWords, setDisplayWords] = useState([]);

  const [rightAnswers, setRightAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const [maxSerie, setMaxSerie] = useState(0);

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
      All: `${API_URL}words?group=${Number(difficulty) - 1}&page=${Number(numOfPage) - 1}`,
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
            console.log("gameFrom = DICTIONARY")
            initGame(result[0].paginatedResults);
          } else {
            console.log("gameFrom != DICTIONARY")
            initGame(result);
          }
        },
        (error) => {
          console.log(error);
        },
      );
  }

  useEffect(() => {
    getData();
  }, [difficulty]);

  function getData() {
    if (game.gameFrom === "DICTIONARY") {
      fetchingData(getUrl(pageCounter, "UserDiff"));
    } else {
      fetchingData(getUrl(pageCounter, "All"));
    }
  }


  function initGame(data) {
    if(data.length < 20) {
      addData(data);
    }

    const dataShuffle = shuffle(data);

    setWord(dataShuffle.pop());
    setData(dataShuffle);
  }

  function addData(data: any) {
    let data3;
    let currentDifficulty = data[0].group;
    fetch(`${API_URL}words?group=${Number(currentDifficulty)}&page=${Number(page)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => res.json())
    .then(test => {
      let data2 = test.filter(elem => {
        if(!data.includes(elem)){
          return elem;
        }
        return;
      })

      data3 = [...data, ...data2];
      data3 = data3.splice(0, 20);
      data3 = shuffle(data3);

      setWord(data3.pop());
      setData(data3);
    }).catch(error => {
      console.log(error)
    })
  }


  // -------
  useEffect(() => {
    if (counter === 0) return;

    setWord(data.pop());
    setData(data);
  }, [counter]);

  useEffect(() => {
    if (counter === 0) return;
    if (counter >= 10) return;

    playWord();
  }, [word]);


  useEffect(() => {
    let res = data.filter((elem, index) => {
      if (elem.word === word.word) return;
      if (index > 3) return;

      return elem.word;
    });

    res.push(word);
    res = shuffle(res);

    setDisplayWords(res);
  }, [data, word]);

  function playWord() {
    const audio = new Audio(URL + word.audio);
    audio.play();
  }

  function addAnswers(word: any, state: any, elems: []) {
    if (elems.length === 0) {
       state([word]);
    } else {
      const copy = elems;
      copy.push(word);
      state(copy);
    }
  }

  function checkWord(e) {
    const targetElem = e.target;
    let currentElem: any;
    if (e.target.dataset.value === word.word) {
      setShowImage(true);
      addAnswers(word, setRightAnswers, rightAnswers);
      setMaxSerie((prev) => prev + 1);

      targetElem.classList.add("guessed");
      setTimeout(() => {
        setShowImage(false);
        setCounter((prev) => prev + 1);
        targetElem.classList.remove("guessed");
      }, 2000);
    } else {
      currentElem = document.querySelector(`[data-value="${word.word}"]`);
      targetElem.classList.add("no-guessed");
      currentElem.classList.add("guessed");
      setShowImage(true);
      addAnswers(word, setWrongAnswers, wrongAnswers);
      setMaxSerie(0);

      setTimeout(() => {
        targetElem.classList.remove("no-guessed");
        currentElem.classList.remove("guessed");
        setShowImage(false);
        setCounter((prev) => prev + 1);
      }, 2000);
    }
  }

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function rebootGame() {
    setCounter(0);
    setWord({});
    setData([]);
    setDisplayWords([]);
    setRightAnswers([]);
    setWrongAnswers([]);
    getData();
  }

  if(counter === 10) {
    return (
      <ResetGame
        rightAnswers={rightAnswers}
        wrongAnswers={wrongAnswers}
        resetgame={rebootGame}
        maxSerie={maxSerie}
        gameId={"2"}
      />
    )
  }

  return (
    <div className="game-body-container">

      <div className="content-container">
        <LinearProgress style={{ ...LinearProgressStyles }} variant="determinate" value={counter * 10} />

        <div className="content">
          <DisplayWordsComponent displayWords={displayWords} checkWord={checkWord} />

          <div className="word-image">
            {showImage ? <img className="game-image" src={URL + word.image} alt="" /> : ""}
          </div>

          <div className="speaker-icon">
            <SpeakerIcon style={{ ...SpeakerIconStyles }} onClick={() => playWord()} />
          </div>
        </div>

        <div className="fullscreen-button">
          <FullScreenButton />
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = (state: RootState) => ({
  game: state.game,
  user: state.user,
  lang: state.settingsReducer.lang.lang,
});

export default connect(mapStateToProps)(GameAudioCall);
