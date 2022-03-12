import { FunctionComponent, useRef } from "react";
import { unitConverter } from '~/utils/BaseUtil';
import { useHover } from "ahooks";
import { PlayOne, Play, User } from '@icon-park/react';

interface ListCoverItemProps {
  menuItem: {
    id: number,
    coverImgUrl: string,
    name: string,
    playCount: number
  }
}

const ListCoverItem: FunctionComponent<ListCoverItemProps> = (props) => {
  const coverRef = useRef<HTMLImageElement>(null!);
  const isHovering = useHover(coverRef); // 是否悬浮图片

  return (
    <li className='flex flex-col justify-between h-50 w-44 relative  cursor-pointer'>
      <div ref={coverRef} className='relative'>
        <img style={{ filter: 'brightness(75%)' }}
          src={props.menuItem.coverImgUrl ? props.menuItem.coverImgUrl : props.menuItem.coverImgUrl}
          className='w-44 object-cover rounded-md'
          alt="" />
        {/* 显示播放按钮 */}
        <Play className={
          `absolute bottom-2 right-2 transition ease-in-out duration-300
        ${isHovering ? 'opacity-100' : 'opacity-0'}
        `
        }
          theme="outline" size="33" fill="#ffffff" />
        {/* 播放量 */}
        <div className='flex items-center absolute right-1 top-1'>
          <PlayOne theme="outline" size="18" fill="#ffffff" />
          <span className='text-xs'>{unitConverter(props.menuItem.playCount)}</span>
        </div>
      </div>
      {/* 歌单名称 */}
      <span style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', }} className='text-sm text-gray-300  h-11 py-1  hover:text-white'>
        {props.menuItem.name}
      </span>
    </li>
  );
}

export default ListCoverItem;