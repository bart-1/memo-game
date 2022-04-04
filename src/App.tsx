import react, { useState } from "react";
import "./styles/App.css";
import BoardToPlay from "./BoardToPlay";
import GameSet, { GameSize } from "./GameSet";
import ScoreBoard from "./ScoreBoard";



function App() {
  const [pattern, setPattern] = useState<GameSize>(16);

  return (
    <div className="App">
      <GameSet
        setPattern={(size) => setPattern(size)}
      />
      {/* <ScoreBoard /> */}
      <BoardToPlay numberOfBlocks={pattern}/>
    </div>
  );
}

export default App;
