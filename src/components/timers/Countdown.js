import { useState, useRef, useEffect ,React } from "react";
import { formatTimeDigits } from '../../utils/helpers'
import  Button  from '../generic/Button'
import  Display  from '../generic/Display'
import '../../css/style.css'; 

import { useInterval } from 'usehooks-ts'  
import { useTimers } from "../contexts/TimersContext";


const Countdown = ({hours, minutes, seconds, id, isEditing, visibility='inline-block'}) => {
  const [timer, setTimer] = useState('00:00:00');
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const totalTime = useRef(0);
  const _id = useRef(id);

  const { active, action, setAction, setDeleteTimer, setEditTimer, total, next, setNext, reloadTimer } = useTimers();

  useEffect(() => {
    if (totalTime.current === 0) {
      totalTime.current = getTotalTime();
      total.current += getTotalTime();
    }
    resetTime(totalTime.current);
  },[])

  useEffect(() => {
    totalTime.current = getTotalTime();
    total.current = getTotalTime();
    resetTime(totalTime.current);
  },[reloadTimer])

  useEffect(() => {
    if (active === _id.current && isPaused) {
      if (action === "next") {
        handleFFClick();
        setAction("start");
        handlePauseClick();
      } else if (action === "start") {
        handlePauseClick();
      }
    } else if (!isPaused) {
      if (action === "next") {
        handleFFClick();
        setAction("pause");
        handlePauseClick();
      } else if (action === "pause") {
        handlePauseClick();
      }
    }
    if (action === "end") {
      reset();       
    }
  },[action])

  useInterval(
    () => {
      if (time > 0) {
        setTime(time - 1000);
      } else {
        setNext(next + 1);
        setIsPaused(true);
      }
      setTimeTo(time);
    },
    !isPaused ? 1000 : null,
  )
  
  const formatTime = (miliseconds) => {
      const _seconds = Math.floor((miliseconds / 1000) % 60);
      const _minutes = Math.floor((miliseconds / 1000 / 60) % 60);
      const _hours = Math.floor((miliseconds / 1000 / 60 / 60) % 24);
      return {
          _hours, _minutes, _seconds
      };
  }

  const setTimeTo = (miliseconds) => {
    const {_hours, _minutes, _seconds} = formatTime(miliseconds);
    setTimer(
      formatTimeDigits(_hours) + ':' +
      formatTimeDigits(_minutes) + ':' +
      formatTimeDigits(_seconds)
    )
  }

  const getTotalTime = () => {
    let total = 0;
    total += hours * 3600000;
    total += (minutes * 60000);
    total += (seconds * 1000);
    return total;
  }

  const reset = () => {
    resetTime(getTotalTime());
    setAction("pause"); 
    setIsPaused(true);
  }

  const handleDeleteClick = () => {
    setDeleteTimer(_id.current);
    setIsPaused(true);
    setAction("pause");
    total.current -= getTotalTime();
  }
  
  const handleEditClick = () => {
    const idc = { id: _id.current };
    setEditTimer({ ...idc, id : _id.current });
    setIsPaused(true);
    setAction("pause");
  }

  const handlePauseClick = () => {
    setIsPaused(!isPaused);
    setTime(time);
  }

  const handleFFClick = () => {
    setIsPaused(true);
    resetTime(0);
  }

  const resetTime = (t) => {
    setTime(t);
    setTimeTo(t);
  }

  return (
    <Display 
      timer={timer} 
      del={<Button 
          onClick={handleDeleteClick} 
          className={"btn"} 
          id={"reset"} 
          title={"Delete"}
          disabled={false}></Button>}
      edit={<Button 
          onClick={handleEditClick} 
          className={"btn"} 
          id={"reset"} 
          title={isEditing ? "Save" : "Edit"}
          disabled={false}></Button>}
      visibility={visibility}
      isEditing={isEditing}
      tid={_id.current}
    />
    )
}

export default Countdown;
