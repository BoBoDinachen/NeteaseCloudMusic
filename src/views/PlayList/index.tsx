import { useClickAway } from "ahooks";
import { FunctionComponent, useRef } from "react";
import { useAppContext } from '~/context/AppContext';

interface PlayListProps {
  
}
 
const PlayList: FunctionComponent<PlayListProps> = () => {
  
  const playListRef = useRef<HTMLDivElement>(null);
  // 全局状态
  const { state,dispatch } = useAppContext();

  /**
   * 关闭当前播放列表
   */
  useClickAway(() => {
    dispatch({ type: 'setShowPlayList', payload: false });
  }, [playListRef,document.getElementById('palyListBtn')])
  
  return (
    <div ref={ playListRef } className='absolute h-full w-1/4 bg-gray-900 text-white top-0 right-0 p-6 z-50' style={{display: `${state.showPlayList?'block':'none'}`}}>
      <ul className='h-full'>
        <li>歌曲一</li>
        <li>歌曲二</li>
        <li>歌曲三</li>
      </ul>
    </div>
  );
}
 
export default PlayList;