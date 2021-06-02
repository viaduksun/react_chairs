import React from "react";

const Button = ({ addClass, onClick, text }) => {
  return (
    <button className={`btn ${addClass}`} onClick={onClick}>
      {text}
    </button>
  );
};
export default Button;
