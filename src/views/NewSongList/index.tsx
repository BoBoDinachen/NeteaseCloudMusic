import { FunctionComponent, useEffect, useState } from "react";
import { getRecommendNewSong } from '~/services/api/recommend';
import { Play, AddOne } from '@icon-park/react';
import NewSongItem from './components/NewSongItem';
import Loading from '~/components/Loading/index';

interface NewSongListProps {

}

interface NewSongType {
  index: number,
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

const NewSongList: FunctionComponent<NewSongListProps> = () => {

  const [newSongList, setNewSongList] = useState<NewSongType[]>([]); // 新音乐列表
  const [loading, setLoading] = useState<boolean>(false); // 加载

  useEffect(() => {
    setLoading(true);
    // 获取新音乐
    getRecommendNewSong(99).then((res: any) => {
      console.log(res);
      if (res.code === 200) {
        let list: NewSongType[] = [];
        res.result.forEach((item: any, index: number) => {
          list.push({
            index: index+1,
            serial: (index+1).toString().length === 2 ? '' + (index+1) : '0' + (index+1),
            id: item.id,
            name: item.name,
            album: { name: item.song.album.name },
            alias: item.song.alias[0],
            picUrl: item.picUrl,
            playTime: item.song.bMusic.playTime,
            singer: item.song.artists[0].name
          })
        });
        setNewSongList(list);
        setLoading(false);
      }
    })
  }, [])
  return (
    <div className='w-full flex-1 px-24 py-5 overflow-hidden overflow-y-scroll'>
      {/* 标签栏 */}
      <div className="flex justify-start items-center">
        <h4 className="flex-1 font-bold">全部</h4>
        <button className="btn btn-sm bg-green-500 btn-ghost space-x-1">
          <Play theme="outline" size="20" fill="#ffffff" strokeWidth={2} />
          <span>播放全部</span>
        </button>
        <button className="btn btn-sm ml-3 space-x-1">
          <AddOne theme="outline" size="20" fill="#ffffff" strokeWidth={2} />
          <span>收藏全部</span>
        </button>
      </div>
      <ul className="mt-6">
        {
          loading ? <Loading></Loading> :
            newSongList.map((item, index) => {
              return (
                <NewSongItem newSongItem={item} key={item.id}></NewSongItem>
              )
            })
        }
      </ul>
    </div>
  );
}

export default NewSongList;