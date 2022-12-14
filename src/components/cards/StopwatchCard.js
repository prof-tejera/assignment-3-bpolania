import  Card  from '../generic/Card'

const StopwatchCard = ({id, onClick}) => {

  return (
    <Card 
      type={"s"}
      title={"Stopwtach Timer"}
      onClick={onClick}
      id={id}
    />
    )
};

export default StopwatchCard;
