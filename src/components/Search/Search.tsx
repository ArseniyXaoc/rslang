import React, { useState, useEffect, Fragment, useRef } from "react";
import { TextField, Paper, IconButton, InputAdornment, Button, CircularProgress } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import API_URL from "../Constants/constants";
import CardForWords from "../Pages/DictionaryPage/components/CardForWord/CardForWord";
import searchStyles from "./SearchStyles";

interface IWord {
  id: string
  group: number
  page: number
  word: string
  image: string
  audio: string
  audioMeaning: string
  audioExample: string
  textMeaning: string
  textExample: string
  transcription: string
  textExampleTranslate: string
  textMeaningTranslate: string
  wordTranslate: string
}

const getSearchResult = async (searchString) => {
  const url = new URL(`${API_URL}words/search`);
  url.searchParams.append("string", searchString);
  const res = await fetch(url, {
    method: "GET",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const words = await res.json();
    return words;
  }
  return null;
};

const Search = () => {
  const useStyles = searchStyles();
  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useState(null);
  const [words, setWords] = useState([]);
  const [wordsToRender, setWordsToRender] = useState([]);
  const [sliceToRender, setSliceToRender] = useState(0);
  const inputEl = useRef(null);
  useEffect(() => {
    setSliceToRender(0);
    if (searchString?.length > 0) {
      setLoading(true);
      setTimeout(
        () => {
          const inputString = inputEl.current.querySelector("input").value;
          if (inputString.length === 0) {
            setWords([]);
            setLoading(false);
          }
          if (inputString === searchString) {
            getSearchResult(searchString).then((result) => {
              const inputString = inputEl.current.querySelector("input").value;
              if (inputString === searchString) {
                setWords(result);
                setLoading(false);
              }
              if (inputString.length === 0) {
                setWords([]);
                setLoading(false);
              }
            });
          }
        }, 500
      )

    } else {
      setWords([]);
      setWordsToRender([]);
    }
  }, [searchString]);
  useEffect(() => {
    setSliceToRender(0);
    setSliceToRender(20);
  }, [words])
  useEffect(() => {
    setWordsToRender(words.slice(0, sliceToRender))
  }, [sliceToRender]);
  return <div className={useStyles.container}>
    <Paper className={`${useStyles.card} ${useStyles.cardBlue}`} >
      <div className={useStyles.title}>
        <i className={`${useStyles.icon} ${useStyles.searchIcon}`}></i>
        <TextField
          className={useStyles.searchString}
          label="Find word"
          inputProps={{ 'aria-label': 'enter word' }}
          name="search"
          ref={inputEl}
          onChange={(e) => { setSearchString(e.target.value); }}
        />
      </div>
    </Paper>
    {loading ? <CircularProgress size={128} className="progress" /> : null}
    {wordsToRender.map((card: IWord) =>
      <CardForWords
        key={card.id}
        cardInfo={card}
        isMain={true} />)}
    {(sliceToRender < words.length) ?
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => { setSliceToRender((p) => p + 20) }}
      >
        Load more
      </Button>
      : null}
  </div>
}

export default Search;
