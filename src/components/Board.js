import React from "react";
import { sudokuGen } from "../Services/sudokuGen";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCorrect,
  addUndo,
  removeCorrect,
  setAllAquares,
  setCorrect,
  setSelected,
  setSquare,
} from "../actions";
import NumSpace from "./NumSpace";
import NumPad from "./NumPad";
import DifficultySelection from "./DifficultySelection";
import UndoButton from "./UndoButton";
import EraseButton from "./EraseButton";
import NotesButton from "./NotesButton";

function Board() {
  const dispatch = useDispatch();

  const boardState = useSelector((state) => state.board);
  const squareState = useSelector((state) => state.squares);
  const correctState = useSelector((state) => state.correct);
  const selected = useSelector((state) => state.selected);
  const isNote = useSelector((state) => state.notes);

  // generate the sudoku board
  useEffect(async () => {
    let genNum = sudokuGen();
    let hiddenList = {};
    for (let square = 0; square < boardState.sidesPerSquare ** 4; square++) {
      hiddenList[square] = true;
    }

    // generate the hidden and shown squares
    for (let hidden = 0; hidden < boardState.squaresShown; hidden++) {
      let randomShown = Math.floor(
        Math.random() * Object.keys(hiddenList).length
      );

      randomShown = Object.keys(hiddenList)[randomShown];
      delete hiddenList[randomShown];
    }

    // console.log(hiddenList);

    for (let num = 0, rowCount = 0, colCount = 0; num < genNum.length; num++) {
      genNum[num] = {
        coord: num,
        row: rowCount,
        col: colCount,
        num: genNum[num],
        EnteredNum: null,
        hidden: hiddenList[num] ? true : false,
        class: "",
        notes: {},
      };

      colCount++;

      if (colCount == boardState.sidesPerSquare ** 2) {
        colCount = 0;
        rowCount++;
      }
    }

    await dispatch(setAllAquares(genNum));
    dispatch(setCorrect({}));
    spaceClickHandler(0, 0, genNum);

    document.getElementById("0").click();

    // console.log(genNum);
  }, [boardState]);

  const spaceClickInput = (e) => {
    const square = squareState[selected];
    const selectedCol = squareState[selected].col;
    const selectedRow = squareState[selected].row;
    const pressedKey = e.key;
    if (
      square.hidden &&
      Object.keys(correctState).length !=
        boardState.sidesPerSquare ** 4 - boardState.squaresShown &&
      !isNaN(pressedKey) &&
      pressedKey != 0
    ) {
      if (!isNote) {
        dispatch(
          addUndo(
            setSquare(square.coord, {
              notes: { ...square.notes },
              EnteredNum: square.EnteredNum,
            })
          )
        );

        dispatch(
          setSquare(square.coord, {
            notes: {},
            EnteredNum: parseInt(pressedKey),
          })
        );

        if (parseInt(pressedKey) === square.num) {
          dispatch(addCorrect(square.coord));
          dispatch(addUndo(removeCorrect(square.coord)));
        } else if (correctState[selected]) {
          dispatch(removeCorrect(square.coord));
          dispatch(addUndo(addCorrect(square.coord)));
        }

        spaceClickHandler(square.row, square.col, false, parseInt(pressedKey));
      } else {
        let notes = { ...square.notes };
        if (notes[pressedKey]) delete notes[pressedKey];
        else notes[pressedKey] = pressedKey;

        dispatch(
          addUndo(
            setSquare(square.coord, {
              notes: { ...square.notes },
              EnteredNum: square.EnteredNum,
            })
          )
        );
        dispatch(setSquare(square.coord, { notes, EnteredNum: null }));

        if (square.EnteredNum == square.num) {
          dispatch(removeCorrect(square.coord));
          dispatch(addUndo(addCorrect(square.coord)));
        }

        spaceClickHandler(square.row, square.col, false, 0);
      }
    }
  };

  // Calculates which squares to add css styles to upon square click
  const spaceClickHandler = (
    row,
    col,
    squareStatePassed = squareState,
    squareNewVal = false
  ) => {
    if (!squareStatePassed) squareStatePassed = squareState;

    for (let clear = 0; clear < boardState.sidesPerSquare ** 4; clear++) {
      dispatch(setSquare(clear, { class: "" }));
    }

    let selectedCol =
      Math.floor(col / boardState.sidesPerSquare) * boardState.sidesPerSquare;
    let selectedRow =
      Math.floor(row / boardState.sidesPerSquare) * boardState.sidesPerSquare;
    // alert(selectedRow)
    for (
      let rowCount = selectedRow;
      rowCount < selectedRow + boardState.sidesPerSquare;
      rowCount++
    ) {
      for (
        let colCount = selectedCol;
        colCount < selectedCol + boardState.sidesPerSquare;
        colCount++
      ) {
        dispatch(
          setSquare(rowCount * boardState.sidesPerSquare ** 2 + colCount, {
            class: "subSelected",
          })
        );
      }
    }

    for (
      let rowCount = 0;
      rowCount < boardState.sidesPerSquare ** 2;
      rowCount++
    ) {
      dispatch(
        setSquare(rowCount * boardState.sidesPerSquare ** 2 + col, {
          class: "subSelected",
        })
      );
    }

    for (
      let colCount = 0;
      colCount < boardState.sidesPerSquare ** 2;
      colCount++
    ) {
      dispatch(
        setSquare(row * boardState.sidesPerSquare ** 2 + colCount, {
          class: "subSelected",
        })
      );
    }
    for (let square of squareStatePassed) {
      if (
        checkSameNum(
          square.coord,
          row * boardState.sidesPerSquare ** 2 + col,
          squareStatePassed,
          squareNewVal
        )
      ) {
        dispatch(setSquare(square.coord, { class: "sameNum" }));
      }
    }

    dispatch(
      setSquare(row * boardState.sidesPerSquare ** 2 + col, {
        class: "selected",
      })
    );
    dispatch(setSelected(row * boardState.sidesPerSquare ** 2 + col));
  };

  // check if the squares have the same num
  const checkSameNum = (
    coord,
    selected,
    state = squareState,
    squareNewVal = false
  ) => {
    console.log(coord, selected, state);
    selected = state[selected];
    coord = state[coord];

    const selectedVal = Number.isInteger(squareNewVal)
      ? squareNewVal
      : selected.EnteredNum;

    try {
      if (
        !selected.hidden &&
        ((coord.hidden && coord.EnteredNum == selected.num) ||
          (!coord.hidden && coord.num == selected.num))
      )
        return true;

      if (
        selected.hidden &&
        selectedVal &&
        ((!coord.hidden && coord.num == selectedVal) ||
          (coord.hidden && coord.EnteredNum == selectedVal))
      )
        return true;
    } catch (err) {
      return false;
    }

    return false;
  };

  const returnSpaces = () => {
    let squares = [];
    for (let square = 0; square < squareState.length; square++) {
      squares.push(
        <NumSpace
          spaceClickHandler={spaceClickHandler}
          key={square}
          id={square}
          disabled={
            Object.keys(correctState).length ==
            boardState.sidesPerSquare ** 4 - boardState.squaresShown
          }
          val={squareState[square].num}
        />
      );
    }
    return squares;
  };

  return (
    <div
      id="Board"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onKeyDown={(e) => spaceClickInput(e)}
    >
      <div style={{ width: "100%" }}>
        <DifficultySelection />
        <div
          style={{
            position: "relative",
            display: "grid",
            // width: "50vw",
            // height: "50vw",
            gridTemplateColumns: `repeat(${
              boardState.sidesPerSquare ** 2
            }, 1fr)`,
          }}
        >
          {returnSpaces()}
          {Object.entries(correctState).length ==
          boardState.sidesPerSquare ** 4 - boardState.squaresShown ? (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                backgroundColor: "#00000080",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                color: "#fdfff5",
                fontSize: "10rem",
              }}
            >
              You Win
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <div style={{ textAlign: "center" }}>
          <UndoButton />
          <EraseButton />
          <NotesButton />
        </div>

        <NumPad spaceClickHandler={spaceClickHandler} />
      </div>
    </div>
  );
}

export default Board;
