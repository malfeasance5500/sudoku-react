import { SET_NOTES } from "../actions/types";

const INITIAL_STATE = false;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // invert state of note setting 
    case SET_NOTES:
      const newState = !state 
      return newState
    default:
      return state;
  }
};
