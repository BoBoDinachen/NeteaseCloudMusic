import { FunctionComponent, useEffect, useState } from "react";
import { Search } from '@icon-park/react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

interface TabControlProps {
  commentCount: number
}

const TabControl: FunctionComponent<TabControlProps> = (props) => {
  const [activeIndex, setActiveIndex] = useState(0); // 当前的标签
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    console.log(location.pathname);
    switch (location.pathname) {
      case `/songMenuDetails/${params.songMenuId}/musicList`:
        setActiveIndex(0);
        break;
      case `/songMenuDetails/${params.songMenuId}/commentList`:
        setActiveIndex(1);
        break;
      case `/songMenuDetails/${params.songMenuId}/collectorList`:
        setActiveIndex(2);
        break;
    }
  }, [])


  const handleClickTag = (index: number) => {
    switch (index) {
      case 0:
        setActiveIndex(index);
        navigate(`/songMenuDetails/${params.songMenuId}/musicList`);
        break;
      case 1:
        setActiveIndex(index);
        navigate(`/songMenuDetails/${params.songMenuId}/commentList`);
        break;
      case 2:
        setActiveIndex(index);
        navigate(`/songMenuDetails/${params.songMenuId}/collectorList`);
        break;
    }
  }
  return (
    <div className="flex justify-between px-8">
      {/* 标签列表 */}
      <div className="tabs">
        <a onClick={() => { handleClickTag(0) }} className={`tab tab-bordered ${activeIndex === 0 ? 'tab-active text-white' : ''}`}>歌曲列表</a>
        <a onClick={() => { handleClickTag(1) }} className={`tab tab-bordered ${activeIndex === 1 ? 'tab-active text-white' : ''}`}>评论({props.commentCount})</a>
        <a onClick={() => { handleClickTag(2) }} className={`tab tab-bordered ${activeIndex === 2 ? 'tab-active text-white' : ''}`}>收藏者</a>
      </div>
      {/* 搜索 */}
      {
        activeIndex === 0 ?
          (
            <div className="relative flex items-center">
              <input type="text" placeholder="搜索歌单音乐" className="input input-bordered input-xs w-48 max-w-xs" />
              <Search className="absolute right-2" theme="outline" size="16" fill="#ffffff" strokeWidth={2} />
            </div>
          ) : <></>
      }
    </div>
  );
}

export default TabControl;