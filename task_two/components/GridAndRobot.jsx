import { useEffect, useRef, useState } from 'react';

export function GridAndRobot({ currentPosition, currentRotation }) {
  const gridRef = useRef();
  const [grid, setGrid] = useState(gridRef.current?.getBoundingClientRect());

  useEffect(() => {
    function handleResize() {
      setGrid(gridRef.current?.getBoundingClientRect());
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const squares = Array.from(Array(25));
  const squareWidth = grid?.width / 5;
  const leftCoords = currentPosition?.x * squareWidth + squareWidth / 4;
  const bottomCoords = currentPosition?.y * squareWidth + squareWidth / 4;

  return (
    <div className="flex flex-wrap-reverse mb-4 relative aspect-square shadow-md" ref={gridRef}>
      {squares.map((_, i) => (
        <div className="w-1/5 " key={i}>
          <div
            className={`${(i % 5) % 2 === Math.floor(i / 5) % 2 ? 'bg-white' : 'bg-lightgrey'} h-full rounded-sm`}
            key={i}
          />
        </div>
      ))}
      {currentPosition && (
        <img
          src="/media/robot.png"
          className="absolute transition-all duration-200"
          style={{
            bottom: bottomCoords,
            left: leftCoords,
            transform: `rotate(${currentRotation}deg)`,
            width: `${squareWidth / 2}px`,
            height: `${squareWidth / 2}px`
          }}
        />
      )}
    </div>
  );
}
