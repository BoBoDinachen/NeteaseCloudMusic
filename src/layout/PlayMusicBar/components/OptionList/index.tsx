import { FunctionComponent, useRef, useState } from "react";
import { MusicList, VolumeNotice, Share } from '@icon-park/react';
import { useClickAway, useEventListener } from "ahooks";
import VolumeControl from './components/VolumeControl/index';
import { useAppContext } from '~/context/AppContext';

interface OptionListProps {

}

const OptionList: FunctionComponent<OptionListProps> = () => {

  // ********************************************************** 状态
  const [showSlider, setShowSlider] = useState<boolean>(false);
  const { state, dispatch } = useAppContext();

  const volumeRef = useRef<HTMLButtonElement>(null);
  const volumeControlRef = useRef() as any;
  /**
   * 显示音量控制
   */
  useEventListener('mouseenter', () => {
    volumeControlRef.current.showVolumeControl();
  }, { target: volumeRef })
  
  return (
    <div>
      <ul className=' flex items-center space-x-6 mr-4 '>
        <li className='flex items-center'>
          <button data-tip='分享给好友' className='tooltip'>
            <Share theme="outline" size="22" fill="#fff" />
          </button>
        </li>
        <li className='flex items-center'>
          <button data-tip='调节音量' className='tooltip tooltip-bottom' ref={volumeRef}>
            <VolumeNotice theme="outline" size="22" fill="#fff" />
          </button>
        </li>
        <li className='flex items-center'>
          <button id='palyListBtn' data-tip='播放列表' className='tooltip' onClick={() => { dispatch({ type: 'setShowPlayList', payload: true }) }}>
            <MusicList theme="outline" size="22" fill="#fff" />
          </button>
        </li>
      </ul>
      {/* 调节音量 */}
      <VolumeControl onRef={volumeControlRef} show={showSlider} setShow={setShowSlider}></VolumeControl>
    </div>
  );
}

export default OptionList;