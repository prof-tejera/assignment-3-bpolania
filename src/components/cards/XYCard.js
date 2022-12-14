import  Card  from '../generic/Card'

const XY = ({hours, minutes, seconds, rounds, id, onClick}) => {

  return (
    <Card 
      type={"xy"}
      title={"XY Timer"}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
      rounds={rounds}
      onClick={onClick}
      id={id}
    />
  )
};

export default XY;
