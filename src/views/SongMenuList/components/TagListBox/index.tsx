import { useClickAway } from "ahooks";
import { FunctionComponent, useRef } from "react";

interface TagListBoxProps {
  show: boolean, // 控制显示
  activeTag: string // 当前活动的标签
  setActiveTag: (name: string) => void
  boxRef: any,
  setShowTagListBox: (value: boolean) => void
}

const TagListBox: FunctionComponent<TagListBoxProps> = (props) => {
  
  
  return (
    <div ref={props.boxRef} style={{ display: props.show ? 'flex' : 'none' }} className='w-4/6 h-80 bg-gray-800 rounded-sm absolute top-10 z-50'>
      标签列表盒子
    </div>
  );
}

export default TagListBox;