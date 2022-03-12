import { FunctionComponent, useEffect, useState } from 'react'
import styles from './index.module.css'
import { Right, Left, Search } from '@icon-park/react'
// *******************************************************导入组件和hooks
import ActionMenu from './components/ActionMenu/index';
import { useAppContext } from '~/context/AppContext';
import { getDefaultSearchKeywords } from '~/services/api/search';
import { useDebounce, useDebounceFn } from 'ahooks';
import { useNavigate } from 'react-router-dom';

interface TopBarProps {

}
const TopBar: FunctionComponent<TopBarProps> = () => {

  const { state, dispatch } = useAppContext();
  const [searchSuggest, setSearchSuggest] = useState<string>(''); // 搜索建议
  const [inputValue, setInputValue] = useState<string>(''); // 输入值
  const navigate = useNavigate();

  /**
   * 加载默认搜索关键词
   */
  useEffect(() => {
    getDefaultSearchKeywords().then((res: any) => {
      // console.log(res);
      setSearchSuggest(res.data.showKeyword);
    })
  }, [])

  /**
   * 输入数据,防抖函数
   */
  const { run } = useDebounceFn(
    () => {
      dispatch({ type: 'setSearchWords', playload: inputValue })
    },
    {
      wait: 500,
    },
  );

  const handleChangeSearch = (e: any) => {
    setInputValue(e.target.value);
    run(); // 防抖函数
  }

  return (
    <div className={`${styles.topBar}`}>
      {/* 图标 */}
      <h1 className={styles.log}>
        <a href="#" className='w-44 h-9'></a>
      </h1>
      {/* 导航和搜索框 */}
      <div className="flex ml-10">
        {/* 导航按钮 */}
        <div className="flex justify-center items-center">
          <div className="tooltip tooltip-bottom" data-tip="后退" onClick={() => { navigate(-1) }}>
            <Left theme="outline" className={styles.navBtn} size="20" fill="#ffffff" />
          </div>
          <div className="tooltip tooltip-bottom" data-tip="前进" onClick={() => { navigate(1) }}>
            <Right theme="outline" className={styles.navBtn} size="20" fill="#ffffff" />
          </div>
        </div>
        {/* 搜索框 */}
        <div className={styles.searchBox}>
          <input type="text" onChange={(e: any) => { handleChangeSearch(e) }} value={inputValue} placeholder={searchSuggest} autoComplete="off" id='search-input' onFocus={() => { dispatch({ type: 'setShowSearchWindow', payload: true }) }}></input>
          <Search className="absolute ml-2" theme="outline" size="20" fill="#d4d1d0" />
        </div>
      </div>
      {/* 用户活动菜单 */}
      <ActionMenu />
    </div>
  )
}
export default TopBar;