import { FunctionComponent, useEffect } from "react";
import { useParams } from 'react-router-dom';

interface SongMenuDetailsProps {

}

const SongMenuDetails: FunctionComponent<SongMenuDetailsProps> = () => {

  const params = useParams(); // 获得参数
  useEffect(() => {
    console.log(params);
  }, [])
  return (
    <div>
      <h3>歌单详情页</h3>
      <div>
      {params.songMenuId}
      </div>
    </div>
  );
}

export default SongMenuDetails;