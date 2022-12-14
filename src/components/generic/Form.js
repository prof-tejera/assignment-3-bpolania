import React from "react";
import  Button  from '../generic/Button'
import  Text  from '../generic/Text'
import '../../css/style.css'; 

const Form = ({ title, onClick, onChange, id }) => {

  const inline = {
    display: 'inline-block'
  };

  const formStyle = {
    border: '1px solid gray',
    padding: '20px',
    margin: '10px',
    fontSize: '1.5rem',
    backgroundColor: '#0e37a1',
    color: '#fffcd6',
    width: '20vh',
  };

  const buttonStyle = {
    border: '1px solid gray',
    padding: '50px',
    margin: '10px',
    fontSize: '1.5rem',
    backgroundColor: '#000000',
    color: '#fffcd6',
    width: '60vh',
    display: 'inline-block'
  };

  let time;
  let workTime;
  let rounds;

  if (id !== "s") {
    time =
    <div>
      <div id="subTitle">{"Set Time"}</div>
      <Text style={inline} id={`${id}-hours`}className={"textInput"} onChange={onChange}/>
      <div style={inline}>:</div>
      <Text style={inline} id={`${id}-minutes`} className={"textInput"} onChange={onChange}/>
      <div style={inline}>:</div>
      <Text style={inline} id={`${id}-seconds`} className={"textInput"} onChange={onChange}/>
    </div>
  }
  if (id === "xy" || id === "t") {
    rounds = 
    <div>
      <div id="subTitle">{"Set Number of Rounds"}</div>
      <Text style={inline} id={`${id}-rounds`}className={"textInput"} onChange={onChange}/>
    </div>
  }

  if (id==="t") {
    workTime = 
    <div>
      <div id="subTitle">{"Set Rest Time"}</div>
      <Text style={inline} id={`${id}-rest-hours`}className={"textInput"} onChange={onChange}/>
        <div style={inline}>:</div>
        <Text style={inline} id={`${id}-rest-minutes`} className={"textInput"} onChange={onChange}/>
        <div style={inline}>:</div>
        <Text style={inline} id={`${id}-rest-seconds`} className={"textInput"} onChange={onChange}/>
    </div>
  }

  return (
    <div style={formStyle}>
      <div>{title}</div>
      {time}
      {workTime}
      {rounds}
      <Button title={"Add"} onClick={onClick} style={buttonStyle} className={"form"} id={"form-button"}>Add</Button>
    </div>
  );
};

export default Form;
