import { FunctionComponent, useEffect, useMemo, useRef, useState } from "react";
import { getAllTopList } from '~/services/api/rankingList';
// *************************************** 导入组件和hooks
import RankingListItem from './components/RankingListItem/index';
import ListCoverItem from './components/ListCoverItem/index';

interface RankingListProps {

}
// 榜单类型
interface TopTaglistType {
  id: number,
  ToplistType?: string,
  coverImgUrl: string,
  updateTime: number,
  name: string,
  playCount: number
}
const RankingList: FunctionComponent<RankingListProps> = () => {
  const [topTagList, setTopTagList] = useState<TopTaglistType[]>([]); // 榜单标签

  const containerRef = useRef<HTMLDivElement>(null!);

  // 加载榜单数据
  useEffect(() => {
    getAllTopList().then((res: any) => {
      console.log(res);
      if (res.code === 200) {
        setTopTagList(res.list);
      }
    })
  }, [])


  return (
    <div ref={containerRef} className='w-full flex-1 px-32 py-5 overflow-hidden overflow-y-scroll'>
      <label className='w-full font-bold text-lg'>官方榜</label>
      {/* 榜单排行信息 */}
      <ul className='flex flex-col w-full'>
        {
          topTagList.map((item) => {
            if (item.ToplistType) {
              return (
                <RankingListItem topTag={item} key={item.id} />
              )
            }
          })
        }
      </ul>
      <label className='w-full font-bold text-lg'>全球榜</label>
      {/* 全球榜单列表 */}
      <ul className='grid grid-cols-5 w-full mt-5'>
        {
          topTagList.map((item) => {
            if (item.ToplistType === undefined) {
              return (
                <ListCoverItem menuItem={item} key={item.id} />
              )
            }
          })
        }
      </ul>
    </div>
  );
}

export default RankingList;