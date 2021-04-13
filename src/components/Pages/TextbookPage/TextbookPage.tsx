import React, {useEffect, useState} from "react";
import BookToGame from "./BookToGame";

import Pagination from "../../Pagination/Pagination";
import {useParams} from "react-router";
import CardForWords from "../DictionaryPage/components/CardForWord/CardForWord";
import textbookStyles from "./TextbookPageStyles";
import setColor from "../../../utils";
import settingsIcon from "../../../assets/icons/settingsBlack.svg";
import {Link} from "react-router-dom";
import API_URL from "../../Constants/constants";

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

const TextbookPage: React.FC = () => {
  const useStyles = textbookStyles();

  const { sectionId, pageId } = useParams();

  let wordsUrl = `${API_URL}words?group=${sectionId - 1}&page=${pageId - 1}`;
  const [pageWords, setPageWords] = useState([]);

  function getWords() {
    fetch(wordsUrl)
      .then((response) => response.json())
      .then((jsonData) => {
        setPageWords(jsonData);
      });
  }

  useEffect(() => {
    getWords();
  }, [wordsUrl]);

  return (
    <div className={useStyles.textbookSectionContainer}>
      <div className={useStyles.textbookSectionTitle} style={{backgroundColor: setColor(sectionId)}}>
        <div className={useStyles.textbookSectionBlock}>
          <h3 className={useStyles.textbookSectionTitlePage}>Раздел: {sectionId} Страница: {pageId}</h3>
        </div>
        <h1 className={useStyles.textbookTitle}>Изучение </h1>
        <div className={useStyles.textbookSectionBlock}>
          <Link to="/settings">
            <img className={useStyles.settingsIcon} src={settingsIcon} alt="settings"/>
          </Link>
        </div>

      </div>
      <BookToGame difficulty={sectionId} page={pageId} from={'TEXTBOOK'}/>
      {pageWords.map((card: IWord) => <CardForWords key={card.id} cardInfo={card} isMain={true}/>)}
      <BookToGame difficulty={sectionId} page={pageId} from={'TEXTBOOK'}/>
      <Pagination page={pageId} sectionId={sectionId} />
    </div>

  )
};

export default TextbookPage;
