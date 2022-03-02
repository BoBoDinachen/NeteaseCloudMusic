import { FunctionComponent } from "react";
import { PlayOne} from '@icon-park/react';

interface NewSongItemProps {
  songItem: NewSongType
}

interface NewSongType {
  id: number,
  name: string, // 歌曲名字
  alias: string, // 歌曲别名
  picUrl: string, // 歌曲图片
  singer: string // 歌手
}

const NewSongItem: FunctionComponent<NewSongItemProps> = (props) => {
  return (
    <li className='flex rounded-sm justify-start items-center cursor-pointer hover:bg-gray-500 transition duration-150'>
      {/* 歌曲封面 */}
      <div className='relative'>
        <img className='w-14 rounded-sm' src={props.songItem.picUrl} alt="" />
        <button className='btn btn-circle btn-xs m-auto absolute top-0 left-0 bottom-0 right-0'>
          <PlayOne theme="filled" size="14" fill="#ffffff"/>
        </button>
      </div>
      {/* 右边部分 */}
      <div className='flex flex-col justify-between ml-3 h-full py-1'>
        <div className='text-sm'>
          <span>{props.songItem.name}</span>
          <span className='truncate'>{props.songItem.alias?`(${props.songItem.alias})`:''}</span>
        </div>
        <span className='text-sm text-gray-400'>{props.songItem.singer}</span>
      </div>
    </li>
  );
}
 
export default NewSongItem;