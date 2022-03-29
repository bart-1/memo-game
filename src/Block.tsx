import react, { ReactNode } from "react";
import { icons, IconType, IconBaseProps, IconBase } from "react-icons";
import "./styles/Block.css";

interface BlockProps {
  size: string;
  icon: IconType;
}

const Block = ({ size, icon }: BlockProps) => {
  
  return (
    <>
      <div style={{ width: size, height: size, backgroundColor: "red" }}>
        
      </div>
    </>
  );
};
export default Block;

