import { useClickAway, useToggle } from "ahooks";
import { FunctionComponent, useEffect, useRef } from "react";

// **************************************** 导入组件和hooks
import { useAppContext } from '~/context/AppContext';
import { getHotSearchList, getHotSearchDetailsList,getDefaultSearchKeywords } from '~/services/api/search';
import HotList from './components/HotList';
import SearchResult from './components/SearchResult';
interface SearchWindowProps {

}


const SearchWindow: FunctionComponent<SearchWindowProps> = () => {

  const { state, dispatch } = useAppContext(); // 全局共享状态

  const searchRef = useRef<HTMLDivElement>(null!);
  const [isToggle, { toggle, setLeft, setRight }] = useToggle(); // 切换热榜组件和搜索结果
  
  /**
   * 关闭搜索窗口
   */
  useClickAway(() => {
    dispatch({ type: 'setShowSearchWindow', payload: false });
  }, [searchRef, document.getElementById('search-input')])

  /**
   * 控制热榜组件和搜索结果组件的切换
   */
  useEffect(() => {
    if (state.searchWords === '') {
      setLeft(); // 切换为热榜组件
    } else {
      setRight(); // 切换为搜索结果组件
    }
  }, [state.searchWords])
  
  return (
    <div className='
      absolute left-60 top-1 w-1/5 h-5/6 bg-gray-800
      rounded-md p-5 overflow-y-scroll z-50 overflow-hidden
    ' style={{ display: `${state.showSearchWindow?'flex':'none'}` }} ref={searchRef}>
      {
        isToggle === false && <HotList></HotList>
      }
      {
        isToggle === true && <SearchResult></SearchResult>
      }
    </div>
  );
}

export default SearchWindow;