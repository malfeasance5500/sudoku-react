import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {addUndo, setSquare, addCorrect, removeCorrect} from "../actions/index"

function NumPadButton(props) {
  const selected = useSelector((state) => state.selected);
  const squareState = useSelector((state) => state.squares)  ;
  const numSpaceState = squareState.length ? squareState[selected] : {coord:0}
  const correct = useSelector((state) => state.correct[numSpaceState.coord]);
  const isNote = useSelector((state) => state.notes);

  const dispatch = useDispatch()

  const keyPressHandler = () => {
    // only run the code if not all spaces are correct, and the input is 1-9
    if (
      numSpaceState.hidden &&
      !props.disabled &&
      !isNaN(props.num) &&
      props.num != 0
    ) {
      if (!isNote) {
        dispatch(
          addUndo(
            setSquare(numSpaceState.coord, {
              notes: {...numSpaceState.notes},
              EnteredNum: numSpaceState.EnteredNum,
            })
          )
        );

        dispatch(
          setSquare(numSpaceState.coord, {
            notes: {},
            EnteredNum: parseInt(props.num),
          })
        );

        if (parseInt(props.num) == numSpaceState.num) {
          dispatch(addCorrect(numSpaceState.coord));
          dispatch(addUndo(removeCorrect(numSpaceState.coord)));
        } else if (correct) {
          dispatch(removeCorrect(numSpaceState.coord));
          dispatch(addUndo(addCorrect(numSpaceState.coord)));
        }
        props.spaceClickHandler(
          numSpaceState.row,
          numSpaceState.col,
          false,
          parseInt(props.num)
        );
      } else {
        let notes = { ...numSpaceState.notes };
        const key = parseInt(props.num);
        if (notes[key]) delete notes[key];
        else notes[key] = key;

        dispatch(
          addUndo(
            setSquare(numSpaceState.coord, {
              notes: { ...numSpaceState.notes },
              EnteredNum: numSpaceState.EnteredNum,
            })
          )
        );
        dispatch(
          setSquare(numSpaceState.coord, {
            notes,
            EnteredNum: null,
          })
        );

        if (numSpaceState.EnteredNum == numSpaceState.num) {
          dispatch(removeCorrect(numSpaceState.coord));
          dispatch(addUndo(addCorrect(numSpaceState.coord)));
        }
      props.spaceClickHandler(numSpaceState.row, numSpaceState.col,false,0);

      }

    }
  };

  return <button className="numPad" onClick={keyPressHandler}  style={{
    // padding: "5%",
    height: "4rem",
    fontSize: "2rem",
  }} >{props.num}</button>;
}

export default NumPadButton;
