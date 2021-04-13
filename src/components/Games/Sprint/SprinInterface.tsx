import React, { useEffect, useState } from "react";
import {
  AccessAlarm, Score, VolumeUp, VolumeOff,
} from "@material-ui/icons";
import useSound from "use-sound";
import tada from "../../../assets/sound/tada.mp3";

// let int = null;

const SprintHeader = ({ isVolume, score, setFinish }:
  { isVolume: boolean, score: number, setFinish: React.SetStateAction<boolean> }) => {
  const [playTada] = useSound(tada, { volume: 0.2 });

  const [time, setTime] = useState(40);
  const [timeIn, setTimeIn] = useState();

  useEffect(() => {
    const int = setInterval(() => {
      setTime(time - 1);
    }, 1000);
    setTimeIn(int);
    if (time === 0) {
      playTada();
      clearInterval(int);
      setFinish(true);
    }
    return () => {
      clearInterval(int);
      clearInterval(timeIn);
    };
  }, [time]);

  return (
    <div className="sprint__interface">
      <div className="sprint__timer">
        <AccessAlarm />{time}
      </div>
      <div className="sprint__score">
        <Score />{score}
      </div>
      <div className="sprint__sound">
        {isVolume ? <VolumeUp /> : <VolumeOff />}
      </div>
    </div>
  );
};

export default SprintHeader;
