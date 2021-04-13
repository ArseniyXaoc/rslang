import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Statistics from "./Statistics";

const styles = makeStyles({
  container: {
    width: "100%",
    maxWidth: "1024px",
    margin: "12px auto",
    padding: "0 12px",
    fontSize: "22px",
  },
});

const Main = () => {
  const classes = styles();
  return <div className={classes.container}>
    <Statistics />
  </div>;
};

export default Main;
