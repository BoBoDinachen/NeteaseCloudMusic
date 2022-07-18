import { Download, Like, MusicOne } from "@icon-park/react";
import { FunctionComponent, useEffect, useState } from "react";
import { getSongListAllMusic } from '~/services/api/songList';
import { useParams } from 'react-router-dom';
import { formatDuring } from '~/utils/BaseUtil';
import Loading from '~/components/Loading/index';
import { useAppContext } from '~/context/AppContext';

interface MusicListProps {

}

interface MusicDataType {
  id: number
  al: { name: string } // 专辑
  alia: string[] // 别名
  ar: { name: string }[] // 歌手
  name: string // 歌名
  dt: number // 时长
}

const MusicList: FunctionComponent<MusicListProps> = () => {
  const params = useParams();
  const [musicListData, setMusicListData] = useState<MusicDataType[]>([]); // 歌曲列表数据
  const [loading, setLoading] = useState<boolean>(false); // 加载状态
  const { state, dispatch } = useAppContext();
  /**
   * 获取歌单内所有的歌曲
   */
  useEffect(() => {
    setLoading(true);
    getSongListAllMusic({ id: Number(params.songMenuId) }).then((res: any) => {
      console.log(res);
      if (res.code === 200) {
        setMusicListData(res.songs);
        setLoading(false);
      }
    })
  }, [])

  /**
   * 鼠标双击每个item
   */
  const handleClickItem = (id: number) => {
    dispatch({ type: 'setPlaySoundId', playload: id });
    dispatch({ type: 'setAutoPlay', playload: true });
  }

  return (
    <div className="flex flex-col w-full justify-start mt-5 text-gray-400 text-sm">
      {/* 标题栏 */}
      <div className="flex w-full justify-between items-center cursor-pointer">
        <span style={{ flex: 1 }} className=''></span>
        <span style={{ flex: 1 }} className='p-2'>操作</span>
        <span style={{ flex: 4 }} className='hover:bg-gray-500 p-2 rounded-sm'>标题</span>
        <span style={{ flex: 3 }} className='hover:bg-gray-500 p-2 rounded-sm'>歌手</span>
        <span style={{ flex: 3 }} className='hover:bg-gray-500 p-2 rounded-sm'>专辑</span>
        <span style={{ flex: 2 }} className='hover:bg-gray-500 p-2 rounded-sm'>时间</span>
      </div>
      {/* 歌曲列表 */}
      <ul className="flex relative flex-col w-full h-40 justify-start">
        {
          loading ? <Loading></Loading> :
            musicListData.map((item, index) => {
              return (
                <li className={
                  `flex w-full justify-between items-center py-3
                  ${(index + 1) % 2 === 0 ? '' : 'bg-gray-600'}
                  hover:bg-gray-500
                  cursor-pointer
                `}
                  onDoubleClick={() => { handleClickItem(item.id) }}
                  key={item.id}>
                  {
                    state.playSoundId === item.id ?
                      <MusicOne style={{ flex: 1 }} className='' theme="outline" size="24" fill="#ffffff" strokeWidth={2} />
                      :
                      <span style={{ flex: 1 }} className='text-center'>{(index + 1).toString().length === 1 ? '0' + (index + 1) : index + 1}</span>
                  }
                  <span style={{ flex: 1 }} className='flex items-center px-2 space-x-2'>
                    {
                      true ? <Like theme="outline" size="20" fill="#9ca3af" strokeWidth={2} /> :
                        <Like theme="filled" size="20" fill="#d0021b" strokeWidth={2} />
                    }
                    <Download theme="outline" size="20" fill="#9ca3af" strokeWidth={2} />
                  </span>
                  <span style={{ flex: 4 }} className='px-2 truncate text-gray-200'>{item.name}<span className="ml-2 text-gray-400">{item.alia[0] === undefined ? '' : `(${item.alia[0]})`}</span></span>
                  <span style={{ flex: 3 }} className='truncate px-2'>{
                    item.ar.map((arItem, index) => {
                      if (index !== item.ar.length - 1) {
                        return <span key={index}>{arItem.name + ' / '}</span>
                      } else {
                        return <span key={index}>{arItem.name}</span>
                      }
                    })
                  }</span>
                  <span style={{ flex: 3 }} className='px-2 truncate'>{item.al.name}</span>
                  <span style={{ flex: 2 }} className='px-2'>{formatDuring(item.dt)}</span>
                </li>
              )
            })
        }
      </ul>
    </div>
  );
}

export default MusicList;