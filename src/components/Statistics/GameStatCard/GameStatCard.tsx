import React, { useState } from "react";
import styles from "./GameStatCardStyles";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { Grid, Paper } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Games from "../../../assets/staticData/gamesData.js";


const getPercent = (stat) => Math.round((stat.rightAnswers / (stat.rightAnswers + stat.wrongAnswers)) * 100);

const GameStatCard = ({ stat }) => {
  const game = Games.find((itm) => itm.id === stat.gameId);
  const classes = styles();
  return <Grid container className={classes.container}>
    <Grid item xs={12}>
      <Paper>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <div className={classes.wrapper}>
              <h2 className={classes.title}>{game?.name}</h2>
              <img src={game?.image} className={classes.img}></img>

            </div>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Grid container justify={"center"} direction={"column"}>
              <Box p={3}>
                <div className={classes.entry}>
                  <span>{"Words learned: "}</span>
                  <span>{stat.learnedWords}</span>
                </div>
                <div className={classes.entry}>
                  <span>{"Correct answers: "}</span>
                  <span>{`${getPercent(stat)}%`}</span>
                </div>
                <div className={classes.entry}>
                  <span>{"Maximum serie of right answers: "}</span>
                  <span>{stat.maxSerie}</span>
                </div>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  </Grid>;
};

export default GameStatCard;
