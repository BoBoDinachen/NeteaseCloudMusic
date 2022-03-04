import { Crown } from "@icon-park/react";
import { FunctionComponent } from "react";

interface BoutiqueCoverProps {
  boutiqueCover: { name: string, coverImgUrl: string, text: string }
}

const BoutiqueCover: FunctionComponent<BoutiqueCoverProps> = (props) => {
  return (
    <div style={{ display: props.boutiqueCover.name === '' ? 'none' : 'flex' }} className='relative flex justify-start p-3 overflow-hidden rounded-md cursor-pointer'>
      <div className='z-50  flex space-x-3'>
        <img className='w-36 rounded-md' src={props.boutiqueCover.coverImgUrl} alt="" />
        {/* 右边信息部分 */}
        <div className='flex flex-col justify-start py-5 space-y-2'>
          <div className='flex w-max px-2 py-1 rounded-2xl items-center space-x-1 bordered border-2 border-yellow-400'>
            <Crown theme="outline" size="20" fill="#fbbf24" />
            <span className='text-sm text-yellow-400'>精品歌单</span>
          </div>
          <span>{props.boutiqueCover.name}</span>
          <span className='text-sm text-gray-400'>{props.boutiqueCover.text}</span>
        </div>
      </div>
      <img style={{ filter: 'blur(30px) brightness(50%)' }} className='w-full object-contain absolute m-auto right-0 bottom-0 left-0 top-0 z-10' src={props.boutiqueCover.coverImgUrl} alt="" />
    </div>
  );
}

export default BoutiqueCover;