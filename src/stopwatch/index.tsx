import React, { useState } from 'react';
import './styles.scss'
import { Clock } from '../Clock'
import Button from "@mui/material/Button";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  React.useEffect(() => {
    let interval: NodeJS.Timer | undefined = undefined;

    if (!isPaused) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPaused])

  const startStop = () => {
    setIsPaused(!isPaused);
  }

  const handleReset = () => {
    setIsPaused(true);
    setTime(0);
  };

  return (
    <div className="Stopwatch">
      <Clock time={time} />
      <Button onClick={startStop}>
        { isPaused ?
          <PlayCircleIcon fontSize="large" /> :
          <PauseCircleIcon fontSize="large" />
           } </Button>
      <Button onClick={handleReset}>
        <CancelIcon fontSize="large" />
      </Button>
    </div>
  )
}

