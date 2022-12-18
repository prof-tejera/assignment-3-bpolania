import React, { createContext, useContext, useState, useRef, useEffect } from "react";

const TimersContext = createContext({});

export const TimersContextProvider = ({ children }) => {
  const [timers, setTimers] = useState([]);
  const [newRound, setNewRound] = useState({});
  const [newWorkingStatus, setNewWorkingStatus] = useState({});
  const [active, setActive] = useState(true);
  const [action, setAction] = useState();
  const [deleteTimer, setDeleteTimer] = useState();
  const [editTimer, setEditTimer] = useState(0);
  const [next, setNext] = useState(0);
  const [updater, setUpdater] = useState(0);
  const [updateHours, setUpdateHours] = useState(0);
  const [reloadTimer, setReloadTimer] = useState(0);
  
  const total= useRef(0);

  useEffect(() => {
    if (timers === undefined) {}
    else {
      localStorage.setItem("current", null);
      localStorage.setItem("current", JSON.stringify(timers));
      if (localStorage.getItem("log") === null) {
        localStorage.setItem("log", JSON.stringify([])); 
      }
    }
  }, [timers])

  // useEffect(() => {
  //   console.log("A");
  //   localStorage.clear();
  // }, [])

  return (
    <TimersContext.Provider value={{ setTimers, 
                                     timers, 
                                     setNewRound, 
                                     newRound, 
                                     setNewWorkingStatus, 
                                     newWorkingStatus, 
                                     active, 
                                     setActive, 
                                     action, 
                                     setAction, 
                                     deleteTimer, 
                                     setDeleteTimer,
                                     editTimer, 
                                     setEditTimer, 
                                     total, 
                                     updater, 
                                     setUpdater, 
                                     next, 
                                     setNext,
                                     updateHours,
                                     setUpdateHours,
                                     reloadTimer,
                                     setReloadTimer
                                     }}>
      {children}
    </TimersContext.Provider>
  );
};

export const useTimers = () => useContext(TimersContext);