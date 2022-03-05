import Button from "./Button";
import Board from "./Board";
import { sudokuGen } from "../Services/sudokuGen_old";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAllAquares } from "../actions";
import UndoButton from "./UndoButton";
import EraseButton from "./EraseButton";
import NotesButton from "./NotesButton";
import DifficultySelection from "./DifficultySelection";

function App() {
  const clickHandler = (e, callback) => {
    alert("haha pressed");
    callback();
  };

  return (
    // <div  onClick={()=>alert("app")} className="App">
    <div className="App">
      {/* <Button clickHandler={clickHandler} />
      <Button clickHandler={clickHandler} />
      <Button clickHandler={clickHandler} /> */}
      <Board />
    </div>
  );
}

export default App;
