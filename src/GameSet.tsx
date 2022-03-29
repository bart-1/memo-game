import react, { useEffect, useState, FormEvent } from "react";

export type GameSize = 16 | 24 | 48;
interface GameSetProps {
  setPattern: (size: GameSize) => void;
  setGameOn: CallableFunction;
}

const GameSet = ({ setPattern, setGameOn }: GameSetProps) => {
  const [gameSize, setGameSize] = useState<GameSize>(16);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGameOn(true);
  };

  useEffect(() => {
    setGameOn(false)
    setPattern(gameSize);
  }, [gameSize]);

  return (
    <>
      <div className="game-set-board">
        <div>Game size is {gameSize}</div>
        <form onSubmit={(e) => submitHandler(e)}>
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
          <button type="submit">Play!</button>
        </form>
      </div>
    </>
  );
};
export default GameSet;
