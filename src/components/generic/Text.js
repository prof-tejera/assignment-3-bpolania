import React from "react";
import '../../css/style.css'; 

const Text = ({className, onChange, id}) => {
  return (
    <input type="text" id={id} className={className} onChange={onChange} placeholder={"00"}/>
  );
};

export default Text;
