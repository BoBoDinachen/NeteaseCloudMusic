import { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  useGetState,
  useToggle,
  useCreation,
  useUpdateEffect
} from 'ahooks';
import { Howl, Howler } from 'howler';
import Lyric from 'lyric-parser';
// *************************************************  导入组件和hooks
import { useAppContext } from '~/context/AppContext';
import Slider from '~/components/Slider/index';
import { getMusic, getLyric } from '~/services/api/music';
import { secondToMinute } from '~/utils/BaseUtil';
import { SortOne, PlayCycle, ShuffleOne, GoStart, Pause, PlayOne, GoEnd } from '@icon-park/react';

interface MusicControlProps {

}

const MusicControl: FunctionComponent<MusicControlProps> = () => {

  // *********************************************状态
  const [totalSeconds, setTotalSeconds] = useState<number>(0); // 总的秒数
  const [seconds, setSeconds, getSeconds] = useGetState<number>(0); // 当前秒数
  const [isPause, { toggle, setLeft, setRight }] = useToggle(); // 切换播放状态
  const [playMode, setPlayMode] = useState<'order' | 'random' | 'loop'>('order'); // 当前的播放模式
  const { state, dispatch } = useAppContext(); // 全局状态
  const [musicUrl, setMusicUrl] = useState<string>(''); // 当前音乐资源的url
  const [lyricStr, setLyricStr] = useState<string>(''); // 歌词数据
  const timer = useRef<any>(null);
  const [lastSeconds, setLastSeconds, getLastSeconds] = useGetState<number>(0); // 滚动条最后一次抬起的值

  // 常量 --- 音乐对象
  const sound = useMemo(() => new Howl({
    src: [musicUrl],
    format: ['.webm', '.mp3', '.wav'],
    html5: true,
    xhr: {
      method: 'get'
    },
    autoplay: false,
    preload: 'metadata',
    onload: () => {
      console.log("音乐加载...");
      // 获取音乐的持续时长 seconds
      setTotalSeconds(parseInt(sound.duration() + ''));
    },
    onend: () => {
      console.log("音乐结束...");
      setLeft(); // 暂停
      setSeconds(0);
      dispatch({type:'setCurrentLyric',playload:'— — 终 — —'})
      clearInterval(timer.current); // 清除计时器
      timer.current = null;
    }
  }), [musicUrl]);
  // 常量 --- 歌词对象
  const lyric = useCreation(() => new Lyric(lyricStr, (props: { lineNum: any, txt: any }) => {
    // console.log(props.lineNum, props.txt);
    dispatch({ type: 'setCurrentLyric', playload: props.txt }); // 设置当前的歌词
  }), [lyricStr])

  /**
   * 控制音量
   */
  useEffect(() => {
    if (sound !== null) {
      sound.volume(state.currentVolume / 100);
    }
  }, [state.currentVolume])

  /**
   * 控制音乐的播放进度和歌词进度
   */
  useUpdateEffect(() => {
    if (sound !== null && lyric !== null) {
      sound.seek(getLastSeconds()); // 音乐跳转
      lyric.seek(getLastSeconds() * 1000); // 歌词跳转
    }
  }, [lastSeconds])

  /**
   * 加载音乐url和歌词数据
   */
  useEffect(() => {
    // 获取歌曲的url
    getMusic(state.playSoundId!).then((res: any) => {
      setMusicUrl(res.data[0].url);
    })
    // 获取歌词数据
    getLyric(state.playSoundId!).then((res: any) => {
      setLyricStr(res.lrc.lyric);
    })
    return () => {
      sound.unload(); // 清除当前的音乐对象
      setSeconds(0); // 进度条重置
    }
  }, [state.playSoundId])

  /**
   * 自动播放音乐和开始进度条
   */
  useEffect(() => {
    if (sound !== null && lyric !== null) {
      // handlePlay(); // 开始播放音乐和歌词
    }
    return () => {
      sound.unload(); // 清除当前的音乐对象
      clearInterval(timer.current); // 清除计时器
      timer.current = null;
    }
  }, [musicUrl])

  /**
   * 点击播放
   */
  const handlePlay = () => {
    if (sound !== null && lyric !== null) {
      sound.play(); // 音乐播放
      lyric.play(getSeconds() * 1000); // 歌词播放 
      setRight(); // 切换状态
      // 计时器开始
      if (timer.current == null) {
        timer.current = setInterval(() => {
          setSeconds(getSeconds() + 1);
        }, 1000)
      }
    }

  }

  /**
   * 点击暂停
   */
  const handlePause = () => {
    if (sound !== null && lyric !== null) {
      sound.pause(); // 音乐暂停
      lyric.togglePlay(); // 歌词暂停
      setLeft(); // 切换状态
      // 清除计时器
      clearInterval(timer.current);
      timer.current = null;
    }
  }

  return (
    <div className='absolute m-auto left-0 right-0 flex flex-col justify-center space-y-1.5 w-2/6'>
      {/* 控制按钮 */}
      <ul className='flex w-full justify-center items-center space-x-5'>
        {/* 播放模式 */}
        <li>
          {
            playMode === 'loop' &&
            <button data-tip="单曲循环" className='tooltip' onClick={() => { setPlayMode('order') }}>
              <PlayCycle theme="outline" size="22" fill="#fff" />
            </button>
          }
          {
            playMode === 'random' &&
            <button data-tip="随机播放" className='tooltip' onClick={() => { setPlayMode('loop') }}>
              <ShuffleOne theme="outline" size="22" fill="#fff" />
            </button>
          }
          {
            playMode === 'order' &&
            <button data-tip="顺序播放" className='tooltip' >
              <SortOne theme="outline" size="22" fill="#fff" onClick={() => { setPlayMode('random') }} />
            </button>
          }
        </li>
        {/* 上一首 */}
        <li>
          <button data-tip="上一首" className='tooltip btn btn-sm btn-circle'>
            <GoStart theme="outline" size="25" fill="#fff" />
          </button>
        </li>
        {/* 播放和暂停 */}
        <li>
          {
            isPause ?
              <button data-tip="暂停" className='tooltip btn btn-md btn-circle' onClick={handlePause}>
                <Pause theme="outline" size="30" fill="#fff" />
              </button>
              :
              <button data-tip="播放" className='tooltip btn btn-md btn-circle' onClick={handlePlay}>
                <PlayOne theme="outline" size="30" fill="#fff" />
              </button>
          }

        </li>
        {/* 下一首 */}
        <li>
          <button data-tip="下一首" className='tooltip btn btn-sm btn-circle'>
            <GoEnd theme="outline" size="25" fill="#fff" />
          </button>
        </li>
        <li>
          <span className={`cursor-pointer ${state.showLyric === true ? 'text-purple-500' : ''} hover:text-purple-500`} onClick={() => { dispatch({ type: 'setShowLyric', payload: true }) }}>词</span>
        </li>
      </ul>
      {/* 进度条 */}
      <div className='w-full h-2.5 flex items-center' >
        <span className='w-10 text-center mr-3'>
          {secondToMinute(seconds)}
        </span>
        <Slider value={seconds} totalValue={totalSeconds} setValue={(value) => { setSeconds(value) }} setLastValue={(value) => { setLastSeconds(value) }}></Slider>
        <span className='w-10 text-center ml-3'>
          {secondToMinute(totalSeconds)}
        </span>
      </div>
    </div>
  );
}

export default MusicControl;