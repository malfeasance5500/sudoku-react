import { SET_ALL_SQUARES, SET_SQUARE } from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ALL_SQUARES:
      return action.payload;

    case SET_SQUARE:
      let newState = [...state];
      newState[action.payload.coord]= Object.assign({}, newState[action.payload.coord], action.payload.square)
      return newState;

    default:
      return state;
  }
};