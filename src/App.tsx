import React from 'react';
import {Route, Routes} from "react-router-dom";
import {AddForm} from "./components/AddForm/AddForm";
import {GamesList} from "./components/GamesList/GamesList";
import {SingleGame} from "./components/SingleGame/SingleGame";
import {MyCollection} from "./components/MyCollection/MyCollection";

import './App.css';

function App() {
  return (
      <Routes>
        <Route path='/' element={<AddForm/>} />
        <Route path='/games-list' element={<GamesList/>} />
        <Route path='/single-game' element={<SingleGame gameId={''}/>} />
          <Route path='/my-collection' element={<MyCollection userId='7a9f761e-f155-11ec-b862-3ecfab8190d4'/>}/>
      </Routes>
  );
}

export default App;
