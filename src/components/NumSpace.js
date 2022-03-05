import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCorrect, removeCorrect, setSquare, addUndo } from "../actions";

function NumSpace(props) {
  const dispatch = useDispatch();

  const numSpaceState = useSelector((state) => state.squares[props.id]);
  const sidesPerSquare = useSelector((state) => state.board.sidesPerSquare);
  const correct = useSelector((state) => state.correct[numSpaceState.coord]);
  const isNote = useSelector((state) => state.notes);

  const keyPressHandler = (e) => {
    // only run the code if not all spaces are correct, and the input is 1-9
    if (
      numSpaceState.hidden &&
      !props.disabled &&
      !isNaN(e.key) &&
      e.key != 0
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
            EnteredNum: parseInt(e.key),
          })
        );

        if (parseInt(e.key) == numSpaceState.num) {
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
          parseInt(e.key)
        );
      } else {
        let notes = { ...numSpaceState.notes };
        const key = parseInt(e.key);
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

  const returnClass = () => {
    let classString = "";
    if (!numSpaceState.hidden) classString += "shown ";
    classString += numSpaceState.class;

    if (numSpaceState.col == 0) classString += " left ";
    if ((numSpaceState.col + 1) % sidesPerSquare == 0) classString += " right ";

    if (numSpaceState.row == 0) classString += " top ";
    if ((numSpaceState.row + 1) % sidesPerSquare == 0)
      classString += " bottom ";

    return classString;
  };

  const returnValue = () => {
    return (
      <div
        className={returnClass() + " square"}
        style={{
          // paddingBottom: "25%",
          // paddingTop: "25%",
          
          position: "relative",
          textAlign: "center",
          fontSize: "2em",
        }}
        onKeyDown={(e) => keyPressHandler(e)}
        onClick={() =>
          props.spaceClickHandler(numSpaceState.row, numSpaceState.col)
        }
        // make div clickable
        tabIndex={numSpaceState.hidden ? 0 : -1}
      >
        {/* only show number is the space is not hidden  */}
        {Object.entries(numSpaceState.notes).length != 0 ? (
          ""
        ) : (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {numSpaceState.hidden
              ? numSpaceState.EnteredNum
              : numSpaceState.num}
          </div>
        )}

        <div
          style={{
            zIndex: 9,
            position: "relative",
            // width: "100%",
            // height: "auto",
            // top: numSpaceState.row * 10.3 + "%",
            display: "grid",
            fontSize: "0.5em",
            // borderTop: "5px solid black",
            top: "0",
            // textAlign: "justify",
            // justifyContent: "space-around",
            alignItems: "center",
            gridTemplateColumns: `repeat(${sidesPerSquare}, 1fr)`,
            userSelect: "none",
          }}
        >
          <div class="noteNumber" style={numSpaceState.notes[1] ? {} : { color: "#FFFFFF00" }}>
            1
          </div>
          <div class="noteNumber" style={numSpaceState.notes[2] ? {} : { color: "#FFFFFF00" }}>
            2
          </div>
          <div class="noteNumber" style={numSpaceState.notes[3] ? {} : { color: "#FFFFFF00" }}>
            3
          </div>
          <div class="noteNumber" style={numSpaceState.notes[4] ? {} : { color: "#FFFFFF00" }}>
            4
          </div>
          <div class="noteNumber" style={numSpaceState.notes[5] ? {} : { color: "#FFFFFF00" }}>
            5
          </div>
          <div class="noteNumber" style={numSpaceState.notes[6] ? {} : { color: "#FFFFFF00" }}>
            6
          </div>
          <div class="noteNumber" style={numSpaceState.notes[7] ? {} : { color: "#FFFFFF00" }}>
            7
          </div>
          <div class="noteNumber" style={numSpaceState.notes[8] ? {} : { color: "#FFFFFF00" }}>
            8
          </div>
          <div class="noteNumber" style={numSpaceState.notes[9] ? {} : { color: "#FFFFFF00" }}>
            9
          </div>
        </div>
      </div>
    );
  };

  return returnValue();
}

export default NumSpace;
