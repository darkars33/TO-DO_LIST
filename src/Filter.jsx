import React from "react";

const Filter = (props) => {
  return (
    <button className="p-2 px-3 border-[2px] border-black w-[25%]"
      aria-pressed={props.isPressed}
      onClick={() => {
        console.log(props.name)
        props.setFilter(props.name)}}
    >
      {props.name}
    </button>
  );
};
export default Filter;
