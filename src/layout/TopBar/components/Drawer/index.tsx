import { FunctionComponent, useRef, useState, useEffect } from "react";
import styles from './index.module.css';
// **************************************************** 导入图标
import { Male, Female, GrinningFace, Power } from '@icon-park/react';
import avatarUrl from '~/assets/images/profile-pic.png';
// ***************************************************** 导入组件和hooks
import ShadeBox from '~/components/ShadeBox/index';
import MenuItem from './MenuItem';

interface DrawerProps {
  isShow: boolean, // 是否显示
  setShowDrawer: (value: boolean) => void
}

const Drawer: FunctionComponent<DrawerProps> = (props) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  // ************************************************************ 组件状态
  const [showShade, setShowShade] = useState<boolean>(false);

  interface infoItem {
    amount: number,
    name: '动态' | '关注' | '粉丝'
  }
  const [userInfo, setUserInfo] = useState<infoItem[]>([
    {
      amount: 2,
      name: '动态'
    },
    {
      amount: 19,
      name: '关注'
    },
    {
      amount: 5,
      name: '粉丝'
    }
  ]);

  let timer1: any = useRef();
  let timer2: any = useRef();

  useEffect(() => {
    if (props.isShow) {
      showDrawerBox();
    } else {
      hideDrawerBox();
    }
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    }
  }, [props])

  // 抽屉隐藏
  const hideDrawerBox = () => {
    let drawerWidth = drawerRef.current!.offsetWidth;
    drawerRef.current!.style.transform = `translateX(${drawerWidth}px)`;
    timer1 = setTimeout(() => {
      setShowShade(false);
      drawerRef.current!.style.display = `none`;
    }, 400)
  }

  // 抽屉显示
  const showDrawerBox = () => {
    let drawerWidth = drawerRef.current!.offsetWidth;
    setShowShade(true);
    drawerRef.current!.style.display = `block`;
    timer2 = setTimeout(() => {
      drawerRef.current!.style.transform = `translateX(0px)`;
    }, 100)
  }

  // 点击遮罩层

  return (
    <div>
      {
        // 显示遮罩层
        showShade ?
          <ShadeBox handleClick={() => { props.setShowDrawer(false) }} />
          :
          <></>
      }
      <div className={styles.drawerBox} ref={drawerRef}>
        {/* 头像，用户名,性别 */}
        <div className={styles.draweProfileBox}>
          <img src={avatarUrl} className="mask mask-circle w-28" />
          <div className='flex items-center space-x-2'>
            <span className='font-bold'>薛定谔的猫猫虫</span>
            {
              true ? <Male theme="outline" size="22" fill="#4a90e2" />
                :
                <Female theme="outline" size="22" fill="#e350a7" />
            }
          </div>
        </div>
        {/* 动态、关注、粉丝 */}
        <ul className='flex space-x-12 justify-center py-6'>
          {
            userInfo.map((item: infoItem) => {
              return (
                <li key={item.name} className='flex flex-col text-gray-300 hover:text-white items-center cursor-pointer'>
                  <span className='font-bold text-xl'>{item.amount}</span>
                  <span>{item.name}</span>
                </li>
              )
            })
          }
        </ul>
        {/* 签到按钮 */}
        <div className='flex justify-center'>
          <button className='btn text-gray-300 hover:text-white bg-gray-700 space-x-2 btn-ghost text-base'>
            <GrinningFace theme="outline" size="24" fill="#f5a623" />
            <span>签到</span>
          </button>
        </div>
        {/* 会员中心、等级、商城 */}
        {/* <div className='divider my-0 mt-1'></div> */}
        <ul className='my-2 py-2'>
          <MenuItem name='会员中心' />
          <MenuItem name='等级' />
          <MenuItem name='商城' />
        </ul>
        {/* <div className='divider my-0'></div> */}
        {/* 个人信息设置、绑定社交账号 */}
        <ul className='my-2'>
          <MenuItem name='个人信息设置' />
          <MenuItem name='绑定社交账号' />
        </ul>
        {/* <div className='divider my-0'></div> */}
        {/*  我的客服 */}
        <ul className='my-2'>
          <MenuItem name='我的客服' />
        </ul>
        {/* 退出登录 */}
        <div className='flex justify-between items-center rounded-sm px-10 py-4 cursor-pointer hover:bg-gray-600'>
          <Power theme="outline" size="24" fill="#ffffff" />
          <span className='flex-1 ml-5'>退出登录</span>
        </div>
      </div>
    </div>
  );
}

export default Drawer;