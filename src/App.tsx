import React from 'react';
import { Route, Routes} from "react-router-dom";
import {GamesList} from "./components/GamesList/GamesList";
import {SingleGame} from "./components/SingleGame/SingleGame";
import {MyCollection} from "./components/MyCollection/MyCollection";
import {FindGames} from "./components/FindGames/FindGames";

import './App.css';
import {LogInPage} from "./pages/LogInPage/LogInPage";
import {Dashboard} from "./components/Dashboard/Dashboard";


function App() {

  return (
      <Routes>
        <Route path='/' element={<FindGames />} />
        <Route path='/login' element={<LogInPage />} />
        <Route path='/games-list' element={<GamesList/>} />
        <Route path='/single-game' element={<SingleGame gameId={''} userId={''}/>} />
        <Route path='/my-collection/:userId' element={<MyCollection/>}/>

      </Routes>
  );
}

export default App;
