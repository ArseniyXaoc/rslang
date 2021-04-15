import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@material-ui/core";
import GameStatCard from "./GameStatCard/GameStatCard";
import "./styles.scss";

const getOverallPercent = (stat) => {
  const rightAnswers = stat.reduce((acc, itm) => acc + itm.rightAnswers, 0);
  const wrongAnswers = stat.reduce((acc, itm) => acc + itm.wrongAnswers, 0);
  return Math.round((rightAnswers / (rightAnswers + wrongAnswers)) * 100);
};

const DailyStat = ({ user, stat }) => {
  if (stat.length) {
    return <div className="stat-section">
      <h1>{"Today"}</h1>
      <div className="iconed-block">
        <i className={"icon icon--study"}></i>
        <span>{`Words learned: ${stat.reduce((acc, itm) => acc + itm.learnedWords, 0)}`}</span>
      </div>
      <div className="iconed-block">
        <i className={"icon icon--pie"}></i>
        <span>{`Correct answers: ${getOverallPercent(stat)}%`}</span>
      </div>
      <h3 className="iconed-block">
        <i className={"icon icon--game icon--large"}></i>
        <span>{"Games activity:"}</span>
      </h3>
      {stat.map((itm, idx) => <GameStatCard
        key={idx}
        stat={itm}
      />)}</div>;
  }
  return <div>
    <h1>{"Today"}</h1>
    <div>{"You didn't have any activity today"}</div>
    <div>{"Play"} <Link component={RouterLink} to={"/games"}>games</Link> to earn score</div>
  </div>;
};

export default DailyStat;
