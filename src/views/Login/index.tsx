import { useEffect } from 'react'
import styles from './index.module.css';
import loginBgUrl from '~/assets/images/login-bg.svg';
import qrCodeUrl from '~/assets/images/qr-code.svg';
import QQiconUrl from '~/assets/images/QQ-icon.svg';
import emailIconUrl from '~/assets/images/wyyx-icon.svg';
// ********************************************************** 图标
import { Close, Phone, Key } from '@icon-park/react';
// ********************************************************** 导入组件和hooks
import { useAppContext } from '~/context/AppContext'
import { useRequest } from 'ahooks'
import { cellphoneLogin, getUserDetails } from '~/services/api/user'
export default function Login() {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    // console.log(state);
  }, [])

  return (
    <div className={styles.loginBox} style={{ display: state.showLoginBox ? 'flex' : 'none' }}>
      {/* 头部栏 */}
      <div className='flex justify-between items-center px-2'>
        <span className='text-xl font-bold text-white'>登录</span>
        <button className='btn btn-ghost btn-sm' onClick={() => { dispatch({ type: 'setShowLoginBox', payload: false }) }}>
          <Close theme="outline" size="24" fill="#fff" />
        </button>
      </div>
      <img src={loginBgUrl} alt="" className='h-20 object-cover' />
      {/* 主体 */}
      <div className={styles.formBox}>
        <div className={styles.inputItem}>
          <input type="text" placeholder="请输入手机号" className="" />
          <Phone className='absolute ml-2' theme="outline" size="18" fill="#bdb5b5" />
        </div>
        <div className={styles.inputItem}>
          <input type="text" placeholder="请输入密码" className="" />
          <Key className='absolute ml-2' theme="outline" size="18" fill="#bdb5b5" />
        </div>
        <button className='btn btn-accent text-lg text-white btn-md'>登录</button>
        <div className="px-1 mt-3 w-max card ">
          <div className="form-control">
            <label className="cursor-pointer label space-x-2">
              <span className="label-text text-xs">自动登录</span>
              <input type="checkbox" className="checkbox checkbox-xs" />
            </label>
          </div>
        </div>
      </div>
      {/* 登录方式 */}
      <div className='flex justify-between mt-3 pl-7'>
        <ul className='flex space-x-4 flex-1'>
          <li data-tip="QQ登录" className='btn btn-circle btn-md'>
            <img src={QQiconUrl} className='p-1 w-9' alt="" />
          </li>
          <li className='btn btn-circle btn-md'>
            <img src={emailIconUrl} className='p-1 w-8' alt="" />
          </li>
        </ul>
        <div data-tip="扫码登录" className="cursor-pointer tooltip tooltip-left">
          <img className='w-14' src={qrCodeUrl} alt="" />
        </div>
      </div>
      {/* 背景 */}
      <div className={styles.background}>
      </div>
    </div>
  )
}
