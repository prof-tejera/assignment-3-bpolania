import  Card  from '../generic/Card'

const XY = ({hours, minutes, seconds, rounds, id, onClick, comment}) => {

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
      comment={comment}
    />
  )
};

export default XY;
