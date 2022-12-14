import React from "react";
import styled from "styled-components";

import DocumentComponent from "../components/documentation/DocumentComponent";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2rem;background-color: #000000;
`;

/**
 * You can document your components by using the DocumentComponent component
 */
const Documentation = () => {
  return (
    <Container>
      <div>
        <Title>Documentation</Title>
        <DocumentComponent
          title="Button"
          propDocs={[
            {
              prop: "type",
              description: "Sets the input type",
              type: "string",
              defaultValue: "button",
            },
            {
              prop: "onClick",
              description: "Indicates wichh function shall be called when user clicks the button",
              type: "string",
              defaultValue: "None",
            },
            {
              prop: "classame",
              description: "Sets a class name for the button",
              type: "string",
              defaultValue: "None",
            },
            {
              prop: "id",
              description: "Sets an id for the button",
              type: "string",
              defaultValue: "None",
            },
            {
              prop: "title",
              description: "Sets the text on the button",
              type: "string",
              defaultValue: "None",
            },
          ]}
        />
        <DocumentComponent
          title="Display"
          propDocs={[
            {
              prop: "type",
              description: "Sets the input type",
              type: "string",
              defaultValue: "button",
            },
            {
              prop: "restart",
              description: "Indicates which restart function shall be called when user clicks the restart button",
              type: "string",
              defaultValue: "None",
            },
            {
              prop: "pause",
              description: "Indicates which pause function shall be called when user clicks the pause button",
              type: "string",
              defaultValue: "None",
            },
            {
              prop: "ff",
              description: "Indicates which pause function shall be called when user clicks the ff button",
              type: "string",
              defaultValue: "None",
            },
            {
              prop: "classame",
              description: "Sets a class name for the button",
              type: "string",
              defaultValue: "None",
            },
            {
              prop: "id",
              description: "Sets an id for the button",
              type: "string",
              defaultValue: "None",
            },
            {
              prop: "title",
              description: "Sets the text on the button",
              type: "string",
              defaultValue: "None",
            },
          ]}
        />
        <DocumentComponent
          title="Card"
          propDocs={[
            {
              prop: "type",
              description: "Sets the type of timer represented in the card (s, c, xy, t)",
              type: "string",
              defaultValue: "None",
            },
            {
              prop: "title",
              description: "Sets the title for this timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "hours",
              description: "Sets the the number of hours for the work timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "minutes",
              description: "Sets the the number of minutes for the work timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "seconds",
              description: "Sets the the number of seconds for the work timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "restHours",
              description: "Sets the the number of hours for the rest timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "restMinutes",
              description: "Sets the the number of minutes for the rest timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "restSeconds",
              description: "Sets the the number of seconds for the rest timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "rounds",
              description: "the numbers of rounds this timer will run",
              type: "string",
              defaultValue: "1",
            },
            {
              prop: "id",
              description: "an id for the timer so it can de targeted later",
              type: "string",
              defaultValue: "None",
            },
            {
              prop: "onClick",
              description: "the function for deleting the card",
              type: "function",
              defaultValue: "None",
            }
          ]}
        />
        <DocumentComponent
          title="Form"
          propDocs={[
            {
              prop: "type",
              description: "Sets the type of timer represented in the card (s, c, xy, t)",
              type: "string",
              defaultValue: "None",
            },
            {
              prop: "title",
              description: "Sets the title for this timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "id",
              description: "an id for the timer so it can de targeted later",
              type: "string",
              defaultValue: "None",
            },
            {
              prop: "onChange",
              description: "the function that catches changes in the text field",
              type: "function",
              defaultValue: "None",
            }
          ]}
        />
        <DocumentComponent
          title="Text"
          propDocs={[
            {
              prop: "className",
              description: "the class of input text field",
              type: "string",
              defaultValue: "None",
            },
            {
              prop: "id",
              description: "an id for the timer so it can de targeted later",
              type: "string",
              defaultValue: "None",
            },
            {
              prop: "onChange",
              description: "the function that catches changes in the text field",
              type: "function",
              defaultValue: "None",
            }
          ]}
        />
        <DocumentComponent
          title="CountdownCard"
          propDocs={[
            {
              prop: "hours",
              description: "Sets the the number of hours for the timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "minutes",
              description: "Sets the the number of minutes for the timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "seconds",
              description: "Sets the the number of seconds for the timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "id",
              description: "an id for the timer so it can de targeted later",
              type: "string",
              defaultValue: "None",
            },
            {
              prop: "onClick",
              description: "the function for deleting the card",
              type: "function",
              defaultValue: "None",
            }
          ]}
        />
        <DocumentComponent
          title="StopwatchCard"
          propDocs={[
            {
              prop: "id",
              description: "an id for the timer so it can de targeted later",
              type: "string",
              defaultValue: "None",
            },
            {
              prop: "onClick",
              description: "the function for deleting the card",
              type: "function",
              defaultValue: "None",
            }
          ]}
        />
        <DocumentComponent
          title="XYCard"
          propDocs={[
            {
              prop: "hours",
              description: "Sets the the number of hours for the timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "minutes",
              description: "Sets the the number of minutes for the timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "seconds",
              description: "Sets the the number of seconds for the timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "rounds",
              description: "the numbers of rounds this timer will run",
              type: "string",
              defaultValue: "1",
            },
            {
              prop: "id",
              description: "an id for the timer so it can de targeted later",
              type: "string",
              defaultValue: "None",
            },
            {
              prop: "onClick",
              description: "the function for deleting the card",
              type: "function",
              defaultValue: "None",
            }
          ]}
        />
        <DocumentComponent
          title="TabataCard"
          propDocs={[
            {
              prop: "hours",
              description: "Sets the the number of hours for the work timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "minutes",
              description: "Sets the the number of minutes for the work timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "seconds",
              description: "Sets the the number of seconds for the work timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "restHours",
              description: "Sets the the number of hours for the rest timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "restMinutes",
              description: "Sets the the number of minutes for the rest timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "restSeconds",
              description: "Sets the the number of seconds for the rest timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "rounds",
              description: "the numbers of rounds this timer will run",
              type: "string",
              defaultValue: "1",
            },
            {
              prop: "id",
              description: "an id for the timer so it can de targeted later",
              type: "string",
              defaultValue: "None",
            },
            {
              prop: "onClick",
              description: "the function for deleting the card",
              type: "function",
              defaultValue: "None",
            }
          ]}
        />
        <DocumentComponent
          title="Stopwatch"
          propDocs={[
            {
              prop: "id",
              description: "an id for the timer so it can de targeted later",
              type: "string",
              defaultValue: "None",
            }
          ]}
        />
        <DocumentComponent
          title="Countdown"
          propDocs={[
            {
              prop: "hours",
              description: "Sets the the number of hours for the timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "minutes",
              description: "Sets the the number of minutes for the timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "seconds",
              description: "Sets the the number of seconds for the timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "id",
              description: "an id for the timer so it can de targeted later",
              type: "string",
              defaultValue: "None",
            },
          ]}
        />
        <DocumentComponent
          title="XY"
          propDocs={[
            {
              prop: "hours",
              description: "Sets the the number of hours for the timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "minutes",
              description: "Sets the the number of minutes for the timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "seconds",
              description: "Sets the the number of seconds for the timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "rounds",
              description: "the numbers of rounds this timer will run",
              type: "string",
              defaultValue: "1",
            },
            {
              prop: "id",
              description: "an id for the timer so it can de targeted later",
              type: "string",
              defaultValue: "None",
            },
          ]}
        />
        <DocumentComponent
          title="Tabata"
          propDocs={[
            {
              prop: "work",
              description: "Sets the the number of of milisencons for the work timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "rest",
              description: "Sets the the number of of milisencons for the rest timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "seconds",
              description: "Sets the the number of seconds for the timer",
              type: "string",
              defaultValue: "0",
            },
            {
              prop: "rounds",
              description: "the numbers of rounds this timer will run",
              type: "string",
              defaultValue: "1",
            },
            {
              prop: "id",
              description: "an id for the timer so it can de targeted later",
              type: "string",
              defaultValue: "None",
            },
          ]}
        />
        
      </div>
    </Container>
  );
};

export default Documentation;
