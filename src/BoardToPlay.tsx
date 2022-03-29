import react, { useEffect, useState } from "react";
import { IconContext, IconType } from "react-icons";
import Block from "./Block";
import { gameIconPack } from "./Iconpack";
import "./styles/BoardToPlay.css";

interface BoardToPlayProps {
  numberOfBlocks: number;
}

type BoardSize = "s" | "m" | "l";

const shuffleArrayElements = (arr: Array<IconType>) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const prepareDeckOfBlocks = (arr: Array<IconType>, numberOfBlocks: number) => {
  const initialShuffle = shuffleArrayElements(arr);
  const countBlocks = initialShuffle.filter((element, index) => {
    if (index < numberOfBlocks / 2) return element;
  });
  const preparedDeck = countBlocks.concat(countBlocks);

  return shuffleArrayElements(preparedDeck);
};

const BoardToPlay = ({ numberOfBlocks }: BoardToPlayProps) => {
  const [boardSize, setBoardSize] = useState<BoardSize>("s");

  useEffect(() => {
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
  }, [numberOfBlocks]);

  const preparedDeck = prepareDeckOfBlocks(gameIconPack, numberOfBlocks);
  const bloksGenerator = preparedDeck.map((icon, index) => {
    const Icon = icon;
    return (
      <div className="game-block" key={index}>
        <IconContext.Provider
          value={{ className: "game-block-icon", size: "8vw" }}>
          <Icon />
        </IconContext.Provider>
      </div>
    );
  });

  return (
    <>
      <div className="game-board" id={boardSize}>
        {bloksGenerator}
      </div>
    </>
  );
};
export default BoardToPlay;
