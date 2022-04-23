import { useState } from 'react';
import { CommandInput } from '../components/CommandInput';
import { CommandOutput } from '../components/CommandOutput';
import { GridAndRobot } from '../components/GridAndRobot';

export default function Index() {
  const [commands, setCommands] = useState([]); // [{text, valid}]
  const [currentPosition, setCurrentPosition] = useState(); // {x, y, facing}
  const [currentRotation, setCurrentRotation] = useState(); // degrees of rotation

  return (
    <div className="flex flex-col container max-w-[512px]">
      <GridAndRobot currentPosition={currentPosition} currentRotation={currentRotation} />
      <CommandInput
        currentPosition={currentPosition}
        setCommands={setCommands}
        setCurrentPosition={setCurrentPosition}
        setCurrentRotation={setCurrentRotation}
      />
      <CommandOutput commands={commands} />
    </div>
  );
}
