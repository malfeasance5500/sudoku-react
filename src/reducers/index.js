import { combineReducers } from "redux";

import board from "./boardReducer";
import squares from "./squaresReducer";
import correct from "./correctSpaceReducer";
import notes from "./notesReducer";
import undo from "./undoReducer";
import selected from "./selectedReducer"

export default combineReducers({ board, squares, correct, notes, undo, selected });
