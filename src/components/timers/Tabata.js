import { useState, useEffect, useRef } from "react";
import {formatTimeDigits} from '../../utils/helpers'
import  Button  from '../generic/Button'
import  Display  from '../generic/Display'

import { useInterval } from 'usehooks-ts'
import { useTimers } from "../contexts/TimersContext";

const Tabata = ({work, rest, rounds, id, isEditing, visibility='block'}) => {

  const [timer, setTimer] = useState('00:00:00');
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const totalTime = useRef(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentTimer, setCurrentTimer] = useState(work);
  const [isWorkStateActive, setIsWorkStateActive] = useState(true);
  const { setNewRound, setNewWorkingStatus, active, action, setAction, setEditTimer, setDeleteTimer, total, setNext, next  } = useTimers();
  const _id = useRef(id); 

    useEffect(() => {
      total.current += Number(rounds) * (getTotalTime(work.hours,work.minutes,work.seconds) + getTotalTime(rest.hours,rest.minutes,rest.seconds));
      totalTime.current = getTotalTime(currentTimer.hours,currentTimer.minutes,currentTimer.seconds);
      localStorage.setItem("total",total.current);
      reset(totalTime.current, currentRound);
    },[currentTimer])

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
        reset(getTotalTime(work.hours,work.minutes,work.seconds), 1);
        setCurrentRound(1);
        setIsPaused(true);
        setAction("pause");
      }
    },[action])
  
    useInterval(
      () => {
        if (time > 0) {
          setTime(time - 1000);
        } else {
          if (isWorkStateActive) {
            console.log("working...",currentTimer);
            setNewWorkingStatus({id:_id.current, value: "Work!!!"});
            setCurrentRound(currentRound + 1);
            setNewRound({id:_id.current, value: currentRound < rounds ? currentRound : rounds});
            setCurrentTimer(rest);
          } else {
            setNewWorkingStatus({id:_id.current, value: "Rest..."});
            setCurrentTimer(work);
          }
          setIsWorkStateActive(!isWorkStateActive);
          if (currentRound > rounds) {
            setNext(next + 1);
            setIsPaused(true);
          }
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
  
    const getTotalTime = (hours, minutes, seconds) => {
      let total = 0;
      total += hours * 3600000;
      total += minutes * 60000;
      total += seconds * 1000;
      return total;
    }
  
    const handleDeleteClick = () => {
      setDeleteTimer(_id.current);
      setIsPaused(true);
      setAction("pause");
      total.current -= Number(rounds) * (getTotalTime(work.hours,work.minutes,work.seconds) + getTotalTime(rest.hours,rest.minutes,rest.seconds));
    }
  
    const handlePauseClick = () => {
      setNewWorkingStatus({id:_id.current, value: "Rest..."});
      setIsWorkStateActive(false);
      setIsPaused(!isPaused);
    }
  
    const handleFFClick = () => {
      setIsPaused(true);
      reset(0, 0);
    }

    const handleEditClick = () => {
      const idc = { id: _id.current };
      setEditTimer({ ...idc, id : _id.current });
      setIsPaused(true);
      setAction("pause");
    }
  
    const reset = (t, r) => {
      setTime(t);
      setTimeTo(r > rounds ? 0 : t);
      setCurrentRound(r);
      if  (r > rounds) setNewWorkingStatus({id:_id.current, value: "Complete"})
      if  (r === 0) setNewWorkingStatus({id:_id.current, value: "Get Ready!"})
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
  };

export default Tabata;
