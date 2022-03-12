import { FunctionComponent, useEffect, useRef, useState } from "react";
import styles from './index.module.css';
import { SettingTwo, Lock, Close } from '@icon-park/react';
// *************************************** 导入组件和function
import useBoxDrag from '~/hooks/useBoxDrag';
import { useAppContext } from '~/context/AppContext';


interface LyricProps {

}

const LyricBox: FunctionComponent<LyricProps> = () => {
  const dragRef = useRef<HTMLDivElement>(null);
  const { state, dispatch } = useAppContext();

  /**
   * 元素拖拽生效
   */
  useEffect(() => {
    useBoxDrag(dragRef.current!); // 拖拽元素
    return () => {
      
    }
  }, [])

  /**
   * 控制歌词的显示
   */
  useEffect(() => {
    if (state.showLyric) {
      dragRef.current!.style.display = 'flex';
    } else {
      dragRef.current!.style.display = 'none';
    }
  }, [state.showLyric])

  /**
     * 处理每个菜单项的点击
     * @param name 菜单名字
     */
  const handleActionMenu = (name: 'setting' | 'locking' | 'close') => {
    switch (name) {
      case 'setting':
        console.log('setting');
        break;
      case 'locking':
        console.log('locking');
        break;
      case 'close':
        console.log('close');
        dispatch({ type: 'setShowLyric', payload: false })
        break;
    }
  }
  return (
    <div className={styles.container} ref={dragRef}>
      {/* 歌词菜单栏 -- 设置 --- 锁定 -- 关闭*/}
      <ul className='flex w-full justify-end space-x-3'>
        <li>
          <button className='btn btn-ghost btn-sm btn-circle' onClick={() => { handleActionMenu('setting') }}>
            <SettingTwo theme="outline" size="17" fill="#ffffff" />
          </button>
        </li>
        <li>
          <button className='btn btn-ghost btn-sm btn-circle' onClick={() => { handleActionMenu('locking') }}>
            <Lock theme="outline" size="17" fill="#ffffff" />
          </button>
        </li>
        <li>
          <button className='btn btn-ghost btn-sm btn-circle' onClick={() => { handleActionMenu('close') }}>
            <Close theme="outline" size="17" fill="#ffffff" />
          </button>
        </li>
      </ul>
      {/* 显示歌词 */}
      <h1 className=' flex justify-center items-center text-2xl flex-1 w-full'>{state.currentLyric}</h1>
    </div>
  );
}

export default LyricBox;