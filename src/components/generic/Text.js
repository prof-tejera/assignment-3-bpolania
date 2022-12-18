import React from "react";
import '../../css/style.css'; 

const Text = ({className, onChange, id, placeholder="00"}) => {
  return (
    <input type="text" id={id} className={className} onChange={onChange} placeholder={placeholder}/>
  );
};

export default Text;
