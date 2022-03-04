import { Right } from "@icon-park/react";
import { FunctionComponent } from "react";

interface TitleBarProps {
  title: string
}

const TitleBar: FunctionComponent<TitleBarProps> = (props) => {
  return (
    <div className='mt-16 flex w-full items-center cursor-pointer'>
      <span className='text-xl font-bold'>{props.title}</span>
      <Right theme="outline" size="24" fill="#ffffff" />
    </div>
  );
}

export default TitleBar;