import React from "react";
import { useSelector } from "react-redux";
import NumPadButton from "./NumPadButton";

function NumPad(props) {
  const boardState = useSelector((state) => state.board);

  return (
    <div
      style={{
        display: "grid",
        width: "70%",
        margin: "5% 15% 5% 15%",
        gridTemplateColumns: `repeat(${boardState.sidesPerSquare}, 1fr)`,
      }}
    >
      <NumPadButton spaceClickHandler={props.spaceClickHandler} num={1} />
      <NumPadButton spaceClickHandler={props.spaceClickHandler} num={2} />
      <NumPadButton spaceClickHandler={props.spaceClickHandler} num={3} />
      <NumPadButton spaceClickHandler={props.spaceClickHandler} num={4} />
      <NumPadButton spaceClickHandler={props.spaceClickHandler} num={5} />
      <NumPadButton spaceClickHandler={props.spaceClickHandler} num={6} />
      <NumPadButton spaceClickHandler={props.spaceClickHandler} num={7} />
      <NumPadButton spaceClickHandler={props.spaceClickHandler} num={8} />
      <NumPadButton spaceClickHandler={props.spaceClickHandler} num={9} />
    </div>
  );
}

export default NumPad;
