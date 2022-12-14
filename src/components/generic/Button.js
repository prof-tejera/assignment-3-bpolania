import React from "react";

const Button = ({ type = 'button', onClick, className, id, title, disabled, index }) => {
  return (
    <button value={index} type={type} onClick={onClick} className={className} disabled={disabled} id={id}>
      {title}
    </button>
  );
};

export default Button;
