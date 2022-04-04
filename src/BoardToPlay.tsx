import { useEffect, useState } from "react";
import BlockGenerator, { BlockObject } from "./BlockGenerator";
import { GameSize } from "./GameSet";
import "./styles/BoardToPlay.css";
import Win from "./Win";

interface BoardToPlayProps {
  numberOfBlocks: GameSize;
  play: boolean;
}

export type BoardSize = "s" | "m" | "l";

export type BlocksObjectsArray = { id: number; name: string }[];

const BoardToPlay = ({ numberOfBlocks, play }: BoardToPlayProps) => {
  const [boardSize, setBoardSize] = useState<BoardSize>("s");
  const [clickedBlock, setClickedBlock] = useState("");
  const [blockPair, setBlockPair] = useState<BlockObject[]>([]);
  const [uncovered, setUncovered] = useState<BlocksObjectsArray>([]);
  const [endGame, setEndGame] = useState(false);

  useEffect(() => {
    setEndGame(false);
    switch (true) {
      case numberOfBlocks === 16:
        setBoardSize("s");
        break;
      case numberOfBlocks === 24:
        setBoardSize("m");
        break;
      case numberOfBlocks === 48:
        setBoardSize("l");
        break;
    }
    setUncovered([]);
  }, [numberOfBlocks]);

  useEffect(() => {
    setEndGame(false);
    setBlockPair([]);
    setUncovered([]);
  },[play])

  useEffect(() => {
    if (uncovered.length * 2 === numberOfBlocks) {
      setEndGame(true);
    }
  }, [uncovered]);

  useEffect(() => {
    if (
      blockPair.length === 2 &&
      blockPair[0].name === blockPair[1].name &&
      blockPair[0].id !== blockPair[1].id
    ) {
      setUncovered((prevState) => prevState.concat(blockPair[0]));
      setBlockPair([]);
    } else if (blockPair.length == 2 && blockPair[0] !== blockPair[1])
      setBlockPair((prevState) => prevState.slice(1));
  }, [blockPair]);

  const handleBlockClick = (iconName: string, index: number) => {
    setClickedBlock(iconName + index);
    setBlockPair((prevState) =>
      prevState.concat({ id: index, name: iconName })
    );
  };

  return (
    <>
      <div className="game-board" id={boardSize}>
        <BlockGenerator
          numberOfBlocks={numberOfBlocks}
          uncovered={uncovered}
          boardSize={boardSize}
          handleBlockClick={(iconName, index) =>
            handleBlockClick(iconName, index)
          }
          clickedBlock={clickedBlock}
          play={play}
        />
      </div>
        {endGame ? <Win /> : null}
    </>
  );
};
export default BoardToPlay;
