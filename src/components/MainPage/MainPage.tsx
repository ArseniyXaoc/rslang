import React from "react";
import { Paper } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import mainStyles from "./MainPageStyles";

import "./style.scss";

function MainPage() {
  const useStyles = mainStyles();
  return (
    <div className={useStyles.wrapper}>
      <div className={useStyles.container}>
        <Paper className={`${useStyles.card}`}>
          <h1 className={`${useStyles.title} ${useStyles.cardBlue}`}>
            <i className={`${useStyles.icon} ${useStyles.bookIcon}`}></i>
            Учебник
          </h1>
          <RouterLink className={useStyles.links} to={"/section/1"}>Раздел 1</RouterLink>
          <RouterLink className={useStyles.links} to={"/section/2"}>Раздел 2</RouterLink>
          <RouterLink className={useStyles.links} to={"/section/3"}>Раздел 3</RouterLink>
          <RouterLink className={useStyles.links} to={"/section/4"}>Раздел 4</RouterLink>
          <RouterLink className={useStyles.links} to={"/section/5"}>Раздел 5</RouterLink>
          <RouterLink className={useStyles.links} to={"/section/6"}>Раздел 6</RouterLink>
        </Paper>
        <Paper className={`${useStyles.card}`}>
          <h1 className={`${useStyles.title} ${useStyles.cardRed}`}>
            <i className={`${useStyles.icon} ${useStyles.dicIcon}`}></i>
            Словарь
          </h1>
          <RouterLink className={useStyles.links} to={"/dictionary/1"}>Раздел 1</RouterLink>
          <RouterLink className={useStyles.links} to={"/dictionary/2"}>Раздел 2</RouterLink>
          <RouterLink className={useStyles.links} to={"/dictionary/3"}>Раздел 3</RouterLink>
          <RouterLink className={useStyles.links} to={"/dictionary/4"}>Раздел 4</RouterLink>
          <RouterLink className={useStyles.links} to={"/dictionary/5"}>Раздел 5</RouterLink>
          <RouterLink className={useStyles.links} to={"/dictionary/6"}>Раздел 6</RouterLink>
        </Paper>
        <RouterLink to={"/statistics"}>
          <Paper className={`${useStyles.card}`}>
            <h1 className={`${useStyles.title} ${useStyles.cardDarkBlue}`}>
              <i className={`${useStyles.icon} ${useStyles.statIcon}`}></i>
              Статистика
            </h1>
          </Paper>
        </RouterLink>
        <Paper className={`${useStyles.card}`}>
          <h1 className={`${useStyles.title} ${useStyles.cardOrange}`}>
            <i className={`${useStyles.icon} ${useStyles.gamesIcon}`}></i>
            Мини-игры
          </h1>
          <RouterLink className={useStyles.links} to={"/games/audiocall"}>Audiocall</RouterLink>
          <RouterLink className={useStyles.links} to={"/games/sprint"}>Sprint</RouterLink>
          <RouterLink className={useStyles.links} to={"/games/savannah"}>Savannah</RouterLink>
        </Paper>
      </div>
    </div >
  );
}

export default MainPage;
