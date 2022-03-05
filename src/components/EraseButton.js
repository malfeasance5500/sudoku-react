import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCorrect, addUndo, removeCorrect, setSquare } from "../actions";
import Button from "./Button";

function EraseButton() {
  const squareState = useSelector((state) => state.squares);
  const selected = useSelector((state) => state.selected);
  const correctState = useSelector((state) => state.correct);
  const dispatch = useDispatch();

  const eraseHandler = () => {
    if (
      squareState[selected].hidden &&
      (squareState[selected].EnteredNum || squareState[selected].notes)
    ) {
      dispatch(addUndo(setSquare(selected, squareState[selected])));
      dispatch(setSquare(selected, { notes: {}, EnteredNum: null }));

      if (correctState[selected]) {
        dispatch(addUndo(addCorrect(selected)));
        dispatch(removeCorrect(selected));
      }
    }
  };

  return <Button label={"erase"} clickHandler={eraseHandler} />;
}

export default EraseButton;
