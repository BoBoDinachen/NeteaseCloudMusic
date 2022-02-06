import { FunctionComponent } from "react";
import { Down, Left, Right, Search } from '@icon-park/react';
import { useAppContext } from '~/context/AppContext';

interface TopBarProps {

}

const TopBar: FunctionComponent<TopBarProps> = () => {
  const { state, dispatch } = useAppContext();

  return (
    <div className='w-full flex items-center  p-4'>
      {/* 隐藏图标 */}
      <div className='cursor-pointer'>
        <Down theme="outline" size="30" fill="#ffffff" onClick={() => { dispatch({ type: 'setShowMusicDetails', payload: false }) }} />
      </div>
      {/* 搜索栏 */}
      <div className='flex items-center ml-32'>
        <div className="flex justify-center items-center space-x-3">
          <button className='btn btn-ghost btn-circle outline-none btn-sm'>
            <Left theme="outline" size="20" fill="#ffffff" />
          </button>
          <button className='btn btn-ghost btn-circle outline-none btn-sm'>
            <Right theme="outline" size="20" fill="#ffffff" />
          </button>
        </div>
        {/* 搜索框 */}
        <div className='relative ml-5 flex items-center'>
          <input className='input h-9 pl-8' type="text" placeholder="搜索音乐"></input>
          <Search className="absolute ml-2" theme="outline" size="20" fill="#d4d1d0" />
        </div>
      </div>
    </div>
  );
}

export default TopBar;