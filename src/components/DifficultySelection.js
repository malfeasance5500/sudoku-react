import React from 'react';
import { useDispatch } from 'react-redux';
import { setEasy, setMedium, setHard } from '../actions';

function DifficultySelection() {

  const dispatch = useDispatch()
  
  return ( <header style={{textAlign: "center"}}>
    <nav>
      <ul>
        <li onClick={()=> dispatch(setEasy())} ><h3>Easy</h3></li>
        <li onClick={()=> dispatch(setMedium())} ><h3>Medium</h3></li>
        <li onClick={()=> dispatch(setHard())} ><h3>Hard</h3></li>
      </ul>
    </nav>
  </header> );
}

export default DifficultySelection;