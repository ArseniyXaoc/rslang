import React, { Dispatch, useEffect, useState } from "react";
import { AccessAlarm } from "@material-ui/icons";
import useSound from "use-sound";
import tik from "../../../assets/sound/percussive-hit.wav";

type BeginTipe = {
  setBegin: Dispatch<boolean>,
}
const Begin = ({ setBegin, start }: BeginTipe) => {
  const [playTik] = useSound(tik);
  const [beginTimer, setBeginTimer] = useState(3);
  useEffect(() => {
    const interval = setInterval(() => {
      setBeginTimer(beginTimer - 1);
      playTik();
    }, 1000);
    if (beginTimer === 0) {
      setBegin(false);
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="sprint">
      <h2 className="sprint__header">{start}</h2>
      <div className="sprint__words-container">
        <AccessAlarm />
        <div>{beginTimer}</div>
      </div>
    </div>
  );
};

export default Begin;
