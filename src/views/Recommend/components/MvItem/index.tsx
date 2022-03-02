import { FunctionComponent, useRef } from "react";
import {PlayOne} from '@icon-park/react';
import { useHover } from "ahooks";
interface MvItemProps {
  mvItem: RecommendMvType
}

interface RecommendMvType {
  id: number, // id
  artistName: string, // MV作者
  title: string, // 标题
  name: string, //MV名字
  picUrl: string, // 封面
  playCount: number // 播放数量
}

const MvItem: FunctionComponent<MvItemProps> = (props) => {

  const slideBoxRef = useRef<HTMLDivElement>(null!);
  const imgRef = useRef<HTMLImageElement>(null!);
  const isHovering =  useHover(imgRef)

  return (
    <li className='flex flex-col justify-between cursor-pointer'>
      {/* 封面 */}
      <div className='relative overflow-hidden'>
        <img ref={imgRef} className='w-80 h-36 object-cover rounded-md' src={props.mvItem.picUrl} alt="" />
        <div className={`transition duration-300 text-sm top-0 absolute w-full p-2 ${isHovering?'opacity-100':'opacity-0'}`} style={{backgroundColor: 'rgba(40, 44, 52, 0.7)'}}>{props.mvItem.title}</div>
        {/* 播放量 */}
        <div className={
          `absolute top-1 right-1 flex justify-start items-center
          transition duration-300
          ${isHovering?'opacity-0':'opacity-100'} 
          `}>
          <PlayOne theme="filled" size="14" fill="#ffffff" />
          <span className='text-sm'>{props.mvItem.playCount}</span>
        </div>
      </div>
      {/* mv信息 */}
      <div className='w-52 mt-2 flex flex-col items-start justify-start'>
        <span className='truncate text-sm text-gray-200 w-52 hover:text-white'>{props.mvItem.name}</span>
        <span className='text-xs text-gray-400'>{props.mvItem.artistName}</span>
      </div>
    </li>
  );
}
 
export default MvItem;