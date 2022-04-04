import { useState } from "react";
import "./styles/App.css";
import BoardToPlay from "./BoardToPlay";
import GameSet, { GameSize } from "./GameSet";

function App() {
  const [pattern, setPattern] = useState<GameSize>(16);
  const [playButtonAction, setPlayButtonAction] = useState(false);

  return (
    <div className="App">
      <GameSet
        setPattern={(size) => setPattern(size)}
        play={() => setPlayButtonAction((prevState) => !prevState)}
      />
      <BoardToPlay numberOfBlocks={pattern} play={playButtonAction} />
    </div>
  );
}

export default App;
