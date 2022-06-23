import React from 'react';
import {Route, Routes} from "react-router-dom";
import {AddForm} from "./components/AddForm/AddForm";

import './App.css';
import {GamesList} from "./components/GamesList/GamesList";
import {SingleGame} from "./components/SingleGame/SingleGame";

function App() {
  return (
      <Routes>
        <Route path='/' element={<AddForm/>} />
        <Route path='/games-list' element={<GamesList/>} />
        <Route path='/single-game' element={<SingleGame/>} />
      </Routes>
  );
}

export default App;
