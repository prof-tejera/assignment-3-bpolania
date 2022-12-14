import React from "react";

const Display = ({ timer, del, visibility='block' }) => {
  return (
    <div className="container">
            <div>
              <span className="digit" id="hr">
                {timer.split(":")[0]}</span>
              <span className="txt">Hr</span>
              <span className="digit" id="min">
                {timer.split(":")[1]}</span>
              <span className="txt">Min</span>
              <span className="digit" id="sec">
                {timer.split(":")[2]}</span>
              <span className="txt">Sec</span>
            </div>
            <div className="buttons" style={{display: visibility}}>
              { del }
            </div>
        </div>
  );
};

export default Display;
