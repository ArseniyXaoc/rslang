import React, { useEffect, useState } from "react";
import {
  AccessAlarm, Score, VolumeUp, VolumeOff,
} from "@material-ui/icons";
import useSound from "use-sound";
import tada from "../../../assets/sound/tada.mp3";
import { Button } from "@material-ui/core";

// let int = null;
interface ISprintHeader {
  isVolume: boolean,
  score: number,
  setIsVolume: React.Dispatch<React.SetStateAction<boolean>>,
  setFinish: React.Dispatch<React.SetStateAction<boolean>>,
  setTime: React.Dispatch<React.SetStateAction<number>>,
  time: number,
}

const SprintHeader = ({
  isVolume, score, setFinish, setIsVolume, time, setTime,
}:ISprintHeader) => {
  const [playTada] = useSound(tada, { volume: 0.2 });

  const [timeIn, setTimeIn] = useState();

  useEffect(() => {
    const int = setInterval(() => {
      setTime(time - 1);
    }, 1000);
    setTimeIn(int);
    if (time === 0) {
      if (isVolume) playTada();
      clearInterval(int);
      setFinish(true);
    }
    return () => {
      clearInterval(int);
      clearInterval(timeIn);
    };
  }, [time]);

  function handleClick() {
    if (isVolume) setIsVolume(false);
    else setIsVolume(true);
  }

  return (
    <div className="sprint__interface">
      <div className="sprint__timer">
        <AccessAlarm />{time}
      </div>
      <div className="sprint__score">
        <Score />{score}
      </div>
      <div className="sprint__sound">
        {isVolume ? <Button onClick={handleClick}><VolumeUp /></Button>
          : <Button onClick={handleClick}><VolumeOff /></Button>}
      </div>
    </div>
  );
};

export default SprintHeader;
