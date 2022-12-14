import {React, useState } from "react";
import styled from "styled-components";

import { useEffect } from "react";

import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";

const Timers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Timer = styled.div`
  border: 1px solid gray;
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
  background-color: #0e37a1;
  color: #fffcd6;
  width: 50vh;
`;

const TimerTitle = styled.div``;
const TimerRound = styled.div``;
const TimerWorkStatus = styled.div``;

const HistoryView = () => {

  const [history, setHistory] = useState([]);

  useEffect(() => {
    let _history = [];
    const ts = JSON.parse(localStorage.getItem("log"));
    for (let i = 0; i < ts.length; i++) {
      _history.push(buildTimersFromJson(ts[i]));
    }
    setHistory(_history);
  },[])

  const buildTimersFromJson = (timers) => {
    let result = [];
    let timer = undefined;
    for (let i = 0; i < timers.length; i++) {
      if (timers[i].title === "Stopwatch") {
        timer = { title: timers[i].title, id: timers[i].id, C: <Stopwatch id={timers[i].id} visibility={'none'}/> };
      }
      if (timers[i].title === "Countdown") {
        timer = { title: timers[i].title, id: timers[i].id, C: <Countdown 
          hours={timers[i].C.props.hours}
          minutes={timers[i].C.props.minutes}
          seconds={timers[i].C.props.seconds}
          id={timers[i].id}
          visibility={'none'}/> };
      }
      if (timers[i].title === "XY") {
        timer = { title: timers[i].title, id: timers[i].id, C: <XY 
          hours={timers[i].C.props.hours}
          minutes={timers[i].C.props.minutes}
          seconds={timers[i].C.props.seconds}
          rounds={timers[i].rounds}
          id={timers[i].id}
          visibility={'none'}  
          /> };
      }
      if (timers[i].title === "Tabata") {
        timer = { title: timers[i].title, id: timers[i].id, rounds: timers[i].rounds, C: <Tabata 
          work={{
            hours:timers[i].C.props.work.hours,
            minutes:timers[i].C.props.work.minutes,
            seconds:timers[i].C.props.work.seconds
          }}
          rest={{
            hours:timers[i].C.props.rest.hours,
            minutes:timers[i].C.props.rest.minutes,
            seconds:timers[i].C.props.rest.seconds
          }}
          rounds={timers[i].rounds}
          id={timers[i].id}
          visibility={'none'}/>,
          currentRound: timers[i].currentRound,
          workingStatus: timers[i].workingStatus
        }
      }
      result.push(timer);
    }
    return result;
  }

  const formatTime = (miliseconds) => {
    const _seconds = Math.floor((miliseconds / 1000) % 60);
    const _minutes = Math.floor((miliseconds / 1000 / 60) % 60);
    const _hours = Math.floor((miliseconds / 1000 / 60 / 60) % 24);
    return `${_hours}hrs ${_minutes}mins ${_seconds}sec`;
  }

  return (
    <Timers>
    <div className="title">Timers History</div>
      {history.map((timers) => (
        <div style={{ border: '1px solid black'}} key={`timer-${Math.random() * 1000}`}>
          {timers.map((timer) => (
              <Timer key={`timer-${timer.id}`}>
                <TimerTitle>{timer.title}</TimerTitle>
                {timer.currentRound ? <TimerRound>Round {timer.currentRound}/{timer.rounds}</TimerRound> : null}
                <TimerWorkStatus>{timer.workingStatus}</TimerWorkStatus>
                {timer.C}
              </Timer>
          ))}
        </div>
        ))
      }
    </Timers>
  );
};

export default HistoryView;
