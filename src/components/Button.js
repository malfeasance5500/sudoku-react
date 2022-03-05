import { React } from "react";

function Button(props) {
  const classString = props.className ? props.className : "";
  return (
    <button
      className={"button" + classString}
      onClick={() => props.clickHandler()}
    >
      {props.label}
    </button>
  );
}

export default Button;
