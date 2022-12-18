import {React, useState} from "react";
import styled from "styled-components";

import { useTimers } from "../components/contexts/TimersContext";
import { useEffect } from "react";

import  Button  from '../components/generic/Button'

import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";

import '../css/style.css';
import {ErrorBoundary} from 'react-error-boundary'

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

  const { setTimers, timers, newRound, newWorkingStatus, setActive, active, setAction, action, deleteTimer, setDeleteTimer, total, updater, next, setNext, editTimer, updateHours, reloadTimer, setReloadTimer } = useTimers();

  const [newComment, setNewComment] = useState();
  const [prevComment, setPrevComment] = useState();
  const [pendingUpdates, setPendingUpdates] = useState([{}]);
  
  //// Dragable

  let draggingEle;
  let x = 0;
  let y = 0;
  

  let placeholder;
  let isDraggingStarted = false;

  const mouseDownHandler = function (e) {

    draggingEle = e.target;
    const rect = draggingEle.getBoundingClientRect();
      x = e.pageX - rect.left;
      y = e.pageY - rect.top;

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };

  const mouseMoveHandler = function (e) {

    const draggingRect = draggingEle.getBoundingClientRect();

    if (!isDraggingStarted) {
          isDraggingStarted = true;
          placeholder = document.createElement('div');
          placeholder.classList.add('placeholder');
          draggingEle.parentNode.insertBefore(
              placeholder,
              draggingEle.nextSibling
          );
          placeholder.style.height = `${draggingRect.height}px`;
      }
    draggingEle.style.position = 'absolute';
    draggingEle.style.top = `${e.pageY - y}px`;
    draggingEle.style.left = `${e.pageX - x}px`;

    const prevEle = draggingEle.previousElementSibling;
    const nextEle = placeholder.nextElementSibling;

    const swap = function (nodeA, nodeB) {
        const parentA = nodeA.parentNode;
        const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;
    
        nodeB.parentNode.insertBefore(nodeA, nodeB);
    
        parentA.insertBefore(nodeB, siblingA);
    };

    if (prevEle && isAbove(draggingEle, prevEle)) {
        swap(placeholder, draggingEle);
        swap(placeholder, prevEle);
        return;
    }

    if (nextEle && isAbove(nextEle, draggingEle)) {
        swap(nextEle, placeholder);
        swap(nextEle, draggingEle);
    }

    let buffer = [];
    for (let i = 0; i < elements.length; i++) {
      for (let j = 0; j < timers.length; j++) {
        if(Number(elements[i].id) === Number(timers[j].id)) {
          buffer.push(timers[j]);
        }
      }
    }
    setTimers(buffer.slice());
  };

  const mouseUpHandler = function () {
     placeholder && placeholder.parentNode.removeChild(placeholder);
     isDraggingStarted = false;
      draggingEle.style.removeProperty('top');
      draggingEle.style.removeProperty('left');
      draggingEle.style.removeProperty('position');

      x = null;
      y = null;
      draggingEle = null;

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      
  };

  const isAbove = function (nodeA, nodeB) {
      const rectA = nodeA.getBoundingClientRect();
      const rectB = nodeB.getBoundingClientRect();
      return rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2;
  };

  let elements = document.getElementsByClassName("draggable");
    for(var i = 0; i < elements.length; i++) {
      elements[i].addEventListener('mousedown', mouseDownHandler);
    }

  // effects

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
    if (editTimer) {
      for (let i = 0; i < timers.length; i++) {
        if (timers[i].id === Number(editTimer.id)) {
          let ie = timers[i].isEditing;
          timers[i].isEditing = !ie;
          setPrevComment(timers[i].comment);
          setNewComment(timers[i].comment);
          timers[i].comment = newComment;
          timers[i].C = <Countdown
            isEditing={timers[i].isEditing} 
            hours={timers[i].C.hours} 
            minutes={timers[i].C.minutes} 
            seconds={timers[i].C.seconds}
            id={timers[i].id} 
            />;
          const newTimers = timers.slice();
          setTimers(newTimers);
        } 
      }
      
      for (let j = 0; j < pendingUpdates.length; j++) {
        for (let i = 0; i < timers.length; i++) {
          if (timers[i].id === Number(pendingUpdates[j].id)) {
            timers[i].C = <Countdown
              isEditing={timers[i].isEditing} 
              hours={pendingUpdates[j].hours} 
              minutes={pendingUpdates[j].minutes} 
              seconds={pendingUpdates[j].seconds}
              id={timers[i].id} 
              />;
            const anewTimers = timers.slice();
            setReloadTimer(reloadTimer+1);
            setTimers(anewTimers);
          } 
        }
      }
      for (let i = 0; i < timers.length; i++) {
        if (timers[i].id === Number(editTimer.id)) {
          const newTimers = timers.slice();
          setTimers(newTimers);
        } 
      }
    }
    
  },[editTimer])

  useEffect(() => {
    if (pendingUpdates[0] === 0) setPendingUpdates([]);
    if (pendingUpdates.length > 0) {
      for (let i = 0; i < pendingUpdates.length; i++) {
        if (pendingUpdates[i].id === undefined) {
          pendingUpdates[i] = updateHours;
        } else {
          if (pendingUpdates[i].id === updateHours.id) {
            if (updateHours.hours === undefined) {
              updateHours.hours = pendingUpdates[i].hours;
            }
            if (updateHours.minutes === undefined) {
              updateHours.minutes = pendingUpdates[i].minutes;
            }
            if (updateHours.seconds === undefined) {
              updateHours.seconds = pendingUpdates[i].seconds;
            }
            pendingUpdates[i] = updateHours
          } else {
            if (pendingUpdates[i].id !== undefined) {
              pendingUpdates.push(updateHours);
            }
          }
        }
      }
    }
    if (pendingUpdates.length > 0) {
      const u = pendingUpdates.slice();
      setPendingUpdates(u);
    }

  },[updateHours])


  useEffect(() => {
    setDeleteTimer();
  },[timers])

  const handleTimerDescriptionChange = (event) => {
    setPrevComment(event.target.value);
    setNewComment(event.target.value);
  }

  // Handlers and functions

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
          isEdting={timers[i].C.props.isEditing}
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

  function ErrorFallback({error, resetErrorBoundary}) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    )
  }

  return (
    <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => {
      // reset the state of your app so the error doesn't happen again
    }}
  >
    <Timers>
    <div className="title"> Total Time for this Workout {formatTime(localStorage.getItem("total"))}</div>
    <div className="title">Timers after Timers</div>
      {timers.map((timer, index) => (
        <Timer key={`timer-${timer.id}`} className="draggable" id={index + 1}>
          <TimerTitle>{timer.title}</TimerTitle>
          {timer.currentRound ? <TimerRound>Round {timer.currentRound}/{timer.rounds}</TimerRound> : null}
          <TimerWorkStatus>{timer.workingStatus}</TimerWorkStatus>
          {timer.isEditing ? <input className="timerInput" value={prevComment} onChange={handleTimerDescriptionChange}></input> : <TimerTitle>{timer.comment}</TimerTitle>}
          {timer.C}
        </Timer>
        
      ))}
      {timers.length > 0 ? buttons : null}
      {timers.length > 0 ? endButton : null}
    </Timers>
  </ErrorBoundary>
    
  );
};

export default TimersView;
