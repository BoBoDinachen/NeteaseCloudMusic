import { FunctionComponent, useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

interface FindMusicProps {

}

const FindMusic: FunctionComponent<FindMusicProps> = () => {

  const [topBarMenu, setTopNavBar] = useState<string[]>(['个性推荐', '歌单', '排行榜', '歌手', '最新音乐']); // 顶部栏菜单
  const [activeMenu, setActiveMenu] = useState<'个性推荐' | '歌单' | '排行榜' | '歌手' | '最新音乐'>('个性推荐'); // 当前活动菜单

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    switch (location.pathname) {
      case '/':
        setActiveMenu('个性推荐');
        break;
      case '/songMenuList':
        setActiveMenu('歌单');
        break;
      case '/rankingList':
        setActiveMenu('排行榜');
        break;
    }
  }, [])

  /**
   * 点击每个活动菜单
   */
  const handleActiveMenu = (name: string) => {
    switch (name) {
      case '个性推荐':
        setActiveMenu(name);
        navigate('/'); // 首页
        break;
      case '歌单':
        setActiveMenu(name);
        navigate('/songMenuList')
        break;
      case '排行榜':
        setActiveMenu(name);
        navigate('/rankingList')
        break;
      case '歌手':
        setActiveMenu(name);
        navigate('/singerList')
        break;
      case '最新音乐':
        setActiveMenu(name);
        navigate('/newSongList')
        break;
    }
  }
  return (
    <>
      {/* 顶部 */}
      <ul className=" px-3 w-full bg-base-100 menu menu-horizontal ">
        {
          topBarMenu.map((item, index) => {
            return (
              <li key={item} onClick={() => { handleActiveMenu(item) }} className={` ${activeMenu === item ? 'bordered  text-xl font-bold' : 'text-gray-300'}`} >
                <a>
                  {item}
                </a>
              </li>
            )
          })
        }
      </ul>
      {/* 内容 */}
      <Outlet></Outlet>
    </>
  );
}

export default FindMusic;