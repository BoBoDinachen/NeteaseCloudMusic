import { FunctionComponent } from 'react';
import TopBar from '~/layout/TopBar/index';
import Main from '~/layout/Main/index';
import SideBar from '~/layout/SideBar/index';
import PlayMusicBar from '~/layout/PlayMusicBar/index';
import MusicDetails from '~/views/MusicDetails/index';
import Login from '~/views/Login/index'; // 登录
import PlayList from '~/views/PlayList/index'; // 当前的播放列表
import LyricBox from '~/views/LyricBox/index'; // 歌词容器
import { Outlet } from 'react-router-dom';
interface LayoutProps {

}

const Layout: FunctionComponent<LayoutProps> = () => {
  return (
    <div className="h-screen flex flex-col justify-between z-50">
      <TopBar />
      <Main>
        <SideBar />
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </Main>
      {/* 登录窗口 */}
      <Login />
      {/* 歌曲详情页 */}
      <MusicDetails />
      {/* 当前播放列表 */}
      <PlayList></PlayList>
      {/* 音乐播放栏 */}
      <PlayMusicBar />
      {/* 歌词容器 */}
      <LyricBox></LyricBox>
    </div>
  );
}

export default Layout;