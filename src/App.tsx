import react, { useState } from "react";
import "./styles/App.css";
import BoardToPlay from "./BoardToPlay";
import GameSet, { GameSize } from "./GameSet";
import ScoreBoard from "./ScoreBoard";

function App() {
  const [pattern, setPattern] = useState<GameSize>(16);
  const [gameOn, setGameOn] = useState(false);

  return (
    <div className="App">
     
        
      <GameSet
        setPattern={(size) => setPattern(size)}
        setGameOn={() => setGameOn(true)}
        setGameOff={() => setGameOn(false)}
      />
      <ScoreBoard />
      <BoardToPlay numberOfBlocks={pattern}/>
    </div>
  );
}

export default App;
