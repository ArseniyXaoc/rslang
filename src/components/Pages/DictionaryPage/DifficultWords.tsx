import React, { useEffect, useState } from "react";
import DictionaryStyles from "./DicrionaryPageStyles";
import CardOfWord from "./components/CardForWord/CardForWord";
import Pagination from "@material-ui/lab/Pagination";

type Props = {
    user: any,
    section: object
}

const DifficultWords: React.FC<Props> = ({user, section}) => {
  const useStyles = DictionaryStyles();
  const [listOfWords, setListOfWords] = useState([]);
  const url = `https://rslernwords.herokuapp.com/users/${user.id}/aggregatedWords?group=${section-1}&page=0&filter={"$and":[{"userWord.difficulty":"true", "userWord.optional.deleted":"false"}]}&wordsPerPage=20`;

  useEffect(() => {
    fetch(url, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
        }
    })
      .then(
        (response) => response.json(),
      )
      .then((jsonData) => {
        setListOfWords(jsonData);
      });
  }, [section]);

  const listOfCard = listOfWords.length !== 0 ? listOfWords[0].paginatedResults : null;

  return (
      <div>
          <div className={useStyles.cards}>
              {
                  listOfCard ? listOfCard.length !== 0 ?
                  listOfCard.map((card:any) => <CardOfWord key={card.id} cardInfo={card} />)
                  : <div>No items yet.</div> : <div>No items yet.</div> 
              }
          </div>
      </div>
  );
};

export default DifficultWords;