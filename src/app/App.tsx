import React from 'react';
import './App.css';
import {Schedule} from "../features/schedule/Schedule";
import {Route, Routes} from "react-router-dom";
import {Aircraft} from "../features/aircraft/Aircraft";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Schedule/>}/>
        <Route path="/aircraft" element={<Aircraft/>}/>
    </Routes>
  );
}

export default App;
