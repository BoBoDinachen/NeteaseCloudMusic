import { FunctionComponent, useRef, memo } from "react";
import testImg from '~/assets/images/test.jpg';
import { PlayOne, Play, User } from '@icon-park/react';
import { unitConverter } from '~/utils/BaseUtil';
import { SongMenuType } from '~/types/index';
import { useHover } from "ahooks";
import { useNavigate } from 'react-router-dom';

interface SongMenuProps {
  menuItem: SongMenuType
}

const SongMenu: FunctionComponent<SongMenuProps> = (props) => {
  const coverRef = useRef<HTMLImageElement>(null!);
  const isHovering = useHover(coverRef); // 是否悬浮图片
  const navigate = useNavigate(); // 使用导航

  /**
   * 点击每个歌单
   */
  const handleClickMenuItem = (songMenuId: number) => {
    navigate(`/songMenuDetails/${songMenuId}/musicList`);
  }

  return (
    <li
      className='flex flex-col justify-between w-50 h-50 relative cursor-pointer'
      onClick={() => { handleClickMenuItem(props.menuItem.id) }}
    >
      <div ref={coverRef} className='relative'>
        <img style={{ filter: 'brightness(75%)' }}
          src={props.menuItem.picUrl ? props.menuItem.picUrl : props.menuItem.coverImgUrl}
          className='h-50 object-cover rounded-md'
          onError={(e: any) => { e.target.onerror = null; e.target.src = testImg }}
          alt="" />
        {/* 显示播放按钮 */}
        <Play className={
          `absolute right-2 bottom-2 transition ease-in-out duration-300
        ${isHovering ? 'opacity-100' : 'opacity-0'}
        `
        }
          theme="outline" size="33" fill="#ffffff" />
        {/* 创建者 */}
        <div style={{ display: props.menuItem.creator ? 'flex' : 'none' }} className='absolute flex justify-start items-center bottom-2 left-2'>
          <User theme="outline" size="15" fill="#ffffff" />
          <span className='text-xs ml-1'>{props.menuItem.creator?.nickname}</span>
        </div>
      </div>
      {/* 歌单名称 */}
      <span style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', }} className='text-sm text-gray-300  h-11 py-1  hover:text-white'>
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
function areEqual(prevProps: any, nextProps: any) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
  if (prevProps === nextProps) {
    return true;
  } else {
    return false;
  }
}
export default memo(SongMenu, areEqual);