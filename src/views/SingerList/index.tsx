import { FunctionComponent, useEffect, useState } from "react";
import TagClassifyBox from './components/TagClassifyBox/index';
import { getSingerClassifyList } from '~/services/api/singer';
import { User } from '@icon-park/react';
import Loading from '~/components/Loading/index';

interface SingerListProps {

}

interface singerType {
  id: number,
  img1v1Url: string,
  accountId: number,
  name: string
}

const SingerList: FunctionComponent<SingerListProps> = () => {
  const [activeTag1, setactiveTag1] = useState<'-1' | '7' | '96' | '8' | '16' | '0'>('-1'); // 语种标签
  const [activeTag2, setactiveTag2] = useState<'-1' | '1' | '2' | '3'>('-1'); // 分类标签
  const [activeTag3, setactiveTag3] = useState<string>('-1'); // 筛选标签

  const [isLoading, setLoading] = useState<boolean>(false); // 是否加载
  const [artistList, setArtistList] = useState<singerType[]>([]); // 歌手列表

  // 加载歌手列表
  useEffect(() => {
    setLoading(true); // 开始加载
    getSingerClassifyList({ type: activeTag2, area: activeTag1, initial: activeTag3, limit: 30, offset: 1 }).then((res: any) => {
      console.log(res);
      if (res.code === 200) {
        setLoading(false);
        setArtistList(res.artists);
      }
    })
  }, [activeTag1, activeTag2, activeTag3])

  return (
    <div className='w-full flex-1 px-32 py-5 overflow-hidden overflow-y-scroll'>
      {/* 分类标签盒子 */}
      <TagClassifyBox activeTag1={activeTag1}
        activeTag2={activeTag2}
        activeTag3={activeTag3}
        setactiveTag1={setactiveTag1}
        setactiveTag2={setactiveTag2}
        setactiveTag3={setactiveTag3}
      ></TagClassifyBox>
      {/* 歌手列表 */}
      {
        isLoading ? <Loading></Loading> :
          <ul className="grid grid-cols-6 gap-x-5 gap-y-6 mt-10 pb-10">
            {
              artistList.map((item, index) => {
                return (
                  <li key={item.id}>
                    <img src={item.img1v1Url} className='rounded-md h-40 object-cover' alt="" />
                    <div className="text-sm flex justify-between items-center mt-1">
                      <span>{item.name}</span>
                      {item.accountId &&
                        <button className="btn btn-xs btn-circle flex justify-center items-center">
                          <User theme="filled" size="14" fill="#ffffff" strokeWidth={2} />
                        </button>
                      }
                    </div>
                  </li>
                )
              })
            }
          </ul>
      }
    </div>
  );
}

export default SingerList;