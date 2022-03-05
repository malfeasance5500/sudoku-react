import { ADD_CORRECT, REMOVE_CORRECT } from "../actions/types";

export const undo = (state) => {

  // get the last item pushed into undo stack 
  let undoItems = state.slice(-1);
  console.log("undoItem", undoItems);

  // add another item if undo chaining is required
  if (undoItems[0].type == REMOVE_CORRECT || undoItems[0].type == ADD_CORRECT)
    undoItems = state.slice(-2);
  return undoItems;
};
