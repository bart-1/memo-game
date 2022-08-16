import { useEffect, useState } from "react";
import { IconType, IconContext } from "react-icons";
import { GameSize } from "./GameSet";
import { gameIconPack, QuestionMark } from "./Iconpack";

export type BlockObject = { id: number; name: string };

interface BlockGeneratorProps {
  numberOfBlocks: GameSize;
  uncovered: BlockObject[];
  handleBlockClick: (iconName: string, index: number) => void;
  boardSize: string;
  clickedBlock: string;
  play: boolean;
}

const shuffleArrayElements = (arr: IconType[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const prepareDeckOfBlocks = (arr: IconType[], numberOfBlocks: GameSize) => {
  const initialShuffle = shuffleArrayElements(arr);
  const countBlocks = initialShuffle.filter((element, index) => {
    if (index < numberOfBlocks / 2) return element;
  });
  const preparedDeck = countBlocks.concat(countBlocks);

  return shuffleArrayElements(preparedDeck);
};

const BlockGenerator = ({
  numberOfBlocks,
  uncovered,
  clickedBlock,
  boardSize,
  handleBlockClick,
  play,
}: BlockGeneratorProps) => {
  const [preparedDeck, setPreparedDeck] = useState<IconType[]>([QuestionMark]);

  useEffect(() => {
    setPreparedDeck(prepareDeckOfBlocks(gameIconPack, numberOfBlocks));
  }, [boardSize, play]);

  const bloksGenerator = preparedDeck.map((icon, index) => {
    const Icon = icon;
    return (
      <div
        className="game-block"
        key={index}
        onClick={() => handleBlockClick(icon.name, index)}>
        <IconContext.Provider
          value={{ className: "game-block-icon"}}>
          {clickedBlock === icon.name + index ||
          uncovered.find((element) => element.name === icon.name) ? (
            <Icon />
          ) : (
            <QuestionMark />
          )}
        </IconContext.Provider>
      </div>
    );
  });

  return <>{bloksGenerator}</>;
};

export default BlockGenerator;
