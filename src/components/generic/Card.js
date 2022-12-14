import React from "react";
import  Button  from '../generic/Button'

const Card = ({ type, title, hours, minutes, seconds, restHours, restMinutes, restSeconds, rounds, onClick, id }) => {
  let mainTimerTitle;;
  let timer;
  let restTimer;
  let round;
  if (type !== "t") {
    mainTimerTitle = <span className="txt" id="card"> Time: </span>
  } else {
    mainTimerTitle = <span className="txt" id="card"> Work Time: </span>
    
  }

  if (type !== "s") {
    timer = <div>
      {mainTimerTitle}
      <span className="digit" id="card">
        {hours}</span>
      <span className="txt" id="card"> Hr </span>
      <span className="digit" id="card">
        {minutes}</span>
      <span className="txt" id="card"> Min </span>
      <span className="digit" id="card">
        {seconds}</span>
      <span className="txt" id="card"> Sec </span>
    </div>
  }
  if (type === "xy" || type === "t") {
    round = <div>
      <span className="digit" id="card">
        {rounds}</span>
      <span className="txt" id="card"> Rounds </span>
    </div>
  }
  if (type === "t") {
    restTimer = <div>
      <span className="txt" id="card"> Rest Time: </span>
      <span className="digit" id="card">
        {restHours}</span>
      <span className="txt" id="card"> Hr </span>
      <span className="digit" id="card">
        {restMinutes}</span>
      <span className="txt" id="card"> Min </span>
      <span className="digit" id="card">
        {restSeconds}</span>
      <span className="txt" id="card"> Sec </span>
    </div>
  }
  return (
    <div className="container">
      <div>{title}</div>
      {timer}
      {restTimer}
      {round}
      <div>
        <Button index={id} title={"Delete"} className={"form"} id={"form-button"} onClick={onClick}>Delete</Button>
      </div>
      
    </div>
  );
};

export default Card;
