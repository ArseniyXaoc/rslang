import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../../redux/reducer";
import BookToGame from "../TextbookPage/BookToGame";
import DictionaryStyles from "./DicrionaryPageStyles";
import WordsCategory from "./WordsCategory";
import setColor from "../../../utils";
import settingsIcon from "../../../assets/icons/settingsBlack.svg";
import { Link } from "react-router-dom";

type Props = {
    lang: string,
    user: any
}

interface IDictionaryProps {
    lang: string,
    user: any
}

const TEXTS = {
  en: {
    mainTitle: "Dictionary",
    studiedWords: "Studied",
    difficultWords: "Difficult",
    removedWords: "Deleted",
    toDifficultBtn: "To difficult",
    deleteBtn: "Delete",
    placeholderTab: "The list of words is empty.",
    section: "Section",
  },
  ru: {
    mainTitle: "Словарь",
    studiedWords: "Изучаемые",
    difficultWords: "Сложные",
    removedWords: "Удаленные",
    toDifficultBtn: "В сложные",
    deleteBtn: "Удалить",
    placeholderTab: "Список слов пуст.",
    section: "Раздел",
  },
};

const DictionaryPage: React.FC<Props> = ({ lang, user }: IDictionaryProps) => {
  const { sectionId } = useParams();
  const useStyles = DictionaryStyles();
  const [category, setCategory] = useState("studying");
  const activeCategory = `${useStyles.dictionaryMenuItem} ${ useStyles.dictionaryMenuItemActive}`;
  const filters = {
    studying: "{\"$and\":[{\"userWord.optional.studying\":\"true\", \"userWord.optional.deleted\":\"false\"}]}",
    difficult: "{\"$and\":[{\"userWord.difficulty\":\"true\", \"userWord.optional.deleted\":\"false\"}]}",
    deleted: "{\"userWord.optional.deleted\":\"true\"}",
  };

  return (
    user.id ?
    <div className={useStyles.dictionaryContainer}>
      <div className={useStyles.textbookSectionTitle} style={{backgroundColor: setColor(sectionId)}}>
        
      <h3>{`${TEXTS[lang].section} ${sectionId}`}</h3>
        <h1 >{`${TEXTS[lang].mainTitle}`}</h1>
        <div className={useStyles.textbookSectionBlock}>
          <Link to="/settings">
            <img className={useStyles.settingsIcon} src={settingsIcon} alt="settings"/>
          </Link>
        </div>
      </div>

      <BookToGame difficulty={sectionId} page={'1'} from={'DICTIONARY'} />
      <div className={useStyles.dictionaryMenu}>
          <button className={category === "studying" ? activeCategory :  useStyles.dictionaryMenuItem} onClick={() => { setCategory("studying") }}>
              {TEXTS[lang].studiedWords}
          </button>
          <button className={category === "difficult" ? activeCategory : useStyles.dictionaryMenuItem} onClick={() => { setCategory("difficult") }}>
              {TEXTS[lang].difficultWords}
          </button>
          <button className={category === "deleted" ? activeCategory :useStyles.dictionaryMenuItem} onClick={() => { setCategory("deleted") }}>
              {TEXTS[lang].removedWords}
          </button>
      </div>
      <WordsCategory user={user} section={sectionId} filter={filters[category]}/>
    </div> : <div className={useStyles.emptyTab}>User is not logged!</div>
  );
};

const mapStateToProps = (state:RootState) => ({
  lang: state.settingsReducer.lang.lang,
  user: state.user,
});

export default connect(mapStateToProps)(DictionaryPage);
