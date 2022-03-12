import { FunctionComponent } from "react";
import { PlayOne } from '@icon-park/react';
import { formatDuring } from '~/utils/BaseUtil';

interface NewSongType {
  index: number
  serial: string
  id: number
  name: string
  picUrl: string
  singer: string
  alias: string
  playTime: number
  album: {
    name: string
  }
}

interface NewSongItemProps {
  newSongItem: NewSongType
}

const NewSongItem: FunctionComponent<NewSongItemProps> = (props) => {
  return (
    <li
      className="flex rounded-sm text-sm justify-start items-center px-3 py-3 hover:bg-gray-500 transition-all duration-150"
      style={{
        backgroundColor: `${props.newSongItem.index % 2 === 0 ? '' : '#363b40'}`
      }}
    >
      {/* 序号 */}
      <span>{props.newSongItem.serial}</span>
      {/* 封面 */}
      <div className="relative flex justify-center items-center mx-5">
        <img src={props.newSongItem.picUrl} className='w-16 rounded-sm' alt="" />
        <a className="absolute flex justify-center items-center p-1 cursor-pointer" style={{ backgroundColor: '#ebeeec', borderRadius: '50%' }}>
          <PlayOne theme="filled" size="20" fill="#10b981" strokeWidth={2} />
        </a>
      </div>
      {/* 名字 */}
      <div className="flex items-center w-96">
        <span>{props.newSongItem.name}</span>
        <span className="text-gray-400 ml-3 flex-1 truncate">{props.newSongItem.alias ? `(${props.newSongItem.alias})` : ''}</span>
      </div>
      {/* 歌手 */}
      <span className="w-52 truncate">{props.newSongItem.singer}</span>
      {/* 别名 */}
      <span className="w-52 truncate">{props.newSongItem.album.name}</span>
      {/* 时长 */}
      <span className=" flex-1 text-right">{formatDuring(props.newSongItem.playTime)}</span>
    </li>
  );
}

export default NewSongItem;