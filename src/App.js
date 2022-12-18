import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";

import DocumentationView from "./views/DocumentationView";
import TimersView from "./views/TimersView";
import AddView from "./views/AddView";
import HistoryView from "./views/HistoryView";

const Container = styled.div`
  background: #f0f6fb;
  height: 120vh;
  overflow: auto;
`;

const Nav = () => {
  return (
    <nav className="sidenav">
      <ul>
        <li>
          <Link to="/" className="link">Timers</Link>
        </li>
        <li>
          <Link to="/add" className="link">Add Timers</Link>
        </li>
        <li>
          <Link to="/history" className="link">History</Link>
        </li>
        <li>
          <Link to="/docs" className="link">Documentation</Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <Container>
      <Router>
        <Nav />
        <Routes>
          <Route path="/docs" element={<DocumentationView />} />
          <Route path="/" element={<TimersView />} />
          <Route path="/add" element={<AddView />} />
          <Route path="/history" element={<HistoryView />} />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
