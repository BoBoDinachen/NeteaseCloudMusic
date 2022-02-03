import { FunctionComponent } from "react";

interface ShadeBoxProps {
  handleClick: () => void
}

const ShadeBox: FunctionComponent<ShadeBoxProps> = (props) => {
  return (
    <div onClick={props.handleClick} className='z-50 w-screen h-screen fixed top-0 left-0 bg-gray-600 opacity-60'>

    </div>
  );
}

export default ShadeBox;