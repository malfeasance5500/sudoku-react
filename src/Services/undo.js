import { ADD_CORRECT, REMOVE_CORRECT } from "../actions/types";

export const undo = (state) => {
  let undoItems = state.slice(-1);
  console.log("undoItem", undoItems);
  if (undoItems[0].type == REMOVE_CORRECT || undoItems[0].type == ADD_CORRECT)
    undoItems = state.slice(-2);
  return undoItems;
};

// return the last thing from undo
// run the function, remove from undo
