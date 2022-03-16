import { FunctionComponent, useEffect, useState, memo } from "react";
import { getPersonalized, getBanner, getPrivateContent, getRecommendNewSong, getRecommendMV } from '~/services/api/recommend';
import { Right, TopBar } from '@icon-park/react';
import { useQuery } from 'react-query';
import { SongMenuType } from '~/types/index';
// ********************************************** 组件和hooks
import SlideShow from './components/SlideShow';
import PrivateContentItem from './components/PrivateContentItem';
import NewSongItem from './components/NewSongItem';
import SongMenuItem from '~/components/SongMenuItem'; // 歌单
import MvItem from './components/MvItem';
import TitleBar from './components/TitleBar/index';

interface RecommendProps {

}


interface NewSongType {
  id: number,
  name: string, // 歌曲名字
  alias: string, // 歌曲别名
  picUrl: string, // 歌曲图片
  singer: string // 歌手
}

interface RecommendMvType {
  id: number, // id
  artistName: string, // MV作者
  title: string, // 标题
  name: string, //MV名字
  picUrl: string, // 封面
  playCount: number // 播放数量
}

const Recommend: FunctionComponent<RecommendProps> = () => {

  // 轮播图列表
  const [bannerUrlList, setBannerUrlList] = useState<{ url: string, title: string }[]>([]); // 每个轮播图的地址

  // 每张图片的位置
  const [dir, setDir] = useState<{ name: string }[]>([]);

  // 推荐歌单列表
  const { isSuccess, data: songMenuList, status } = useQuery(['songMenuList'], async () => {
    const response: any = await getPersonalized({ limit: 10 })
    // setSongMenuList(response.result)
    console.log(response);
    
    return response;
  })

  // 独家放送列表
  const [privateContent, setPrivateContent] = useState<{ id: number, picUrl: string, name: string }[]>([]);

  // 最新音乐推荐
  const [newSongList, setNewSongList] = useState<NewSongType[]>([]);

  // 推荐MV列表
  const [recommendMVList, setRecommendMVList] = useState<RecommendMvType[]>([]);
  /**
   * 获取数据
   */
  useEffect(() => {
    // 获取轮播图
    getBanner({ type: 0 }).then((res: any) => {
      // 加载轮播图时的图片位置数量信息
      let dirCopy = [
        { name: 'start' },
        { name: 'middle' },
        { name: 'end' }
      ]
      for (let index = 0; index < res.banners.length - 3; index++) {
        dirCopy.push({ name: 'normal' })
      }
      setDir(dirCopy);
      let list: { url: string, title: string }[] = [];
      res.banners.forEach((item: any, index: number) => {
        list.push({
          url: item.imageUrl,
          title: item.typeTitle
        });
      });
      setBannerUrlList(list)
    })
    // 获取独家放送列表
    getPrivateContent().then((res: any) => {
      // console.log(res);
      let list: { id: number, picUrl: string, name: string }[] = []; // 数据列表
      if (res.code === 200) {
        res.result.forEach((item: any, index: number) => {
          list.push({ id: item.id, picUrl: item.sPicUrl, name: item.name });
        });
        setPrivateContent(list);
      }
    })
    // 获取最新音乐列表
    getRecommendNewSong().then((res: any) => {
      let list: NewSongType[] = []; // 数据列表
      if (res.code === 200) {
        res.result.forEach((item: any, index: number) => {
          list.push({
            id: item.id,
            name: item.name,
            alias: item.song.album.alias[0],
            picUrl: item.picUrl,
            singer: item.song.album.artists[0].name
          })
        });
        setNewSongList(list);
      }
    })
    // 获取推荐MV
    getRecommendMV().then((res: any) => {
      let list: RecommendMvType[] = [];
      if (res.code === 200) {
        res.result.forEach((item: any, index: number) => {
          list.push({
            id: item.id,
            artistName: item.artistName,
            name: item.name,
            picUrl: item.picUrl,
            playCount: item.playCount,
            title: item.copywriter
          })
        });
        setRecommendMVList(list);
      }
    })
  }, [])

  return (
    <div className='px-24 py-5 w-full flex-1 flex flex-col justify-start items-center overflow-y-scroll overflow-hidden'>
      {/* 轮播图 */}
      <SlideShow imgUrlList={bannerUrlList!} dir={dir} setDir={setDir}></SlideShow>
      {/* 推荐歌单 */}
      <TitleBar title='推荐歌单'/>
      {
        status === 'loading' ? (
          <div>Loading...</div>
        ) : (
          <ul className='w-full mt-5 grid grid-cols-5 gap-x-5 gap-y-5'>
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
      {/* 独家放送 */}
      <TitleBar title='独家放送'/>
      <ul className='mt-5 flex justify-between items-center space-x-4'>
        {
          privateContent.map((item, index) => {
            return <PrivateContentItem content={item} key={item.id} />
          })
        }
      </ul>
      {/* 最新音乐 */}
      <TitleBar title='最新音乐'/>
      <ul className='w-full mt-5 grid grid-cols-3 gap-x-12 gap-y-6'>
        {
          newSongList.map((item, index) => {
            return (
              <NewSongItem songItem={item} key={item.id} />
            )
          })
        }
      </ul>
      {/* 推荐MV */}
      <TitleBar title='推荐MV'/>
      <ul className='w-full mt-5 flex justify-between items-center space-x-5'>
        {
          recommendMVList.map((item, index) => {
            return (<MvItem mvItem={item} key={item.id} />)
          })
        }
      </ul>
    </div >
  );
}

export default Recommend