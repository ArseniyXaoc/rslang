import { Link, CircularProgress } from "@material-ui/core";
import React, { Fragment, useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { RootState } from "../../redux/reducer";
import DailyStat from "./DailyStat";
import DayChart from "./DayChart";
import "./styles.scss";

type StatType = {
  learnedWords: Number,
  date: Number, //  (current time in UTCmiliseconds)
  gameId: String,
  rightAnswers: Number,
  wrongAnswers: Number,
  maxSerie: Number
}

const getStat = async (user) => {
  const res = await fetch(`https://rslernwords.herokuapp.com/users/${user.id}/statistics`, {
    method: "GET",
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    return [];
  }
  const stat = await res.json();
  return stat;
};

const getDailyStat = (stat) => {
  const cDate = new Date();
  const timeStart = cDate
    .setHours(0, 0, 0, 0);
  const timeEnd = cDate.setDate(cDate.getDate() + 1);
  return stat.filter((itm) => (itm.date >= timeStart)
    && (itm.date < timeEnd))
    .reduce((acc, itm) => {
      const gameStat = acc.find((stat) => itm.gameId === stat.gameId);
      if (gameStat) {
        gameStat.learnedWords += itm.learnedWords;
        gameStat.rightAnswers += itm.rightAnswers;
        gameStat.wrongAnswers += itm.wrongAnswers;
        gameStat.maxSerie = Math.max(itm.wrongAnswers, gameStat.maxSerie);
      } else {
        acc.push({
          gameId: itm.gameId,
          learnedWords: itm.learnedWords,
          rightAnswers: itm.rightAnswers,
          wrongAnswers: itm.wrongAnswers,
          maxSerie: itm.maxSerie,
        });
      }
      return acc;
    }, []);
};

const getLearnedWordsByDate = (stat) => {
  const dateStart = new Date(Math.min(...stat.map((itm) => itm.date))).setHours(0, 0, 0, 0); // midnigh of minimal date from stat
  const dateEnd = (new Date()).setHours(24, 0, 0, 0); // tomorrow midnight
  const dataSet = [];
  let cDate = dateStart;
  while (cDate < dateEnd) {
    const learnedWords = stat.reduce((acc, itm) => {
      const midNight = (new Date(itm.date)).setHours(0, 0, 0, 0);
      if (midNight === cDate) {
        acc += itm.learnedWords;
      }
      return acc;
    }, 0);
    dataSet.push({
      x: new Date(cDate),
      y: learnedWords,
    });
    cDate += 86400000; // ms per day
  }
  return dataSet;
};

const Statistics = ({ user }) => {
  if (!user.id || !user.token) {
    return <Fragment>
      <Typography variant="subtitle1">
        Statistics is available only after authorization
      </Typography>
      <Link component={RouterLink} to={"/signin"}>Sign In</Link>
      <br></br>
      <Link component={RouterLink} to={"/signup"}>Sign Up</Link>
    </Fragment>;
  }
  const [dailyStat, setDailyStat] = useState([]);
  const [learnedByDay, setLearnedByDay] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getStat(user).then((stat) => {
      setLoading(false);
      setDailyStat(getDailyStat(stat));
      console.log(getLearnedWordsByDate(stat));
      setLearnedByDay(getLearnedWordsByDate(stat));
    });
  }, []);
  return loading
    ? <CircularProgress size={128} className="progress" />
    : <Fragment >
      <DailyStat stat={dailyStat} user={user} />
      <h1>{"All time"}</h1>
      <DayChart title={"Learned words per day"} dataSet={learnedByDay} />
      <DayChart title={"Learned words cumulative"} dataSet={learnedByDay.reduce((acc, itm, idx) => {
        if (idx > 0) {
          acc.push({ x: itm.x, y: acc[idx - 1].y + itm.y });
        } else {
          acc.push({ x: itm.x, y: itm.y });
        }
        return acc;
      }, [])} />
    </Fragment>;
};

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Statistics);
