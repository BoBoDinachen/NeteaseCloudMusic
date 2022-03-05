import { Right } from "@icon-park/react";
import { useClickAway } from "ahooks";
import { FunctionComponent, useRef, useState } from "react";
import TagListBox from "../TagListBox";

interface TabBarProps {
  hotSongCatlist: { id: number, name: string }[];
  tagName: string,
  setActiveTag: (name: string) => void
}

const TabBar: FunctionComponent<TabBarProps> = (props) => {
  const [showTagListBox, setShowTagListBox] = useState<boolean>(false); // 是否显示标签列表盒子
  const boxRef = useRef<HTMLDivElement>(null!);
  const btnRef = useRef<HTMLButtonElement>(null!);
  /**
   * 监听目标元素之外的点击事件
   */
  useClickAway(() => {
    setShowTagListBox(false);
  }, [btnRef, boxRef])

  return (
    <div className='relative flex justify-between items-center my-3'>
      {/* 歌单分类按钮 */}
      <button ref={btnRef} className='btn w-26 bordered btn-sm' onClick={() => { setShowTagListBox(true) }}>
        <span className='text-gray-100 w-max overflow-hidden'>{props.tagName}</span>
        <Right theme="filled" size="20" fill="#ffffff" />
      </button>
      {/* 热门标签列表 */}
      <ul className='flex space-x-5 text-sm cursor-pointer'>
        {
          props.hotSongCatlist.map((item, index) => {
            return (<li className={
              `text-gray-400 hover:text-yellow-500 ${item.name === props.tagName ? 'text-yellow-500' : ''}
                `} key={item.id} onClick={() => { props.setActiveTag(item.name) }}>{item.name}</li>
            )
          })
        }
      </ul>
      {/* 标签列表盒子 */}
      <TagListBox boxRef={boxRef} setShowTagListBox={setShowTagListBox} show={showTagListBox} activeTag={props.tagName} setActiveTag={props.setActiveTag} />
    </div>
  );
}

export default TabBar;