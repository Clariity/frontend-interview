import { useState } from 'react';
import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';

export function CommandInput({ currentPosition, setCommands, setCurrentPosition, setCurrentRotation }) {
  const [input, setInput] = useState('');

  const validCommands = { 'move()': move, 'left()': left, 'right()': right, 'report()': report };
  const validDirections = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

  function handleCommandEntered() {
    // remove whitespace
    let sanitisedInput = input.replace(/\s/g, '');

    // attempt move, left, right, report commands
    const command = validCommands[sanitisedInput]?.();

    // attempt place command
    if (!command) {
      const place = sanitisedInput.match(/^place\((\d),(\d),'?(\w+)'?\)$/);
      const isInvalidPlacement =
        !place ||
        Number(place[1]) > 4 ||
        Number(place[2]) > 4 ||
        Number(place[1]) < 0 ||
        Number(place[2]) < 0 ||
        !validDirections.includes(place[3]);

      // valid place command
      if (!isInvalidPlacement) {
        setCurrentPosition({ x: Number(place[1]), y: Number(place[2]), facing: validDirections.indexOf(place[3]) });
        setCurrentRotation(validDirections.indexOf(place[3]) * 90);
      }

      setCommands((oldCommands) => [{ text: sanitisedInput, valid: !isInvalidPlacement }, ...oldCommands]);
      setInput('');
      return;
    }

    // report command issued
    if (typeof command === 'string') sanitisedInput = `${sanitisedInput} => ${command}`;

    setCommands((oldCommands) => [{ text: sanitisedInput, valid: currentPosition && command }, ...oldCommands]);
    setInput('');
  }

  function move() {
    // no place() executed so cannot move
    if (!currentPosition) return false;
    const { x, y, facing } = currentPosition;

    // NORTH and EAST are positive movements, SOUTH and WEST are negative movements
    const valueChange = facing >= 2 ? -1 : 1;

    // make move
    const newX = facing === 1 || facing === 3 ? x + valueChange : x;
    const newY = facing === 0 || facing === 2 ? y + valueChange : y;

    // cannot move move in that direction
    if (newX > 4 || newY > 4 || newX < 0 || newY < 0) return false;

    setCurrentPosition({ x: newX, y: newY, facing: facing });
    return true;
  }

  // decrease facing index and wrap around if below 0
  function left() {
    // no place() executed so cannot rotate
    if (!currentPosition) return false;

    const currentIndex = currentPosition.facing;
    setCurrentPosition((old) => ({ x: old.x, y: old.y, facing: currentIndex - 1 < 0 ? 3 : currentIndex - 1 }));
    setCurrentRotation((old) => old - 90);
    return true;
  }

  // increase facing index and wrap around if above 0
  function right() {
    // no place() executed so cannot rotate
    if (!currentPosition) return false;

    const currentIndex = currentPosition.facing;
    setCurrentPosition((old) => ({ x: old.x, y: old.y, facing: currentIndex + 1 > 3 ? 0 : currentIndex + 1 }));
    setCurrentRotation((old) => old + 90);
    return true;
  }

  // return current position and direction
  function report() {
    return currentPosition
      ? `${currentPosition.x}, ${currentPosition.y}, ${validDirections[currentPosition.facing]}`
      : 'No current position';
  }

  return (
    <div className="flex flex-wrap">
      <div className="flex w-full mb-4 sm:w-5/6 sm:pr-4">
        <TextInput onChange={(e) => setInput(e.target.value)} placeholder="Enter Command" value={input} />
      </div>
      <div className="flex w-full mb-4 sm:w-1/6">
        <Button disabled={!input} onClick={handleCommandEntered}>
          Enter
        </Button>
      </div>
    </div>
  );
}
