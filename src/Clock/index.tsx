import React from "react";
import "./styles.scss";

type Props = {
  time: number;
}

export const Clock = ({ time }: Props) => {
  return (
    <div className="Clock">
      <span className="ClockMinutes">
        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
      </span>
      <span className="ClockSeconds">
        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
      </span>
    </div>
  );
}
