import react, { useEffect, useState } from "react";
import { IconContext, IconType } from "react-icons";
import { gameIconPack, QuestionMark } from "./Iconpack";
import "./styles/BoardToPlay.css";

interface BoardToPlayProps {
  numberOfBlocks: number;
}

type BoardSize = "s" | "m" | "l";

type IconsArray = IconType[];

type BlocksObjectsArray = { id: number; name: string }[];

const shuffleArrayElements = (arr: IconsArray) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const prepareDeckOfBlocks = (arr: IconsArray, numberOfBlocks: number) => {
  const initialShuffle = shuffleArrayElements(arr);
  const countBlocks = initialShuffle.filter((element, index) => {
    if (index < numberOfBlocks / 2) return element;
  });
  const preparedDeck = countBlocks.concat(countBlocks);

  return shuffleArrayElements(preparedDeck);
};

const BoardToPlay = ({ numberOfBlocks }: BoardToPlayProps) => {
  const [boardSize, setBoardSize] = useState<BoardSize>("s");
  const [preparedDeck, setPreparedDeck] = useState<IconsArray>([QuestionMark]);
  const [clickedBlock, setClickedBlock] = useState("");
  const [blockPair, setBlockPair] = useState<BlocksObjectsArray>([]);
  const [uncovered, setUncovered] = useState<BlocksObjectsArray>([]);

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
    setPreparedDeck([QuestionMark]);
    setUncovered([]);
  }, [numberOfBlocks]);

  useEffect(() => {
    setPreparedDeck(prepareDeckOfBlocks(gameIconPack, numberOfBlocks));
  }, [boardSize]);
  useEffect(() => {
    if (uncovered.length * 2 == numberOfBlocks) {
      setBlockPair([]);
      setUncovered([]);
      setBoardSize("s");
    }
  }, [uncovered]);

  useEffect(() => {
    if (
      blockPair.length == 2 &&
      blockPair[0].name === blockPair[1].name &&
      blockPair[0].id !== blockPair[1].id
    ) {
      setUncovered((prevState) => prevState.concat(blockPair[0]));
      setBlockPair([]);
    } else if (blockPair.length == 2 && blockPair[0] !== blockPair[1])
      setBlockPair([]);
  }, [blockPair]);

  const handleBlockClick = (iconName: string, index: number) => {
    setClickedBlock(iconName + index);
    setBlockPair((prevState) =>
      prevState.concat({ id: index, name: iconName })
    );
  };

  const bloksGenerator = preparedDeck.map((icon, index) => {
    const Icon = icon;
    return (
      <div
        className="game-block"
        key={index}
        onClick={() => handleBlockClick(icon.name, index)}>
        <IconContext.Provider
          value={{ className: "game-block-icon", size: "8 vh" }}>
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

  return (
    <>
      <div className="game-board" id={boardSize}>
        {bloksGenerator}
      </div>
    </>
  );
};
export default BoardToPlay;
