import  Card  from '../generic/Card'

const CountdownCard = ({hours, minutes, seconds, id, onClick}) => {

  return (
    <Card
      type={"c"}
      title={"Countdown Timer"}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
      onClick={onClick}
      id={id}
    />
    )
};

export default CountdownCard;
