import { FunctionComponent, useEffect, useState } from "react";
import { useParams, Outlet } from 'react-router-dom';
// ******************************************* 引入组件和hooks
import { getSongListDetail } from '~/services/api/songList';
import Loading from '~/components/Loading/index';
import CoverTitleBar from './components/CoverTitleBar/index';
import TabControl from './components/TabControl/index';

interface SongMenuDetailsProps {

}

const SongMenuDetails: FunctionComponent<SongMenuDetailsProps> = () => {

  const params = useParams(); // 获得参数
  const [songMenuDetails, setSongMenuDetails] = useState(null); // 歌单详情

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getSongListDetail({ id: Number(params.songMenuId) }).then((res: any) => {
      console.log(res);
      if (res.code === 200) {
        setSongMenuDetails(res.playlist);
        setLoading(false);
      }
    })
  }, [])
  return (
    <div className="
      w-full overflow-hidden overflow-y-scroll
      flex flex-col justify-start
    ">
      {
        loading ? <Loading></Loading> :
          <>
            {/* 歌单封面 */}
            <CoverTitleBar details={songMenuDetails}></CoverTitleBar>
            {/* 标签选项卡 */}
            <TabControl commentCount={songMenuDetails ? songMenuDetails['commentCount'] : 0}></TabControl>
            {/* 标签内容页 --- 歌曲列表 --- 评论 --- 收藏者 */}
            <Outlet></Outlet>
          </>
      }
    </div>
  );
}

export default SongMenuDetails;