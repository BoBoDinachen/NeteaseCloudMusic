import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Performance, Down, Plus, Like, Concern } from '@icon-park/react'; // 导入图标
import { useNavigate } from 'react-router-dom';
interface SideBarProps {

}

const SideBar: FunctionComponent<SideBarProps> = () => {

  const menuList = useRef<string[]>(['发现音乐', '博客', '视频', '关注', '直播', '私人FM']); // 菜单列表数据
  const [activeMenu, setActiveMenu] = useState<'发现音乐' | '博客' | '视频' | '关注' | '直播' | '私人FM'>('发现音乐'); // 当前活动的菜单
  const navigate = useNavigate(); // 使用路由导航
  /**
   * 处理每个菜单的点击
   * @param name 
   */
  const handleClickMenu = (name: string) => {
    switch (name) {
      case '发现音乐':
        setActiveMenu(name);
        navigate("/", {});
        break;
      case '博客':
        setActiveMenu(name);
        navigate("/hello", {});
        break;
      case '视频':
        setActiveMenu(name);
        break;
      case '关注':
        setActiveMenu(name);
        break;
      case '直播':
        setActiveMenu(name);
        break;
      case '私人FM':
        setActiveMenu(name);
        break;
    }
  }

  /**
   * 控制路由
   */
  useEffect(() => { }, [activeMenu])
  
  return (
    <div className="border-r-2 border-gray-600 p-3 w-56" style={{ userSelect: 'none' }}>
      {/* 菜单项列表 */}
      <ul className='w-full space-y-2'>
        {
          menuList.current.map((item, index) => {
            return (
              <li onClick={() => { handleClickMenu(item) }} key={index} className={`
                flex items-center pl-2 transition duration-200 ease-in-out
              hover:bg-gray-500 h-10 cursor-pointer rounded-sm ${activeMenu === item ? 'text-lg font-bold' : ''}
                ${activeMenu === item ?'bg-gray-500':''}
              `
              }>{item}</li>
            )
          })
        }
      </ul>
      {/* 我的音乐 */}
      <div className='text-sm text-gray-400 w-full pl-2 my-3'>我的音乐</div>
      <ul>
        <li className='flex items-center space-x-2 p-2 hover:bg-gray-500 cursor-pointer rounded-md'>
          <Performance theme="outline" size="18" fill="#ffffff" />
          <span>最近播放</span>
        </li>
      </ul>
      {/* 创建的歌单 */}
      <div className='text-sm text-gray-400 w-full pl-2 my-3 flex items-center justify-between cursor-pointer'>
        <span>创建的歌单</span>
        <Down className='flex-1' theme="outline" size="16" fill="#ffffff" />
        <Plus theme="outline" size="19" fill="#ffffff" />
      </div>
      <ul>
        <li className='flex items-center justify-between p-2 cursor-pointer hover:bg-gray-500 rounded-md'>
          <Like theme="outline" size="18" fill="#ffffff" />
          <span className='flex-1 ml-2'>我喜欢的音乐</span>
          <button data-tip="开启心动模式" className='tooltip btn btn-ghost btn-sm btn-circle'>
            <Concern theme="outline" size="20" fill="#ffffff" />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;