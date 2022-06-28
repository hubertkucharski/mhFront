import React from 'react';
import {Route, Routes} from "react-router-dom";
import {GamesList} from "./components/GamesList/GamesList";
import {SingleGame} from "./components/SingleGame/SingleGame";
import {MyCollection} from "./components/MyCollection/MyCollection";
import {FindeGames} from "./components/FindeGames/FindeGames";

import './App.css';

function App() {
  return (
      <Routes>
        <Route path='/' element={<FindeGames/>} />
        <Route path='/games-list' element={<GamesList/>} />
        <Route path='/single-game' element={<SingleGame gameId={''} userId={''}/>} />
        <Route path='/my-collection/:userId' element={<MyCollection/>}/>

      </Routes>
  );
}

export default App;
