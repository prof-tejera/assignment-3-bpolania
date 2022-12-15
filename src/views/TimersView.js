import {React } from "react";
import styled from "styled-components";

import { useTimers } from "../components/contexts/TimersContext";
import { useEffect } from "react";

import  Button  from '../components/generic/Button'

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

const TimersView = () => {

  const { setTimers, timers, newRound, newWorkingStatus, setActive, active, setAction, action, deleteTimer, setDeleteTimer, total, updater, next, setNext } = useTimers();

  useEffect(() => {
    for (let i = 0; i < timers.length; i++) {
      if (timers[i].id === newRound.id ) {
        if (newRound.value + 1 <= Number(timers[i].rounds)) {
          timers[i].currentRound = newRound.value + 1;
        } 
      }
    }
  },[newRound])

  useEffect(() => {
    
  },[updater])

  useEffect(() => {
    if (next > 0) {
      handleNextClick();
    }
  },[next])

  useEffect(() => {
    if (next > 0) {
      handlePauseClick();
    }
  },[active])

  useEffect(() => {
    for (let i = 0; i < timers.length; i++) {
      if (timers[i].id === newWorkingStatus.id ) {
        timers[i].workingStatus = newWorkingStatus.value;
      }
    }
  },[newWorkingStatus])

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("current"));
    if (current.length > 0 && timers.length === 0) {
      setTimers(buildTimersFromJson(current));
    }
    if (timers.length > 0) {
      setActive(timers[0].id);
    }
  },[])

  useEffect(() => {
    if (deleteTimer) {
      const newTimers = timers.filter(item => Number(item.id) !== Number(deleteTimer));
      setTimers(newTimers);
    }
    
  },[deleteTimer])

  useEffect(() => {
    setDeleteTimer();
  },[timers])

  const buildTimersFromJson = (timers) => {
    let result = [];
    let timer = undefined;
    for (let i = 0; i < timers.length; i++) {
      if (timers[i].title === "Stopwatch") {
        timer = { title: timers[i].title, id: timers[i].id, comment: timers[i].comment, C: <Stopwatch id={timers[i].id}/> };
      }
      if (timers[i].title === "Countdown") {
        timer = { title: timers[i].title, id: timers[i].id,comment: timers[i].comment, C: <Countdown 
          hours={timers[i].C.props.hours}
          minutes={timers[i].C.props.minutes}
          seconds={timers[i].C.props.seconds}
          id={timers[i].id}/> };
      }
      if (timers[i].title === "XY") {
        timer = { title: timers[i].title, id: timers[i].id, comment: timers[i].comment, C: <XY 
          hours={timers[i].C.props.hours}
          minutes={timers[i].C.props.minutes}
          seconds={timers[i].C.props.seconds}
          rounds={timers[i].rounds}
          id={timers[i].id}/> };
      }
      if (timers[i].title === "Tabata") {
        timer = { title: timers[i].title, id: timers[i].id, rounds: timers[i].rounds, comment: timers[i].comment, C: <Tabata 
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
          id={timers[i].id}/>,
          currentRound: timers[i].currentRound,
          workingStatus: timers[i].workingStatus
        }
      }
      result.push(timer);
    }
    return result;
  }

  const handlePauseClick = () => {
    if (action === undefined || action === "pause") setAction("start");
    if (action === "start") setAction("pause");
  }

  const handleNextClick = () => {
    if (timers.length > 1) {
      for (let i = 0; i < timers.length; i++) {
        if (timers[i].id === active && i < timers.length - 1) {
          setActive(timers[i + 1].id);
          setAction("pause");
        } 
        if (timers[i].id === active && i === timers.length - 1) {
          const log = JSON.parse(localStorage.getItem("log")); 
          log.push(timers);
          localStorage.setItem("log", JSON.stringify(log)); 
          setActive(-1);
        }
      }
    }
  }

  const handleEndClick = () => {
    setAction("end");
    for (let i = 0; i < timers.length; i++) {
      if (timers[i].currentRound) {
        timers[i].currentRound = 1;
      } if (timers[i].workingStatus) {
        timers[i].workingStatus = "Working!!!";
      }
      setNext(0);
    }
    setActive(timers[0].id);
  }

  const formatTime = (miliseconds) => {
    const _seconds = Math.floor((miliseconds / 1000) % 60);
    const _minutes = Math.floor((miliseconds / 1000 / 60) % 60);
    const _hours = Math.floor((miliseconds / 1000 / 60 / 60) % 24);
    return `${_hours}hrs ${_minutes}mins ${_seconds}sec`;
  }

  const buttons = <div>
                    <Button title={ action === "start" ? "Pause" : "Start"} onClick={handlePauseClick} className={"form"} id={"timers-complete-button"}/>
                    <Button title={"Next"} onClick={handleNextClick} className={"form"} id={"timers-complete-button"}/></div>
  
  const endButton = <div>
                    <Button title={"Reset"} onClick={handleEndClick} className={"form"} id={"timers-end-button"}/></div>

  return (
    <Timers>
    <div className="title"> Total Time for this Workout {formatTime(total.current)}</div>
    <div className="title">Timers after Timers</div>
      {timers.map((timer) => (
        <Timer key={`timer-${timer.id}`}>
          <TimerTitle>{timer.title}</TimerTitle>
          {timer.currentRound ? <TimerRound>Round {timer.currentRound}/{timer.rounds}</TimerRound> : null}
          <TimerWorkStatus>{timer.workingStatus}</TimerWorkStatus>
          <TimerTitle>{timer.comment}</TimerTitle>
          {timer.C}
        </Timer> 
      ))}
      {timers.length > 0 ? buttons : null}
      {timers.length > 0 ? endButton : null}
    </Timers>
  );
};

export default TimersView;
