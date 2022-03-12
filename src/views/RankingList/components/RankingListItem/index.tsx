import { Right, RightOne } from "@icon-park/react";
import { useHover } from "ahooks";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { getTsFormatDate } from '~/utils/BaseUtil';
import { getSongListDetail } from '~/services/api/songList';
import { getMusicDetail } from '~/services/api/music';

interface RankingListItemProps {
  topTag: {
    id: number,
    ToplistType?: string,
    coverImgUrl: string,
    updateTime: number
  }
}
interface TrackItemType {
  id: number,
  name: string,
  ar: { name: string }[],
  alia?: string[]
  tns?: string[]
}
const RankingListItem: FunctionComponent<RankingListItemProps> = (props) => {
  const coverRef = useRef<HTMLDivElement>(null!);
  const isHovering = useHover(coverRef); // 是否在封面悬浮
  const [trackList, setTrackList] = useState<TrackItemType[]>([]); // 排行榜信息
  /**
   * 加载榜单数据
   */
  useEffect(() => {
    getSongListDetail({ id: props.topTag.id }).then((res: any) => {
      console.log(res);
      if (res.code === 200) {
        setTrackList(res.playlist.tracks);
      }
    })
  }, [])

  return (
    <li className='flex justify-start items-start mt-5'>
      {/* 榜单封面 */}
      <div ref={coverRef} className='relative '>
        <img className='w-40 rounded-md' src={props.topTag.coverImgUrl} alt="" />
        <button style={{ opacity: isHovering ? '1' : '0' }} className='absolute m-auto left-0 right-0 top-0 bottom-0 btn btn-md btn-circle'>
          <RightOne theme="filled" size="28" fill="#ffff" strokeWidth={2} />
        </button>
        <span className='absolute text-center mt-auto left-0 right-0 bottom-7 text-xs'>{getTsFormatDate(props.topTag.updateTime)}更新</span>
      </div>
      {/* 排行榜---前五 */}
      <ul className='ml-10 flex-1'>
        {
          trackList.map((item, index) => {
            if (index <= 4) {
              return (
                <li key={item.id} className='
                  w-full px-3 py-2 flex space-x-3 justify-between items-center text-xs cursor-pointer
                  rounded-sm
                  hover:bg-gray-500
                '>
                  <span className={`text-sm ${index <= 2 ? 'text-red-500' : ''}`}>{index + 1}</span>
                  <span >{item.name}</span>
                  <span className='text-gray-400'>{`${item.alia?.length === 0 ? '' : `(${item.alia![0]})`}`}</span>
                  <span className='text-gray-400'>{item.tns ? `(${item.tns[0]})` : ''}</span>
                  <span className='flex-1 flex justify-end text-gray-400'>{item.ar[0].name}</span>
                </li>
              )
            }
          })
        }
        <li className='flex items-center p-3'>
          <span className='text-sm text-gray-400 cursor-pointer hover:text-white'>查看全部</span>
          <Right theme="outline" size="16" fill="#ffffff" strokeWidth={2} />
        </li>
      </ul>
    </li>
  );
}
export default RankingListItem;