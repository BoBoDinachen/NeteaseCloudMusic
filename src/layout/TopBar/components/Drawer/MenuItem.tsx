import { FunctionComponent, useEffect } from "react";
import { LightMember, Level, Shop, Permissions, LinkTwo, Headset, Right } from '@icon-park/react';
// ******************************************************* 导入组件和hooks
import { useToast } from '~/components/Toast/index';

interface MenuItemProps {
  name: '会员中心' | '等级' | '商城' | '个人信息设置' | '绑定社交账号' | '我的客服' // 活动菜单名字
}

const MenuItem: FunctionComponent<MenuItemProps> = (props) => {

  useEffect(() => {
  }, [])
  const handleActionClick = () => {
    switch (props.name) {
      case '会员中心':
        useToast({ type: 'info', message: props.name });
        break;
      case '等级':
        useToast({ type: 'success', message: props.name });
        break;
      case '商城':
        useToast({ type: 'warning', message: props.name });
        break;
      case '个人信息设置':
        useToast({ type: 'error', message: props.name });
        break;
      case '绑定社交账号':
        useToast({ type: 'info', message: props.name });
        break;
      case '我的客服':
        useToast({ type: 'info', message: props.name });
        break;
    }
  }

  return (
    <li className='flex justify-between items-center rounded-sm px-10 py-4 cursor-pointer hover:bg-gray-600' onClick={handleActionClick}>
      {props.name === '会员中心' && <LightMember theme="outline" size="24" fill="#ffffff" />}
      {props.name === '等级' && <Level theme="outline" size="24" fill="#ffffff" />}
      {props.name === '商城' && <Shop theme="outline" size="24" fill="#ffffff" />}
      {props.name === '个人信息设置' && <Permissions theme="outline" size="24" fill="#ffffff" />}
      {props.name === '绑定社交账号' && <LinkTwo theme="outline" size="24" fill="#ffffff" />}
      {props.name === '我的客服' && <Headset theme="outline" size="24" fill="#ffffff" />}
      <span className='flex-1 ml-5'>{props.name}</span>
      <Right theme="outline" size="24" fill="#ffffff" />
    </li>
  );
}

export default MenuItem;