/* eslint-disable max-len */
import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    "& > svg": {
      margin: theme.spacing(2),
      TransitionEvent: "10ms",
    },
  },
}));

function HeartIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
    </SvgIcon>
  );
}

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
       <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
       </svg>
    </SvgIcon>
  );
}

const Points = ({ bonus, checkbox }: { bonus: number, checkbox: boolean[] }) => {
  const classes = useStyles();
  const x = bonus;
  const right = { color: green[500] };
  const wrong = "secondary";
  const disabled = "disabled";
  return (
    <div className="sprint__point">
      <div className={classes.root}>
        {checkbox.map((item, index) => (item
          ? <HeartIcon className="scale-up-center" key={Date.now() + index} style={right} /> : <HomeIcon className="scale-up-center" key={Date.now() + index} color={wrong} />))}
      </div>
      <div className="sprint__bonus">
        {bonus !== 0 && (<div> +{x} за слово </div>)}
      </div>
    </div>
  );
};

export default Points;
