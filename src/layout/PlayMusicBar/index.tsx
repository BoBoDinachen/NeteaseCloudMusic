import { FunctionComponent } from "react";
import styles from './index.module.css';
// **************************************** 导入组件
import MusicInfo from './components/MusicInfo/index';
import MusicControl from './components/MusicControl/index';
import OptionList from './components/OptionList/index';

interface PlayMusicBarProps {
  
}
 
const PlayMusicBar: FunctionComponent<PlayMusicBarProps> = () => {
  return (
    <div className={styles.container}>
      <MusicInfo />
      <MusicControl />
      <OptionList />
    </div>
  );
}
 
export default PlayMusicBar;