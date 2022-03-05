import {
  ADD_UNDO,
  REMOVE_UNDO,
  SET_CORRECT,
  ADD_CORRECT,
  REMOVE_CORRECT,
  SET_EASY,
  SET_HARD,
  SET_MEDIUM,
  SET_NOTES,
  SET_SQUARE,
  SET_ALL_SQUARES,
  SET_SELECTED,
} from "./types";

export const setEasy = () => {
  return { type: SET_EASY };
};

export const setMedium = () => {
  return { type: SET_MEDIUM };
};

export const setHard = () => {
  return { type: SET_HARD };
};

export const setNote = () => {
  return { type: SET_NOTES };
};

export const setAllAquares = (squares) => {
  return { type: SET_ALL_SQUARES, payload: squares };
};

export const setSquare = (coord, square, addToStack = true) => {
  return { type: SET_SQUARE, payload: { coord, square }, addToStack };
};

export const addUndo = (undo) => {
  return { type: ADD_UNDO, payload: undo };
};

export const removeUndo = () => {
  return { type: REMOVE_UNDO };
};

export const setCorrect = (correctState) =>{
  return {type:SET_CORRECT, payload:correctState}
}

export const addCorrect = (coord, addToStack = true) => {
  return { type: ADD_CORRECT, payload: coord, addToStack };
};

export const removeCorrect = (coord) => {
  return { type: REMOVE_CORRECT, payload: coord };
};

export const setSelected = (coord) => {
  return { type: SET_SELECTED, payload: coord };
};
