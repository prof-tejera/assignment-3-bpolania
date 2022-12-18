import React from "react";

import { useTimers } from "../contexts/TimersContext";

const Display = ({ timer, del, edit, isEditing, visibility='inline-block', tid }) => {

  const { setUpdateHours } = useTimers();

  const handleHoursChange = (event) => {
    setUpdateHours({id: tid, hours: event.target.value, minutes: undefined, seconds: undefined});
  }

  const handleMinutesChange = (event) => {
    setUpdateHours({id: tid, hours: undefined, minutes: event.target.value, seconds: undefined});
  }

  const handleSecondsChange = (event) => {
    setUpdateHours({id: tid, hours: undefined, minutes: undefined, seconds: event.target.value});
  }

  return (
    <div className="container">
            <div>
              <span className="digit" id="hr">
                {isEditing ? <input className="timerInput" style={{ width: 25 }} onChange={handleHoursChange}></input> : timer.split(":")[0]}</span>
              <span className="txt">Hr</span>
              <span className="digit" id="min">
                {isEditing ? <input className="timerInput" style={{ width: 25 }} onChange={handleMinutesChange}></input> : timer.split(":")[1]}</span>
              <span className="txt">Min</span>
              <span className="digit" id="sec">
                {isEditing ? <input className="timerInput" style={{ width: 25 }} onChange={handleSecondsChange}></input> :timer.split(":")[2]}</span>
              <span className="txt">Sec</span>
            </div>
            <div>
              <span className="buttons" style={{display: visibility}}>
                { del }
              </span>
              <span className="buttons" style={{display: visibility}}>
                { edit }
              </span>
            </div>
            
        </div>
  );
};

export default Display;
