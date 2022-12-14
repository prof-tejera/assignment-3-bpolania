import { useState, useEffect, useRef } from "react";
import {formatTimeDigits} from '../../utils/helpers'
import  Button  from '../generic/Button'
import  Display  from '../generic/Display'

import { useInterval } from 'usehooks-ts'
import { useTimers } from "../contexts/TimersContext";

const XY = ({hours, minutes, seconds, rounds, id, visibility='block'}) => {

const [timer, setTimer] = useState('00:00:00');
const [isPaused, setIsPaused] = useState(true);
const [time, setTime] = useState(0);
const totalTime = useRef(0);
const [currentRound, setCurrentRound] = useState(1);
const { setNewRound, active, action, setAction, setDeleteTimer, total, setNext, next } = useTimers();
const _id = useRef(id);

  useEffect(() => {
    if (totalTime.current === 0) {
      totalTime.current = getTotalTime();
      total.current += (getTotalTime() * Number(rounds));
    }
    reset(totalTime.current, 1);
  },[])

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
      reset(getTotalTime(), 1);
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
        if (currentRound < rounds) {
          reset(totalTime.current, currentRound + 1);
          setNewRound({id:_id.current, value: currentRound < rounds ? currentRound + 1 : rounds});
        } else {
          setNext(next + 1);
          setIsPaused(true);
        }
      }
      setTimeTo(time);
    },
    !isPaused && currentRound <= rounds ? 1000 : null,
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
    total += total + (minutes * 60000);
    total += (seconds * 1000);
    return total;
  }

  const handleDeleteClick = () => {
    setDeleteTimer(_id.current);
    setIsPaused(true);
    setAction("pause");
    total.current -= (getTotalTime() * Number(rounds));
  }

  const handlePauseClick = () => {
    setNewRound({id:_id.current, value: 1});
    setIsPaused(!isPaused);
  }

  const handleFFClick = () => {
    setIsPaused(true);
    reset(0, 0);
  }

  const reset = (t, r) => {
    setTime(t);
    setTimeTo(t);
    setCurrentRound(r);
    setNewRound({id:0, value: r});
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
      visibility={visibility}
    />
    )
};

export default XY;