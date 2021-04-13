import React, { useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import DictionaryStyles from "./DicrionaryPageStyles";
import CardOfWord from "./components/CardForWord/CardForWord";
import API_URL from "../../Constants/constants";

type Props = {
    user: any,
    section: any,
    filter: string
}

interface ICategory {
  user: any,
  section: any,
  filter: string
}

function getCards(token:string, page:number, sectionId:number, filter:string, userId:number, setCountPages, setListOfWords) {
  const url = `${API_URL}users/${userId}/aggregatedWords?group=${sectionId - 1}&page=${page - 1}&filter=${filter}&wordsPerPage=20`;

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((jsonData) => {
      setListOfWords(jsonData !== 0 ? jsonData[0].paginatedResults : []);
      setCountPages(jsonData[0].totalCount.length !== 0 ? Math.ceil((jsonData[0].totalCount[0].count) / 20) : 0);
    })
    .catch((error) => { console.log(error); });
}

const WordsFromCategory: React.FC<Props> = ({ user, section, filter }: ICategory) => {
  const useStyles = DictionaryStyles();
  const [listOfWords, setListOfWords] = useState([]);
  const [countPages, setCountPages] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getCards(user.token, page, section, filter, user.id, setCountPages, setListOfWords);
  }, [page]);

  useEffect(() => {
    setPage(1);
    getCards(user.token, page, section, filter, user.id, setCountPages, setListOfWords);
  }, [filter, section]);

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    return listOfWords.map((card:any) => <CardOfWord key={card._id} cardInfo={card} isMain={false} />);
  };

  const renderOnePage = () => listOfWords.map((card:any) => <CardOfWord key={card._id} cardInfo={card} isMain={false} />);

  return (
    listOfWords
      ? <div className={useStyles.cards}>
      {
        countPages === 1 ? renderOnePage()
          : countPages > 1
            ? <>
          {renderOnePage()}
          <div className={useStyles.paginationContainer}>
            <Pagination color="primary" defaultPage={0} showFirstButton showLastButton count={countPages} page={page} onChange={handleChangePagination} />
          </div>
        </>
            : <div>No items yet.</div>
      }
    </div>
      : <div>No items yet.</div>
  );
};

export default WordsFromCategory;
