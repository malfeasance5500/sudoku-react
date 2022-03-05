import { SET_EASY, SET_MEDIUM, SET_HARD } from "../actions/types";

const INITIAL_STATE = {
  difficulty: "easy",
  squaresShown: 35,
  sidesPerSquare: 3,
  time:null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_EASY:
      state = {
        ...state,
        difficulty: "easy",
        squaresShown: 35,
        sidesPerSquare: 3,
        time:Math.random()*10000
      };
      return state;
    case SET_MEDIUM:
      state = {
        ...state,
        difficulty: "medium",
        squaresShown: 30,
        sidesPerSquare: 3,
        time:Math.random()*10000
      };
      return state;
    case SET_HARD:
      state = {
        ...state,
        difficulty: "hard",
        squaresShown: 24,
        sidesPerSquare: 3,
        time:Math.random()*10000
      };
    default:
      return state;
  }
};
