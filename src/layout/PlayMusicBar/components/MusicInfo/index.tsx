import { FunctionComponent, useEffect, useRef, useState } from "react";

import styles from './index.module.css';
// ************************************************** 导入图标
import testJpg from '~/assets/images/test.jpg';
import likeIcon from '~/assets/icons/like.svg';
import unlikeIcon from '~/assets/icons/unlike.svg';
import { Down, FolderPlus, Like, Download } from '@icon-park/react';
// *************************************************** 导入组件、hooks
import { useEventListener, useTitle } from 'ahooks';
import { getMusicDetail } from '~/services/api/music';
import { useAppContext } from '~/context/AppContext';

interface MusicInfoProps {

}
// 歌曲信息类型
interface musicInfoType {
  name: string,
  picUrl: string,
  artist: string
}

const MusicInfo: FunctionComponent<MusicInfoProps> = () => {
  const avatarRef = useRef<HTMLImageElement>(null);
  const upIconRef = useRef<HTMLDivElement>(null);
  const { state, dispatch } = useAppContext();

  const [musicInfo, setMusicInfo] = useState<musicInfoType>({ name: '', picUrl: '', artist: '' }); // 歌曲信息

  useEffect(() => {
    // 获取歌曲详情
    getMusicDetail(state.playSoundId!).then((res: any) => {
      // console.log(res);
      let info = res.songs[0].al;
      let ar = res.songs[0].ar[0];
      setMusicInfo({ name: res.songs[0].name, picUrl: info.picUrl, artist: ar.name })
    })
  }, [state.playSoundId]);

  // 设置网站标题
  useTitle(musicInfo.name + '-' + musicInfo.artist + '-' + '网易云音乐'); // 设置页面标题

  // 鼠标移入事件
  useEventListener('mouseover', () => {
    avatarRef.current!.style.filter = `blur(1px) brightness(50%)`;
    upIconRef.current!.style.opacity = '1';
  }, { target: upIconRef })

  // 鼠标移出事件
  useEventListener('mouseout', () => {
    avatarRef.current!.style.filter = 'none';
    upIconRef.current!.style.opacity = '0';
  }, { target: upIconRef })

  return (
    <>
      {/* 音乐详情页隐藏时--切换到图片和名字 */}
      {
        state.showMusicDetails === false && (
          <div className='min-w-min flex justify-start items-center text-gray-400'>
            {/* 图片 */}
            <div className='relative'>
              <img src={musicInfo.picUrl} alt="" className={styles.musicAvatarUrl} ref={avatarRef} />
              {/* 点击打开音乐详情页 */}
              <div className={styles.iconBox} ref={upIconRef} onClick={() => { dispatch({ type: 'setShowMusicDetails', payload: true }) }}>
              </div>
            </div>
            {/* 歌曲名字和歌手 */}
            <div className='ml-3 flex flex-col space-y-2'>
              <div className='flex items-center'>
                <div className={styles.musicTitle}>
                  <p>{musicInfo.name}</p>
                </div>
                <img className='ml-1 w-5' src={likeIcon} />
              </div>
              <span className='text-sm'>
                {musicInfo.artist}
              </span>
            </div>
          </div>
        )
      }
      {/* 音乐详情页显示时--切换到图标 */}
      {
        state.showMusicDetails === true && (
          <div className='flex items-center'>
            {/* 向下的图标 */}
            <div className='w-32 flex items-center'>
              <Down className='cursor-pointer' theme="outline" size="30" fill="#ffffff" onClick={() => { dispatch({type:'setShowMusicDetails',payload:false})}}/>
            </div>
            {/* 其它的图标列表---喜欢--收藏--下载 */}
            <ul className='flex items-center space-x-3'>
              <li data-tip="喜欢" className='tooltip'>
                <button  className='btn btn-md btn-circle'>
                  <Like theme="outline" size="20" fill="#ffffff" />
                </button>
              </li>
              <li data-tip="收藏" className='tooltip'>
                <button className='btn btn-md btn-circle'>
                  <FolderPlus theme="outline" size="20" fill="#ffffff" />
                </button>
              </li>
              <li data-tip="下载" className='tooltip'>
                <button className='btn btn-md btn-circle'>
                  <Download theme="outline" size="20" fill="#ffffff" />
                </button>
              </li>
            </ul>
          </div>
        )
      }
    </>
  );
}

export default MusicInfo;