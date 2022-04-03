import react, { useEffect, useState, FormEvent, useCallback } from "react";

export type GameSize = 16 | 24 | 48;

interface GameSetProps {
  setPattern: (size: GameSize) => void;
}

const GameSet = ({ setPattern }: GameSetProps) => {
  const [gameSize, setGameSize] = useState<GameSize>(16);
  const [resetGame, setResetGame] = useState(false);

  useEffect(() => {
    setPattern(gameSize);
  }, [gameSize, resetGame]);

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
        <button onClick={()=>setResetGame(prevState=> !prevState)}>Play!</button>
      </div>
    </>
  );
};
export default GameSet;
