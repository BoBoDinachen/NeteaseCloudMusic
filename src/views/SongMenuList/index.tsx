import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Crown, Right } from '@icon-park/react';
import { SongMenuType } from '~/types/index';
// ************************************************* 导入组件和hooks
import { getHotSongCatlist, getBoutiquePlaylist, getSongList } from '~/services/api/songList';
import BoutiqueCover from './components/BoutiqueCover/index';
import TabBar from './components/TabBar/index';
import TagListBox from './components/TagListBox/index';
import SongMenuItem from '~/components/SongMenuItem/index';
import { useClickAway, useUpdateEffect } from "ahooks";
interface SongMenuListProps {

}

const SongMenuList: FunctionComponent<SongMenuListProps> = () => {
  const [hotSongCatlist, setHotSongCatlist] = useState<{ id: number, name: string }[]>([]);
  const [activeTag, setActiveTag] = useState<string>(''); // 当前活动的标签
  const [activeBoutiqueCover, setActiveBoutiqueCover] = useState<{ name: string, coverImgUrl: string, text: string }>({
    name: '',
    coverImgUrl: '',
    text: ''
  }); // 精品歌单封面
  const [songList, setSongList] = useState<SongMenuType[]>([]); // 歌单列表

 
  /**
   * 加载数据
   */
  useEffect(() => {
    // 加载热门歌单分类
    getHotSongCatlist().then((res: any) => {
      console.log(res);
      let list: { id: number, name: string }[] = [];
      res.tags.forEach((item: any, index: number) => {
        list.push({
          id: item.id,
          name: item.name
        })
        // 设置第一个活动标签
        if (index === 0) {
          setActiveTag(item.name);
        }
      });
      setHotSongCatlist(list);
    })

  }, [])

  /**
   * 加载精品歌单封面
   */
  useUpdateEffect(() => {
    // 获取精品歌单
    getBoutiquePlaylist({ cat: activeTag, limit: 1 }).then((res: any) => {
      // console.log(res);
      if (res.playlists.length !== 0) {
        setActiveBoutiqueCover({
          name: res.playlists[0].name,
          coverImgUrl: res.playlists[0].coverImgUrl,
          text: res.playlists[0].copywriter
        })
      } else {
        // 隐藏封面栏
        setActiveBoutiqueCover({
          name: '',
          coverImgUrl: '',
          text: ''
        })
      }
    })
    // 加载歌单列表
    getSongList({ cat: activeTag, limit: 100, order: 'hot', offset: 1 }).then((res: any) => {
      console.log(res);
      setSongList(res.playlists);
    })
  }, [activeTag])

  

  return (
    <div className='w-full h-full px-20 pb-10 pt-5 overflow-hidden overflow-y-scroll'>
      {/* 精品歌单封面 */}
      <BoutiqueCover boutiqueCover={activeBoutiqueCover} />
      {/* 歌单标签栏 */}
      <TabBar hotSongCatlist={hotSongCatlist} setActiveTag={setActiveTag} tagName={activeTag} />
      {/* 歌单列表 */}
      <ul className='w-full mt-5 grid grid-cols-5 gap-x-12 gap-y-5'>
        {
          songList.map((item, index) => {
            return (
              <SongMenuItem key={item.id} menuItem={item} />
            )
          })
        }
      </ul>
    </div>
  );
}

export default SongMenuList;