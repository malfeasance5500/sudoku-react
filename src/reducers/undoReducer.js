import { ADD_UNDO, REMOVE_UNDO } from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_UNDO:
      let newState = [...state];
      newState.push(action.payload);
      return newState;

    case REMOVE_UNDO:
      let removeState = [...state];
      removeState.splice(-1, 1);
      console.log("removed", removeState)
      return removeState;

    default:
      return state;
  }
};
