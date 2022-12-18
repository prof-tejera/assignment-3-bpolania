import  Card  from '../generic/Card'

const TabataCard = ({hours, minutes, seconds, restHours, restMinutes, restSeconds, rounds, onClick, id, comment}) => {

  return (
    <Card 
      type={"t"}
      title={"Tabata Timer"}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
      restHours={restHours}
      restMinutes={restMinutes}
      restSeconds={restSeconds}
      rounds={rounds}
      onClick={onClick}
      id={id}
      comment={comment}
    />
    )
};

export default TabataCard;
