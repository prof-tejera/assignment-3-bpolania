import {React, useRef, useState} from "react";
import styled from "styled-components";

import Stopwatch from "../components/timers/Stopwatch";
import StopwatchCard from "../components/cards/StopwatchCard";
import Countdown from "../components/timers/Countdown";
import CountdownCard from "../components/cards/CountdownCard";
import XY from "../components/timers/XY";
import XYCard from "../components/cards/XYCard";
import Tabata from "../components/timers/Tabata";
import TabataCard from "../components/cards/TabataCard";

import { useTimers } from "../components/contexts/TimersContext";
import { useEffect } from "react";
import  Button  from '../components/generic/Button'
import  Form  from '../components/generic/Form'

import '../css/style.css'; 

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div`
  border: 1px solid gray;
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
  background-color: #0e37a1;
  color: #fffcd6;
  width: 50vh;
`;

const TimerTitle = styled.div``;

const AddView = () => {

  const { newRound, newWorkingStatus, setTimers } = useTimers();
  const timersQueue = useRef([]);
  const cardsQueue = useRef([]);
  const [length, setLength] = useState(0);

  const [stopwatchTimerInfo] = useState({comment:""});
  const [countdownTimerInfo] = useState({hours:"00", minutes:"00", seconds:"00", comment:""});
  const [xyTimerInfo] = useState({hours:"00", minutes:"00", seconds:"00", rounds:"00", comment:""});
  const [tabataTimerInfo] = useState({hours:"00", minutes:"00", seconds:"00", rest_hours:"00", rest_minutes:"00", rest_seconds:"00", rounds:"00", comment:""});

  useEffect(() => {
  }, [length, cardsQueue])

  const addTimer = (timer) => {
    timersQueue.current.push(timer);
    setLength(timersQueue.current.length);
  }

  const addCard = (card) => {
    cardsQueue.current.push(card);
    setLength(cardsQueue.current.length);
  }

  const handleAddStopwatchClick = () => {
    addTimer({ title: "Stopwatch", id: getCurrentId() + 1, comment: stopwatchTimerInfo.comment, isEditing: false, C: <Stopwatch id={getCurrentId() + 1}/> });
    addCard({id: getCurrentId() + 1, C:<StopwatchCard comment={stopwatchTimerInfo.comment} id={getCurrentId() + 1} onClick={handleDeleteClick}/>});
  }
  const handleAddCountdownClick = () => {
    if (Number(countdownTimerInfo.hours) < 10) {
      countdownTimerInfo.hours = "0" + Number(countdownTimerInfo.hours);
    }
    if (Number(countdownTimerInfo.minutes) < 10) {
      countdownTimerInfo.minutes = "0" + Number(countdownTimerInfo.minutes);
    }
    if (Number(countdownTimerInfo.seconds) < 10) {
      countdownTimerInfo.seconds = "0" + Number(countdownTimerInfo.seconds);  
    }
    addTimer({ title: "Countdown", 
          id: getCurrentId() + 1,
          comment: countdownTimerInfo.comment,
          isEditing: false,
          C: <Countdown
          isEditing={false} 
          hours={countdownTimerInfo.hours} 
          minutes={countdownTimerInfo.minutes} 
          seconds={countdownTimerInfo.seconds}
          id={getCurrentId() + 1} 
          />});
    addCard({ id: getCurrentId() + 1,
          C:<CountdownCard 
          hours={countdownTimerInfo.hours} 
          minutes={countdownTimerInfo.minutes} 
          seconds={countdownTimerInfo.seconds} 
          comment={countdownTimerInfo.comment}
          id={getCurrentId() + 1} 
          onClick={handleDeleteClick}/>});
  }
  const handleAddXYClick = () => {
    if (Number(xyTimerInfo.hours) < 10) {
      xyTimerInfo.hours = "0" + Number(xyTimerInfo.hours);
    }
    if (Number(xyTimerInfo.minutes) < 10) {
      xyTimerInfo.minutes = "0" + Number(xyTimerInfo.minutes);
    }
    if (Number(xyTimerInfo.seconds) < 10) {
      xyTimerInfo.seconds = "0" + Number(xyTimerInfo.seconds);  
    }
    if (Number(xyTimerInfo.rounds) > 1) {
      addTimer({ title: "XY", 
            id: getCurrentId() + 1,
            rounds: xyTimerInfo.rounds,
            comment: xyTimerInfo.comment,
            isEditing: false,
            C: <XY 
            hours={xyTimerInfo.hours} 
            minutes={xyTimerInfo.minutes} 
            seconds={xyTimerInfo.seconds} 
            rounds={xyTimerInfo.rounds}
            id={getCurrentId() + 1} />, 
            currentRound: newRound.value ? newRound.value : 1});
      addCard({id: getCurrentId() + 1, 
            C:<XYCard 
            hours={xyTimerInfo.hours} 
            minutes={xyTimerInfo.minutes} 
            seconds={xyTimerInfo.seconds} 
            rounds={xyTimerInfo.rounds}
            comment={xyTimerInfo.comment}
            id={getCurrentId() + 1}
            onClick={handleDeleteClick}/>});
    } else {
      alert("You must select at least 2 rounds");
    }
    
  }
  const handleAddTabataClick = () => {
    if (Number(tabataTimerInfo.hours) < 10) {
      tabataTimerInfo.hours = "0" + Number(tabataTimerInfo.hours);
    }
    if (Number(tabataTimerInfo.minutes) < 10) {
      tabataTimerInfo.minutes = "0" + Number(tabataTimerInfo.minutes);
    }
    if (Number(tabataTimerInfo.seconds) < 10) {
      tabataTimerInfo.seconds = "0" + Number(tabataTimerInfo.seconds);  
    }
    if (Number(tabataTimerInfo.rest_hours) < 10) {
      tabataTimerInfo.rest_hours = "0" + Number(tabataTimerInfo.rest_hours);
    }
    if (Number(tabataTimerInfo.rest_minutes) < 10) {
      tabataTimerInfo.rest_minutes = "0" + Number(tabataTimerInfo.rest_minutes);
    }
    if (Number(tabataTimerInfo.rest_seconds) < 10) {
      tabataTimerInfo.rest_seconds = "0" + Number(tabataTimerInfo.rest_seconds);  
    }
    if (Number(tabataTimerInfo.rounds) > 0) {
      addTimer({ title: "Tabata",
          id: getCurrentId() + 1,
          rounds: tabataTimerInfo.rounds,
          comment: tabataTimerInfo.comment,
          isEditing: false,
          C: <Tabata 
          work={{hours:tabataTimerInfo.hours, minutes:tabataTimerInfo.minutes, seconds:tabataTimerInfo.seconds}} 
          rest={{hours:tabataTimerInfo.rest_hours, minutes:tabataTimerInfo.rest_minutes, seconds:tabataTimerInfo.rest_seconds}} 
          rounds={tabataTimerInfo.rounds}
          id={getCurrentId() + 1}/>, 
          currentRound: newRound.value ? newRound.value : 1, 
          workingStatus: newWorkingStatus.value ? newWorkingStatus.value : "Work!!!"});
      addCard({id: getCurrentId() + 1,
              C:<TabataCard 
                hours={tabataTimerInfo.hours} 
                minutes={tabataTimerInfo.minutes} 
                seconds={tabataTimerInfo.seconds} 
                restHours={tabataTimerInfo.rest_hours} 
                restMinutes={tabataTimerInfo.rest_minutes} 
                restSeconds={tabataTimerInfo.rest_seconds} 
                rounds={tabataTimerInfo.rounds}
                comment={tabataTimerInfo.comment}
                id={getCurrentId() + 1}
                onClick={handleDeleteClick}/>}); 
    } else {
      alert("You must select at least 1 round");
    }
    
  }
  const handleDoneClick = () => {
    setTimers(timersQueue.current);
  }

  const handleOnChange = (event) => {
    let isNumber = /^\d+$/.test(event.target.value);
    if (event.target.id.toLowerCase().indexOf("comment") === -1 && (!isNumber || !event.target.value === "")) {
      event.target.value = "";
      alert("Please type only numbers");
    } else {
      const ids = event.target.id.split("-");
      if (ids[0]==='c') {
        if (ids[1]==='hours') {
          countdownTimerInfo.hours = event.target.value;
        } else if (ids[1]==='minutes') {
          countdownTimerInfo.minutes = event.target.value;
        } else if (ids[1]==='seconds') {
          countdownTimerInfo.seconds = event.target.value;
        } else if (ids[1]==='rounds') {
          countdownTimerInfo.rounds = event.target.value;
        } else if (ids[1]==='comment') {
          countdownTimerInfo.comment = event.target.value;
        } 
      } else if (ids[0]==='xy') {
        if (ids[1]==='hours') {
          xyTimerInfo.hours = event.target.value;
        } else if (ids[1]==='minutes') {
          xyTimerInfo.minutes = event.target.value;
        } else if (ids[1]==='seconds') {
          xyTimerInfo.seconds = event.target.value;
        } else if (ids[1]==='rounds') {
          xyTimerInfo.rounds = event.target.value;
        } else if (ids[1]==='comment') {
          xyTimerInfo.comment = event.target.value;
        } 
      } else if (ids[0]==='t') {
        if (ids[1]==='hours') {
          tabataTimerInfo.hours = event.target.value;
        } else if (ids[1]==='minutes') {
          tabataTimerInfo.minutes = event.target.value;
        } else if (ids[1]==='seconds') {
          tabataTimerInfo.seconds = event.target.value;
        } else if (ids[1]==='rounds') {
          tabataTimerInfo.rounds = event.target.value;
        } else if (ids[1]==='comment') {
          tabataTimerInfo.comment = event.target.value;
        }  else if (ids[1]==='rest') {
          if (ids[2]==='hours') {
            tabataTimerInfo.rest_hours = event.target.value;
          } else if (ids[2]==='minutes') {
            tabataTimerInfo.rest_minutes = event.target.value;
          } else if (ids[2]==='seconds') {
            tabataTimerInfo.rest_seconds = event.target.value;
          }
        }
      } else if (ids[0]==='s') {
        if (ids[1]==='comment') {
          stopwatchTimerInfo.comment = event.target.value;
        } 
      }
    }
    
  }

  const handleDeleteClick = (event) => {
    const tqid = timersQueue.current.find(item => {
      let result;
      if (Number(item.id) === Number(event.target.value - 1)) result = Number(item.id);
      return result;
    })
    const newTimersQueue = timersQueue.current.filter(item => Number(item.id) !== tqid.id)
    timersQueue.current = newTimersQueue;
    const cqid = cardsQueue.current.find(item => {
      let result;
      if (Number(item.id) === Number(event.target.value)) result = Number(item.id);
      return result;
    })
    const newCardsQueue = cardsQueue.current.filter(item => Number(item.id) !== cqid.id)
    cardsQueue.current = newCardsQueue;
    setLength(cardsQueue.current.length);
  }

  const getCurrentId = () => {
    let result = timersQueue.current.length > 0 ? timersQueue.current.at(-1).id : 0;
    return result;
  }

  return (
    <div className="row">
      <div className="left">
        
      </div>
      <div className="center">
        <div className="title" >Timers after Timers</div>
        <div>
          <Form key={`timer-Stopwatch`} id={"s"} title={"Stopwatch"} onClick={handleAddStopwatchClick} onChange={handleOnChange}/>
          <Form key={`timer-Countdown`} id={"c"} title={"Countdown"} onClick={handleAddCountdownClick} onChange={handleOnChange}/>
          <Form key={`timer-XY`} id={"xy"} title={"XY"} onClick={handleAddXYClick} onChange={handleOnChange}/>
          <Form key={`timer-Tabata`} id={"t"} title={"Tabata"} onClick={handleAddTabataClick} onChange={handleOnChange}/>
        </div>
      </div>
      <div className="right" style={{
          textAlign: 'center',
        }}>
        <div className="title" style={{
          textAlign: 'center',
        }}>Added Timers</div>
        <Cards>
          {cardsQueue.current.map((card) => (
            <Card key={`timer-${card.id}`}>
              <TimerTitle>{card.title}</TimerTitle>
              {card.C}
            </Card>
          ))}
        </Cards>
        {cardsQueue.current.length > 0 ? <Button title={"Add Timers"} onClick={handleDoneClick} className={"form"} id={"timers-complete-button"}/> : null}
      </div>
    </div>
  );
};

export default AddView;
