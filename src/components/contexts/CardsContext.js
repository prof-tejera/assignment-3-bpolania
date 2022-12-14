import React, { createContext, useContext, useState } from "react";

const CardsContext = createContext({});

export const TimersContextProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  return (
    <CardsContext.Provider value={{ cards, setCards }}>
      {children}
    </CardsContext.Provider>
  );
};

export const useCards = () => useContext(CardsContext);