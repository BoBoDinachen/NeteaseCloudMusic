import { FunctionComponent, useState } from "react";
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
// *********************************************导入图标
import { Platte, Mail, FullScreen, OffScreen, HamburgerButton } from '@icon-park/react';
// *********************************************导入组件,hooks
import { useFullscreen } from 'ahooks';
import { useAppContext } from '~/context/AppContext';
import avatarUrl from '~/assets/images/profile-pic.png';

interface ActionMenuProps {

}

const ActionMenu: FunctionComponent<ActionMenuProps> = () => {
  const [isLogin, setIsLogin] = useState(true); // 是否登录
  const { dispatch } = useAppContext();
  // *******************************************************
  const navigate = useNavigate();
  const [isEnabled, { enterFullscreen, exitFullscreen }] = useFullscreen(document.querySelector('html'));

  return (
    <ul className={styles.menuList}>
      <li>
        {/* 界面颜色 */}
        <button className="btn btn-ghost btn-sm rounded-btn">
          <Platte theme="outline" size="24" fill="#fff" />
        </button>
      </li>
      <li>
        {/* 接收的邮件 */}
        <div className="indicator mr-5">
          <div className="indicator-item badge bg-gray-500 text-xs">99+</div>
          <button className="btn btn-ghost btn-sm rounded-btn">
            <Mail theme="outline" size="24" fill="#fff" />
          </button>
        </div>
      </li>
      <li>
        {/* 全屏/缩小 */}
        {
          isEnabled ?
            <div data-tip="缩小" className="tooltip tooltip-bottom">
              <button className="btn btn-ghost btn-sm rounded-btn" onClick={exitFullscreen}>
                <OffScreen theme="outline" size="24" fill="#fff" />
              </button>
            </div>
            :
            <div data-tip="全屏" className="tooltip tooltip-bottom">
              <button className="btn btn-ghost btn-sm rounded-btn" onClick={enterFullscreen}>
                <FullScreen theme="outline" size="24" fill="#fff" />
              </button>
            </div>
        }
      </li>
      {/* 分隔线 */}
      <div className="divider divider-vertical"></div>
      {/* 用户头像和用户名 */}
      <li>
        <div className="avatar online">
          <div className="w-10 h-10 mask mask-squircle">
            <img src={avatarUrl} />
          </div>
        </div>
        {
          isLogin ?
            <span className="ml-2 mr-1">薛定谔的猫猫虫</span>
            :
            <button className="btn btn-sm btn-ghost ml-2" onClick={() => { dispatch({ type: 'setShowLoginBox', payload: true }) }}>
              未登录
            </button>
        }
      </li>
      {/* 打开抽屉 */}
      <li>
        {
          isLogin ?
            <button className="btn btn-ghost btn-sm rounded-btn" onClick={() => { dispatch({ type: 'setShowDrawer', payload: true }) }}>
              <HamburgerButton theme="outline" size="28" fill="#fff" />
            </button>
            : <></>
        }
      </li>
    </ul>
  );
}

export default ActionMenu;