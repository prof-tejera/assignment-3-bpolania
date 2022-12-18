import  Card  from '../generic/Card'

const StopwatchCard = ({id, onClick, comment}) => {
  return (
    <Card 
      type={"s"}
      title={"Stopwtach Timer"}
      onClick={onClick}
      id={id}
      comment={comment}
    />
    )
};

export default StopwatchCard;
