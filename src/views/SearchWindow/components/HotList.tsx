import { FunctionComponent, useEffect, useState } from "react";
import { getHotSearchList, getHotSearchDetailsList } from '~/services/api/search';

interface HotListProps {

}

interface HotDataType {
  searchWord?: string, // 搜索词
  score?: number, // 搜索次数
  iconUrl?: string // 图标
  content?: string // 内容
  iconType?: number // 图标类型
}

const HotList: FunctionComponent<HotListProps> = () => {
  // 状态
  const [hotListData, setHotListData] = useState<HotDataType[]>([]);

  /**
   * 加载热搜数据
   */
  useEffect(() => {
    getHotSearchDetailsList().then((res: any) => {
      // console.log(res);
      setHotListData(res.data)
    })
  }, [])
  return (
    <div className='w-full'>
      <span className=''>热搜榜</span>
      {/* 列表数据 */}
      <ul className='flex mt-2 flex-col py-4 w-full'>
        {
          hotListData.map((data, index) => {
            return (
              <li key={index} className='flex h-12 px-1 items-center cursor-pointer hover:bg-gray-700 rounded-md '>
                <span className={`w-9 mr-7 text-center text-md ${index <= 2 ? 'text-red-600' : ''}`}>{index + 1}</span>
                <div className='flex flex-col'>
                  <div className='flex items-center space-x-3'>
                    <span className='text-sm'>{data.searchWord}</span>
                    <span className='text-2xs text-gray-500'>{data.score}</span>
                    <img src={data.iconUrl ? data.iconUrl : ''} className={`${data.iconType === 1 ? 'w-6' : (data.iconType === 5 ? 'w-3' : 'w-6')}`} alt="" />
                  </div>
                  <span className='text-2xs w-64 truncate text-gray-500 mt-1'>{ data.content}</span>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default HotList;