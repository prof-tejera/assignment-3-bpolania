import { useState, useEffect, useRef } from "react";
import {formatTimeDigits } from '../../utils/helpers'
import { useInterval } from 'usehooks-ts'
import  Button  from '../generic/Button'
import  Display  from '../generic/Display'

import { useTimers } from "../contexts/TimersContext";

import {ErrorBoundary} from 'react-error-boundary'

const Stopwatch = ({id}, visibility='block') => {
    let [elapsedTime, setElapsedTime] = useState(0);
    let [isPaused, setIsPaused] = useState(true);
    let [isZero, setIsZero] = useState(true);
    const _id = useRef(id);

    const { active, action, setAction, setDeleteTimer, total, setUpdater } = useTimers();

    useEffect(() => {
      if (active === _id.current && isPaused) {
        if (action === "next") {
          handleRestartClick();
          setAction("start");
          handlePauseClick();
        } else if (action === "start") {
          handlePauseClick();
        }
      } else if (!isPaused) {
        if (action === "next") {
          handleRestartClick();
          setAction("pause");
          handlePauseClick();
        } else if (action === "pause") {
          handlePauseClick();
        }
      } 
      if (action === "end") {
        handleRestartClick();
        setAction("pause");
        handlePauseClick();
        total.current = 0;
      }
    },[action])

    useInterval(
      () => {
        elapsedTime === 0 ? setIsZero(true) : setIsZero(false);
        setElapsedTime(elapsedTime + 1000);
        total.current = total.current + 1000;
        localStorage.setItem("total", total.current); 
        setUpdater(total.current);
      },
      !isPaused ? 1000 : null,
    )

    let seconds = formatTimeDigits(Math.floor((elapsedTime / 1000) % 60));
    let minutes = formatTimeDigits(Math.floor((elapsedTime / 60000) % 60));
    let hours = formatTimeDigits(Math.floor((elapsedTime / 3600000) % 60));
;
    
    const handleDeleteClick = () => {
      setDeleteTimer(_id.current);
      setIsPaused(true);
      setAction("pause");
      total.current -= elapsedTime;
    }
    const handleRestartClick = () => {
      setIsPaused(!isPaused);
      setIsZero(true);
      setElapsedTime(0);
    }

    const handlePauseClick = () => {
      setIsPaused(!isPaused);
    }

    function ErrorFallback({error, resetErrorBoundary}) {
      return (
        <div role="alert">
          <p>Something went wrong:</p>
          <pre>{error.message}</pre>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      )
    }

    return(
      <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => {
      // reset the state of your app so the error doesn't happen again
    }}
  >
    <Display 
          timer={hours + ":" + minutes + ":" + seconds}
          del={<Button 
            onClick={handleDeleteClick} 
            className={"btn"} 
            id={"reset"} 
            title={"Delete"}
            disabled={false}></Button>}
          visibility={visibility}
          />
  </ErrorBoundary>
      
          
    )
}

export default Stopwatch;
