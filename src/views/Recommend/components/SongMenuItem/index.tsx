import { FunctionComponent, useRef } from "react";
import testImg from '~/assets/images/test.jpg';
import { PlayOne, Play } from '@icon-park/react';
import { unitConverter } from '~/utils/BaseUtil';
import { SongMenuType } from '~/types/index';
import { useHover } from "ahooks";

interface SongMenuProps {
  menuItem: SongMenuType
}

const SongMenu: FunctionComponent<SongMenuProps> = (props) => {
  const coverRef = useRef<HTMLImageElement>(null!);
  const isHovering = useHover(coverRef); // 是否悬浮图片
  return (
    <li className='flex flex-col justify-between w-50 h-50 relative cursor-pointer'>
      <div ref={coverRef}>
        <img src={props.menuItem.picUrl} className='h-50 object-cover rounded-md' alt="" />
        {/* 显示播放按钮 */}
        <Play className={
          `absolute right-2 bottom-14 transition ease-in-out duration-300
        ${isHovering ? 'opacity-100' : 'opacity-0'}
        `
        }
          theme="outline" size="26" fill="#ffffff" />
      </div>
      {/* 歌单名称 */}
      <span className=' text-sm overflow-ellipsis text-gray-300 overflow-hidden h-12 py-1 break-all hover:text-white'>
        {props.menuItem.name}
      </span>
      {/* 播放量 */}
      <div className='flex items-center absolute right-1 top-1'>
        <PlayOne theme="outline" size="18" fill="#ffffff" />
        <span className='text-xs'>{unitConverter(props.menuItem.playCount)}</span>
      </div>

    </li>
  );
}

export default SongMenu;