import { FunctionComponent, useState } from 'react'
import styles from './index.module.css'
import { Right, Left, Search } from '@icon-park/react'
// *******************************************************导入组件
import ActionMenu from './components/ActionMenu/index';

interface TopBarProps {

}
const TopBar: FunctionComponent<TopBarProps> = () => {
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
          <div className="tooltip tooltip-bottom" data-tip="后退">
            <Left theme="outline" className={styles.navBtn} size="20" fill="#ffffff" />
          </div>
          <div className="tooltip tooltip-bottom" data-tip="前进">
            <Right theme="outline" className={styles.navBtn} size="20" fill="#ffffff" />
          </div>
        </div>
        {/* 搜索框 */}
        <div className={styles.searchBox}>
          <input type="text" placeholder="搜索音乐"></input>
          <Search className="absolute ml-2" theme="outline" size="20" fill="#d4d1d0" />
        </div>
      </div>
      {/* 用户活动菜单 */}
      <ActionMenu />
    </div>
  )
}
export default TopBar;