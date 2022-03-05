import { addUndo, removeUndo } from "../actions";
import { ADD_CORRECT, REMOVE_CORRECT, SET_CORRECT } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case SET_CORRECT:
      return action.payload
    
    // add new item with the correct space entry
    case ADD_CORRECT:
      state = { ...state, [action.payload]: true };
      return state;

    // Remove a previously added correct space entry
    case REMOVE_CORRECT:
      let newState = { ...state };
      delete newState[action.payload];
      state = newState;
      return state;
    default:
      return state;
  }
};
