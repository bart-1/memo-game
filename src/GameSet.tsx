import { useEffect, useState } from "react";
export type GameSize = 16 | 24 | 48;

interface GameSetProps {
  setPattern: (size: GameSize) => void;
  play: CallableFunction;
}

const GameSet = ({ setPattern, play }: GameSetProps) => {
  const [gameSize, setGameSize] = useState<GameSize>(16);

  useEffect(() => {
    setPattern(gameSize);
  }, [gameSize]);

  return (
    <>
      <div className="game-set-board">
        <div>Game size is {gameSize}</div>
        <label>16</label>
        <input
          type="radio"
          name="16"
          onChange={() => setGameSize(16)}
          checked={gameSize === 16}
        />
        <label>24</label>
        <input
          type="radio"
          name="24"
          onChange={() => setGameSize(24)}
          checked={gameSize === 24}
        />
        <label>48</label>
        <input
          type="radio"
          name="48"
          onChange={() => setGameSize(48)}
          checked={gameSize === 48}
        />
        <button onClick={() => play()}>Play!</button>
      </div>
    </>
  );
};
export default GameSet;
