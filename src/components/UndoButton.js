import React from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { removeUndo } from "../actions";
import { undo } from "../Services/undo";

function UndoButton() {
  const undoState = useSelector((state) => state.undo);
  const dispatch = useDispatch();

  const undoHandler = () => {
    let undoAction = undo(undoState);
    console.log(undoAction);

    if (undoAction == undefined) return;

    // run through the list of returned items and dispatch the undo action
    for (let undoItem of undoAction) {
      console.log(undoItem);
      dispatch(undoItem);
      dispatch(removeUndo());
    }
  };

  return <Button label={"undo"} clickHandler={undoHandler} />;
}

export default UndoButton;
