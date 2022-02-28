import { FunctionComponent, useEffect, useState } from "react";
import { getPersonalized, getBanner } from '~/services/api/recommend';
import testImg from '~/assets/images/test.jpg';
import { Right } from '@icon-park/react';
import { useQuery } from 'react-query';
import { SongMenuType } from '~/types/index';
// ********************************************** 组件和hooks
import SlideShow from './components/SlideShow';
import SongMenuItem from './components/SongMenuItem'; // 歌单
import { useCreation } from "ahooks";
interface RecommendProps {

}

const Recommend: FunctionComponent<RecommendProps> = () => {

  const [bannerUrlList, setBannerUrlList] = useState<{ url: string, title: string }[]>([]); // 每个轮播图的地址

  // 推荐歌单列表
  const { isSuccess, data: songMenuList, status } = useQuery(['songMenuList'], async () => {
    const response: any = await getPersonalized({ limit: 10 })
    // setSongMenuList(response.result)
    return response;
  })

  /**
   * 获取数据
   */
  useEffect(() => {
    // 获取轮播图
    getBanner({ type: 0 }).then((res: any) => {
      console.log(res);
      let list: { url: string, title: string }[] = [];
      res.banners.forEach((item: any, index: number) => {
        list.push({
          url: item.imageUrl,
          title: item.typeTitle
        });
      });
      setBannerUrlList(list);
    })
    // getPersonalized({ limit: 10 }).then((res: any) => {
    //   // console.log(res);
    //   setSongMenuList(res.result);
    // })
  }, [])

  return (
    <div className='px-28 py-5 w-full flex-1 flex flex-col justify-start items-center overflow-y-scroll overflow-hidden'>
      {/* 轮播图 */}
      <SlideShow imgUrlList={bannerUrlList}></SlideShow>
      {/* 推荐歌单 */}
      <div className='mt-16 flex w-full items-center'>
        <span className='text-xl font-bold'>推荐歌单</span>
        <Right theme="outline" size="24" fill="#ffffff" />
      </div>
      {
        status === 'loading' ? (
          <div>Loading...</div>
        ) : (
          <ul className='mt-5 grid grid-cols-5 gap-x-12 gap-y-5'>
            {
              songMenuList.result.map((item: SongMenuType, index: any) => {
                return (
                  <SongMenuItem key={item.id} menuItem={item} />
                )
              })
            }
          </ul>
        )
      }
      {/* 热门播客 */}
      {/* 推荐歌单 */}
      <div className='mt-12 flex w-full items-center'>
        <span className='text-xl font-bold'>热门博客</span>
        <Right theme="outline" size="24" fill="#ffffff" />
      </div>
      {/* 独家放送 */}
      {/* 最新音乐 */}
    </div >
  );
}

export default Recommend;