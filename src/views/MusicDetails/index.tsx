import { FunctionComponent, useEffect, useRef } from "react";

// **************************************** 导入组件和function
import TopBar from './components/TopBar/index';
import MainContent from './components/MainContent/index';

import { useAppContext } from '~/context/AppContext';

interface MusicDetailsProps {

}

const MusicDetails: FunctionComponent<MusicDetailsProps> = () => {

  const slideRef = useRef<HTMLDivElement>(null!);
  const { state, dispatch } = useAppContext();

  /**
   * 控制页面的显示和隐藏
   */
  useEffect(() => {
    if (state.showMusicDetails) {
      slideRef.current.style.transform = 'translateY(-100%)'
    } else {
      slideRef.current.style.transform = 'translateY(100%)'
    }
  }, [state.showMusicDetails])
  return (
    <div className='
    flex flex-col justify-between
    w-screen h-screen absolute left-0 bg-gray-800
    z-50 top-full transition duration-500 ease-in-out'
      ref={slideRef}
      style={{ willChange: 'transform' }}
    >
      <TopBar></TopBar>
      <MainContent></MainContent>
    </div>
  );
}

export default MusicDetails;